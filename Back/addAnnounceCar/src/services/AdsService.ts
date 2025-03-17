// src/services/AdsService.ts
import { injectable, inject } from "inversify";
import AdsRepository from "../repositories/AdsRepository";
import { TYPES } from "../types";
import { CreateAdDTO } from "../dtos/CreateAdDTO";
import { UpdateAdDTO } from "../dtos/UpdateAdDTO";
import { Ad } from "@prisma/client";

@injectable()
export default class AdsService {
  constructor(
    @inject(TYPES.AdsRepository) private adsRepository: AdsRepository
  ) {}

  async createAd(data: CreateAdDTO): Promise<Ad> {
    // Здесь можно добавить дополнительную логику валидации или бизнес-правил
    return await this.adsRepository.createAd(data);
  }

  async getAdById(id: number): Promise<Ad | null> {
    return await this.adsRepository.getAdById(id);
  }

  async listAds(
    filter: any,
    sort: any,
    page: number,
    pageSize: number
  ): Promise<Ad[]> {
    const skip = (page - 1) * pageSize;
    return await this.adsRepository.listAds(filter, sort, skip, pageSize);
  }

  async updateAd(id: number, data: UpdateAdDTO): Promise<Ad> {
    return await this.adsRepository.updateAd(id, data);
  }

  async deleteAd(id: number): Promise<Ad> {
    return await this.adsRepository.deleteAd(id);
  }
}
