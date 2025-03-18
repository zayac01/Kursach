import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../command/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../command/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './user.service.interface';
import { AuthGuard } from '../command/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
		  return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const user = await this.userService.getUserInfo(req.body.email);
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'), user!.id);
		this.ok(res, { jwt });
	  }

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	// async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
	// 	const userInfo = await this.userService.getUserInfo(user);
	// 	this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	// } // до chatgpt

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		if (!user) {
		  res.status(401).json({ error: "Пользователь не авторизован" });
		  return;
		}
		const userInfo = await this.userService.getUserInfo(user.email);
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	  } // chatgpt

	private signJWT(email: string, secret: string, userId: number): Promise<string> {
		return new Promise<string>((resolve, reject) => {
		  sign(
			{
			  id: userId, // Добавляем id в токен
			  email,
			  iat: Math.floor(Date.now() / 1000),
			},
			secret,
			{
			  algorithm: 'HS256',
			},
			(err, token) => {
			  if (err) {
				reject(err);
			  }
			  resolve(token as string);
			}
		  );
		});
	  }
}
