// src/services/AdsService.ts
import { injectable, inject } from "inversify";
import ImageKit from "imagekit";
import AdsRepository from "../repositories/AdsRepository";
import { TYPES } from "../types";
import { CreateAdDTO } from "../dtos/CreateAdDTO";
import { UpdateAdDTO } from "../dtos/UpdateAdDTO";
import { Ad } from "@prisma/client";
import { IConfigService } from "../config/config.service.interface";
import multer from "multer";

@injectable()
export default class AdsService {
    private imagekit: ImageKit;

    constructor(
        @inject(TYPES.AdsRepository) private adsRepository: AdsRepository,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) {
        this.imagekit = new ImageKit({
            publicKey: this.configService.get('IMAGEKIT_PUBLIC_KEY'),
            privateKey: this.configService.get('IMAGEKIT_PRIVATE_KEY'),
            urlEndpoint: this.configService.get('IMAGEKIT_URL_ENDPOINT'),
        });
    }

    async createAd(data: CreateAdDTO, files?: Express.Multer.File[], imageUrls?: string[]): Promise<Ad> {
      const existingAd = await this.adsRepository.getAdByUniqueFields(data.vin, data.sts, data.licensePlate);
      if (existingAd) {
          throw new Error("Объявление с такими VIN, СТС и госномером уже существует");
      }

      // Определяем итоговый массив URL изображений
      let finalImageUrls: string[] = [];

      // Если переданы файлы, загружаем их через ImageKit
      if (files && files.length > 0) {
          finalImageUrls = await this.uploadImages(files);
      }
      // Если переданы URL, используем их
      if (imageUrls && imageUrls.length > 0) {
          finalImageUrls = [...finalImageUrls, ...imageUrls];
      }

      // Если нет ни файлов, ни URL, бросаем ошибку
      if (finalImageUrls.length === 0) {
          throw new Error("Необходимо передать хотя бы одно изображение");
      }

      // Создаем объявление с URL изображений
      const adData = {
          ...data,
          images: {
              create: finalImageUrls.map(url => ({ url })),
          },
      };
      return await this.adsRepository.createAd(adData);
  }

    private async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
        const uploadPromises = files.map(file => {
            return this.imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            });
        });
        const responses = await Promise.all(uploadPromises);
        return responses.map((res: { url: any; }) => res.url);
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