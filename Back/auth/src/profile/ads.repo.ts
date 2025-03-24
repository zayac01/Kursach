import { Ad } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

export interface IAdsProfileRepository {
  findByUserId(userId: number): Promise<Ad[]>;
}

@injectable()
export class AdsProfileRepository implements IAdsProfileRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async findByUserId(userId: number): Promise<Ad[]> { // хуйня лдя профиля с объявлениями юзера
    return this.prismaService.client.ad.findMany({
      where: { userId },
      include: { images: true },
    });
  }
}