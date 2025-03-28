// src/repositories/AdsRepository.ts
import { PrismaClient, Ad } from "@prisma/client";
import { injectable } from "inversify";
import { CreateAdDTO } from "../dtos/CreateAdDTO";
import { UpdateAdDTO } from "../dtos/UpdateAdDTO";

@injectable()
export default class AdsRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAdByUniqueFields(vin: string, sts: string, licensePlate: string): Promise<Ad | null> {
        return await this.prisma.ad.findFirst({
            where: { vin, sts, licensePlate },
        });
    }

    async createAd(data: any): Promise<Ad> {
        return await this.prisma.ad.create({
            data: {
                brand: data.brand,
                model: data.model,
                year: data.year as number, // Теперь это число
                body: data.body,
                generation: data.generation,
                engineType: data.engineType,
                driveType: data.driveType,
                transmission: data.transmission,
                engineMod: data.engineMod,
                color: data.color,
                mileage: data.mileage as number,
                options: data.options,
                documentType: data.documentType,
                owners: data.owners as number,
                purchaseDate: data.purchaseDate,
                description: data.description,
                contacts: data.contacts,
                price: data.price as number,
                licensePlate: data.licensePlate,
                vin: data.vin,
                sts: data.sts,
                userId: data.userId,
                // images: data.images,
                images: {
                    create: data.images.create, // Save image URLs
                },
            },
        });
    }

    async getAdById(id: number): Promise<Ad | null> {
        return await this.prisma.ad.findUnique({ where: { id } });
    }

    async listAds(filter: any, sort: any, skip: number, take: number): Promise<Ad[]> {
        return await this.prisma.ad.findMany({
            where: filter,
            orderBy: sort,
            skip: skip,
            take: take,
            include: { images: true }, // хуета
        });
    }

    async updateAd(id: number, data: UpdateAdDTO): Promise<Ad> {
        return await this.prisma.ad.update({
            where: { id },
            data: data,
        });
    }

    async deleteAd(id: number): Promise<Ad> {
        return await this.prisma.ad.delete({
            where: { id },
        });
    }
}