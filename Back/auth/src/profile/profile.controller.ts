import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../command/base.controller';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IProfileService, UpdateProfileDto } from './profile.service.interface';
import { AuthGuard } from '../command/auth.guard';
import { ValidateMiddleware } from '../command/validate.middleware';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HTTPError } from '../errors/http-error.class';

// DTO для валидации обновления профиля
export class UpdateProfileDtoValidator {
  name?: string;
  email?: string;
}

@injectable()
export class ProfileController extends BaseController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ProfileService) private profileService: IProfileService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/profile',
        method: 'get',
        func: this.getProfile,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/profile/ads',
        method: 'get',
        func: this.getAds,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/profile/articles',
        method: 'get',
        func: this.getArticles,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/profile/update',
        method: 'put',
        func: this.updateProfile,
        middlewares: [new AuthGuard(), new ValidateMiddleware(UpdateProfileDtoValidator)],
      },
    ]);
  }

  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
    return next(new HTTPError(401, 'Не авторизован')); // Ошибка 401, если пользователь не аутентифицирован
  }
      const userId = req.user.id;
      const profile = await this.profileService.getProfile(userId);
      this.ok(res, { email: profile.email, name: profile.name, id: profile.id });
    } catch (e) {
      next(e);
    }
  }

  async getAds(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
    return next(new HTTPError(401, 'Не авторизован')); // Ошибка 401, если пользователь не аутентифицирован
  }
      const userId = req.user.id;
      const ads = await this.profileService.getUserAds(userId);
      this.ok(res, ads);
    } catch (e) {
      next(e);
    }
  }

  async getArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
    return next(new HTTPError(401, 'Не авторизован')); // Ошибка 401, если пользователь не аутентифицирован
  }
      const userId = req.user.id;
      const articles = await this.profileService.getUserArticles(userId);
      this.ok(res, articles);
    } catch (e) {
      next(e);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
    return next(new HTTPError(401, 'Не авторизован')); // Ошибка 401, если пользователь не аутентифицирован
  }
      const userId = req.user.id;
      const updatedProfile = await this.profileService.updateProfile(userId, req.body);
      this.ok(res, { email: updatedProfile.email, name: updatedProfile.name, id: updatedProfile.id });
    } catch (e) {
      next(e);
    }
  }
}