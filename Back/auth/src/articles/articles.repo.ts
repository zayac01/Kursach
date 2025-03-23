import { Article } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { IArticlesRepository } from './articles.interface.repo';

@injectable()
export class ArticlesRepository implements IArticlesRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async findByUserId(userId: number): Promise<Article[]> {
    return this.prismaService.client.article.findMany({
      where: { userId },
    });
  }
}