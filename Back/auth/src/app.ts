import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filters.interface';
import { UserController } from './users/user.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './command/auth.middleware';
import cors from 'cors';
import path from 'path';
import AdsController from './controllers/AdsController';
import {UsersRepository} from './users/users.repo'
import ImageKit from 'imagekit';
import { ProfileController } from './profile/profile.controller';
import { IArticlesRepository } from './articles/articles.interface.repo';
import { IAdsProfileRepository } from './profile/ads.repo';
import { IUsersRepository } from './users/users.interface.repo';
import AdsRepository from './repositories/AdsRepository'

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;
	private imagekit: ImageKit;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.AdsController) private adsController: AdsController,
		@inject(TYPES.ProfileController) private profileController: ProfileController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
		@inject(TYPES.AdsRepository) private adsRepository: AdsRepository,
		@inject(TYPES.AdsProfileRepository) private adsProfileRepository: IAdsProfileRepository,
		@inject(TYPES.ArticlesRepository) private articlesRepository: IArticlesRepository,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 5500;
		const publicKey = process.env.PUBLIC_KEY;
		const privateKey = process.env.PRIVATE_KEY;
		const urlEndpoint = process.env.URL_ENDPOINT;

		if (!publicKey || !privateKey || !urlEndpoint) {
			throw new Error('Необходимо задать PUBLIC_KEY, PRIVATE_KEY и URL_ENDPOINT в файле .env');
		}

		this.imagekit = new ImageKit({
			publicKey: publicKey,
			privateKey: privateKey,
			urlEndpoint: urlEndpoint,
		});
	}
	

	useMiddleware(): void {
		this.app.use(cors({ origin: 'http://127.0.0.1:5500' })); // 1
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useStaticFiles(): void { // 1
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
    } // 1

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/ads', this.adsController.router);
		this.app.get('/', (req, res) => { // 1
            res.sendFile(path.join(__dirname, '..', 'public', 'sheets','auth.html'));
        }); // 1
		this.app.use('/', this.profileController.router);
		this.app.get('/profile', (req, res) => {
			res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
		});
		this.app.get('/auth', (req, res) => {
			try {
				const authParams = this.imagekit.getAuthenticationParameters();
				res.json(authParams);
			} catch (error) {
				this.logger.error('Ошибка при генерации параметров аутентификации:', error);
				res.status(500).json({ error: 'Не удалось сгенерировать параметры аутентификации' });
			}
		});
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useStaticFiles(); // 1
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
