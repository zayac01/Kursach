// src/server.ts
import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { container } from "./inversify.config";
import { TYPES } from "./types";
import AdsController from "./controllers/AdsController";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Пример middleware для авторизации (в реальном приложении использовать JWT)
app.use((req, res, next) => {
  // Для тестирования прикрепляем фиктивного пользователя
  req.user = { id: 1 };
  next();
});

// Регистрируем контроллер объявлений
const adsController = container.get<AdsController>(TYPES.AdsController);
app.use("/api/ads", adsController.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
