import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import AdsController from "./controllers/AdsController";
import { AuthMiddleware } from "../../auth/src/command/auth.middleware"; // Импортируем AuthMiddleware
import { ConfigService } from "../../auth/src/config/config.service";
import { LoggerService } from "./logger/logger.service";

const app = express();

// Подключаем сервисы
const loggerService = new LoggerService();
// const configService = new ConfigService({ log: console.log, error: console.error, warn: console.warn }); // Предполагаем ILogger
const configService = new ConfigService(loggerService); // Предполагаем ILogger

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Добавляем middleware авторизации
const authMiddleware = new AuthMiddleware(configService.get("SECRET"));
app.use(authMiddleware.execute.bind(authMiddleware));

// Регистрируем контроллер объявлений
const adsController = container.get<AdsController>(TYPES.AdsController);
app.use("/api/ads", adsController.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});