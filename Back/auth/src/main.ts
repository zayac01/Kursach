import { Container, ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filters.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/user.controller';
import { IUserController } from './users/user.controller.interface';
import { UsersRepository } from './users/users.repo';
import { IUsersRepository } from './users/users.interface.repo';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import AdsController from './controllers/AdsController';
import AdsService from './services/AdsService';
import AdsRepository from './repositories/AdsRepository';
import { ProfileController } from './profile/profile.controller';
import { IProfileService } from './profile/profile.service.interface';
import { IArticlesRepository } from './articles/articles.interface.repo';
import { ProfileService } from './profile/profile.service';
import { ArticlesRepository } from './articles/articles.repo';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	options.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	options.bind<IUserController>(TYPES.UserController).to(UserController);
	options.bind<IUserService>(TYPES.UserService).to(UserService);
	options.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	options.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	options.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	options.bind<AdsController>(TYPES.AdsController).to(AdsController);
    options.bind<AdsService>(TYPES.AdsService).to(AdsService);
    options.bind<AdsRepository>(TYPES.AdsRepository).to(AdsRepository).inSingletonScope();
	options.bind<IProfileService>(TYPES.ProfileService).to(ProfileService);
	options.bind<ProfileController>(TYPES.ProfileController).to(ProfileController);
	options.bind<IArticlesRepository>(TYPES.ArticlesRepository).to(ArticlesRepository).inSingletonScope();
	options.bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
