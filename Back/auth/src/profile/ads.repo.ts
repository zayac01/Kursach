import { Ad } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

export interface IAdsRepository {
  findByUserId(userId: number): Promise<Ad[]>;
}

@injectable()
export class AdsRepository implements IAdsRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async findByUserId(userId: number): Promise<Ad[]> {
    return this.prismaService.client.ad.findMany({
      where: { userId },
      include: { images: true },
    });
  }
}