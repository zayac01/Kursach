import { Article } from '@prisma/client';

export interface IArticlesRepository {
    findByUserId(userId: number): Promise<Article[]>;
}