"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Пример middleware для авторизации (в реальном приложении использовать JWT)
app.use((req, res, next) => {
    // Для тестирования прикрепляем фиктивного пользователя
    req.user = { id: 1 };
    next();
});
// Регистрируем контроллер объявлений
const adsController = inversify_config_1.container.get(types_1.TYPES.AdsController);
app.use("/api/ads", adsController.router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
