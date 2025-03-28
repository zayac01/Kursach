// src/services/AdsService.ts
import { injectable, inject } from "inversify";
import cloudinary from "cloudinary";
import AdsRepository from "../repositories/AdsRepository";
import { TYPES } from "../types";
import { CreateAdDTO } from "../dtos/CreateAdDTO";
import { UpdateAdDTO } from "../dtos/UpdateAdDTO";
import { Ad } from "@prisma/client";
import { IConfigService } from "../config/config.service.interface";
import multer from "multer";
import { Readable } from "node:stream";


export interface IImageUploadService {
    uploadImages(files: Express.Multer.File[]): Promise<string[]>;
}

@injectable()
export default class AdsService {

    constructor(
        @inject(TYPES.AdsRepository) private adsRepository: AdsRepository,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) {
        cloudinary.v2.config({
            cloud_name: this.configService.get("CLOUDINARY_CLOUD_NAME"),
            api_key: this.configService.get("CLOUDINARY_API_KEY"),
            api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
        });
    }

    async createAd(data: CreateAdDTO, files?: Express.Multer.File[], imageUrls?: string[]): Promise<Ad> {
        // Проверка на существование объявления
        const existingAd = await this.adsRepository.getAdByUniqueFields(data.vin, data.sts, data.licensePlate);
        if (existingAd) {
            throw new Error("Объявление с такими VIN, СТС и госномером уже существует");
        }

        const yearValue = typeof data.year === 'string' ? data.year : String(data.year);
        const parsedYear = parseInt(yearValue, 10);
        const mileageValue = typeof data.mileage === 'string' ? data.mileage : String(data.mileage);
        const parsedMileage = parseInt(mileageValue, 10);
        const ownersValue = typeof data.owners === 'string' ? data.owners : String(data.owners);
        const parsedOwners = parseInt(ownersValue, 10);
        const priceeValue = typeof data.price === 'string' ? data.price : String(data.price);
        const parsedPricee = parseInt(priceeValue, 10);

    
        // Парсинг данных
        const parsedData: CreateAdDTO = {
            ...data,
            year: parsedYear,
            mileage: parsedMileage,
            owners: parsedOwners,
            price: parsedPricee,
            purchaseDate: new Date(data.purchaseDate),
        };

        // Обработка изображений
        let finalImageUrls: string[] = [];
        if (files && files.length > 0) {
            finalImageUrls = await this.uploadImages(files);
        }
        if (imageUrls && imageUrls.length > 0) {
            finalImageUrls = [...finalImageUrls, ...imageUrls];
        }
        if (finalImageUrls.length === 0) {
            throw new Error("Необходимо передать хотя бы одно изображение");
        }
    
        // Формирование данных для создания объявления
        const adData: CreateAdDTO = {
            ...parsedData,
            images: {
                create: finalImageUrls.map(url => ({ url })),
            },
        };
    
        // Создание объявления
        return await this.adsRepository.createAd(adData);
    }

    // private async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    //     const uploadPromises = files.map(file => {
    //         return this.imagekit.upload({
    //             file: file.buffer,
    //             fileName: file.originalname,
    //         });
    //     });
    //     const responses = await Promise.all(uploadPromises);
    //     console.log('URL изображений от ImageKit:', (res: { url: any; }) => res.url);
    //     return responses.map((res: { url: any; }) => res.url);
    // }

    private async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
        const uploadPromises = files.map(file => {
            return new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.v2.uploader.upload_stream(
                    { folder: "FirstFolder" }, // Папка в Cloudinary
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result!.secure_url);
                    }
                );
                const bufferStream = Readable.from(file.buffer);
                bufferStream.pipe(uploadStream);
            });
        });
        return await Promise.all(uploadPromises);
    }

    async getAdById(id: number): Promise<Ad | null> {
        return await this.adsRepository.getAdById(id);
    }

    async listAds(filter: any, sort: any, page: number, pageSize: number): Promise<Ad[]> {
        const skip = (page - 1) * pageSize;
        return await this.adsRepository.listAds(filter, sort, skip, pageSize);
    }

    async updateAd(id: number, data: UpdateAdDTO): Promise<Ad> {
        return await this.adsRepository.updateAd(id, data);
    }

    async deleteAd(id: number): Promise<Ad> {
        const ad = await this.adsRepository.getAdById(id);
        if (!ad) {
            throw new Error("Объявление не найдено");
        }
        return await this.adsRepository.deleteAd(id);
    }
}