import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл .env или он отсутствует');
			throw new Error('ConfigService: Failed to load .env file');
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		if (!this.config) {
			throw new Error('[ConfigService] Конфигурация не загружена')
			// this.logger.error('[ConfigService] Конфигурация не загружена');
		}
		const value = this.config[key];
		if (value === undefined) {
			this.logger.warn(`[ConfigService] Переменная ${key} не найдена в .env`);
		}
		return value;
	}
}