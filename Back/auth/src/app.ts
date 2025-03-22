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
import ImageKit from 'imagekit';

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
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 5500;

		this.imagekit = new ImageKit({
            publicKey: this.configService.get('PUBLIC_KEY'),
            privateKey: this.configService.get('PRIVATE_KEY'),
            urlEndpoint: this.configService.get('URL_ENDPOINT'),
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
		this.app.get('/', (req, res) => { // 1
            res.sendFile(path.join(__dirname, '..', 'public', 'sheets','auth.html'));
        }); // 1
		this.app.use('/users', this.userController.router);
		this.app.use('/ads', this.adsController.router);
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
