import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IUsersRepository } from '../users/users.interface.repo';
import { AdsProfileRepository, IAdsProfileRepository } from './ads.repo';
import { IArticlesRepository } from '../articles/articles.interface.repo';
import { IProfileService, UpdateProfileDto } from './profile.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class ProfileService implements IProfileService {
  constructor(
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
    @inject(TYPES.AdsProfileRepository) private adsProfileRepository: IAdsProfileRepository,
    @inject(TYPES.ArticlesRepository) private articlesRepository: IArticlesRepository,
  ) {}

  async getProfile(userId: number): Promise<UserModel> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new HTTPError(404, 'Пользователь не найден');
    }
    return user;
  }

  async getUserAds(userId: number): Promise<any[]> {
    return this.adsProfileRepository.findByUserId(userId);
  }

  async getUserArticles(userId: number): Promise<any[]> {
    return this.articlesRepository.findByUserId(userId);
  }

  async updateProfile(userId: number, data: UpdateProfileDto): Promise<UserModel> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new HTTPError(404, 'Пользователь не найден');
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.usersRepository.find(data.email);
      if (existingUser) {
        throw new HTTPError(422, 'Email уже занят');
      }
    }

    return this.usersRepository.update(userId, {
      name: data.name || user.name,
      email: data.email || user.email,
    });
  }
}