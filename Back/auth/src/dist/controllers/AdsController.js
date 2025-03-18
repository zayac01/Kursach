"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/controllers/AdsController.ts
const express_1 = require("express");
const inversify_1 = require("inversify");
const express_validator_1 = require("express-validator");
const AdsService_1 = __importDefault(require("../services/AdsService"));
const types_1 = require("../types");
const validateRequest_1 = require("../middlewares/validateRequest");
let AdsController = class AdsController {
    constructor(adsService) {
        this.adsService = adsService;
        this.router = (0, express_1.Router)();
        this.registerRoutes();
    }
    registerRoutes() {
        // Создание объявления с валидацией
        this.router.post("/", [
            (0, express_validator_1.body)("brand").isString().notEmpty().withMessage("Марка обязательна"),
            (0, express_validator_1.body)("model").isString().notEmpty().withMessage("Модель обязательна"),
            (0, express_validator_1.body)("year")
                .isInt({ min: 1886 })
                .withMessage("Год выпуска должен быть числом, начиная с 1886"),
            (0, express_validator_1.body)("body").isString().notEmpty().withMessage("Кузов обязательный"),
            (0, express_validator_1.body)("engineType").isString().notEmpty().withMessage("Тип двигателя обязателен"),
            (0, express_validator_1.body)("driveType").isString().notEmpty().withMessage("Тип привода обязателен"),
            (0, express_validator_1.body)("transmission").isString().notEmpty().withMessage("Тип коробки передач обязателен"),
            (0, express_validator_1.body)("engineMod").isString().notEmpty().withMessage("Модификация двигателя обязательна"),
            (0, express_validator_1.body)("color").isString().notEmpty().withMessage("Цвет обязателен"),
            (0, express_validator_1.body)("mileage").isInt({ min: 0 }).withMessage("Пробег должен быть неотрицательным числом"),
            (0, express_validator_1.body)("options").custom((value) => Array.isArray(value) || typeof value === "string").withMessage("Опции должны быть массивом или строкой"),
            (0, express_validator_1.body)("documentType").isString().notEmpty().withMessage("Тип документа обязателен"),
            (0, express_validator_1.body)("owners").isInt({ min: 1 }).withMessage("Количество владельцев должно быть положительным числом"),
            (0, express_validator_1.body)("purchaseDate").isISO8601().withMessage("Неверный формат даты покупки"),
            (0, express_validator_1.body)("description").isString().notEmpty().withMessage("Описание обязательно"),
            (0, express_validator_1.body)("contacts").isString().notEmpty().withMessage("Контакты обязательны"),
            (0, express_validator_1.body)("price").isFloat({ min: 0 }).withMessage("Цена должна быть неотрицательным числом"),
            (0, express_validator_1.body)("licensePlate").isString().notEmpty().withMessage("Госномер обязателен"),
            (0, express_validator_1.body)("vin").isString().notEmpty().withMessage("VIN обязателен"),
            (0, express_validator_1.body)("sts").isString().notEmpty().withMessage("Номер СТС обязателен"),
            (0, express_validator_1.body)("inspectionLat").optional().isFloat().withMessage("Широта должна быть числом"),
            (0, express_validator_1.body)("inspectionLng").optional().isFloat().withMessage("Долгота должна быть числом"),
        ], validateRequest_1.validateRequest, this.createAd.bind(this));
        // Получение списка объявлений с валидацией query-параметров
        this.router.get("/", [
            (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Страница должна быть положительным числом"),
            (0, express_validator_1.query)("pageSize").optional().isInt({ min: 1 }).withMessage("Размер страницы должен быть положительным числом"),
        ], validateRequest_1.validateRequest, this.listAds.bind(this));
        // Получение объявления по ID
        this.router.get("/:id", [(0, express_validator_1.param)("id").isInt().withMessage("ID должен быть числом")], validateRequest_1.validateRequest, this.getAdById.bind(this));
        // Обновление объявления (обновляем только разрешённые поля)
        this.router.put("/:id", [
            (0, express_validator_1.param)("id").isInt().withMessage("ID должен быть числом"),
            (0, express_validator_1.body)("description").optional().isString().withMessage("Описание должно быть строкой"),
            (0, express_validator_1.body)("price").optional().isFloat({ min: 0 }).withMessage("Цена должна быть неотрицательным числом"),
            (0, express_validator_1.body)("contacts").optional().isString().withMessage("Контакты должны быть строкой"),
            (0, express_validator_1.body)("options")
                .optional()
                .custom((value) => Array.isArray(value) || typeof value === "string")
                .withMessage("Опции должны быть массивом или строкой"),
            (0, express_validator_1.body)("inspectionLat").optional().isFloat().withMessage("Широта должна быть числом"),
            (0, express_validator_1.body)("inspectionLng").optional().isFloat().withMessage("Долгота должна быть числом"),
        ], validateRequest_1.validateRequest, this.updateAd.bind(this));
        // Удаление объявления
        this.router.delete("/:id", [(0, express_validator_1.param)("id").isInt().withMessage("ID должен быть числом")], validateRequest_1.validateRequest, this.deleteAd.bind(this));
    }
    createAd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ error: "Unauthorized" });
                    return;
                }
                const data = Object.assign(Object.assign({}, req.body), { options: Array.isArray(req.body.options) ? req.body.options : [req.body.options], purchaseDate: new Date(req.body.purchaseDate), userId: userId });
                const ad = yield this.adsService.createAd(data);
                res.status(201).json(ad);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAdById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const ad = yield this.adsService.getAdById(id);
                if (!ad) {
                    res.status(404).json({ error: "Объявление не найдено" });
                    return;
                }
                res.status(200).json(ad);
            }
            catch (error) {
                next(error);
            }
        });
    }
    listAds(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.query, { page = 1, pageSize = 10, sortField, sortOrder } = _a, filters = __rest(_a, ["page", "pageSize", "sortField", "sortOrder"]);
                const filter = {};
                if (filters.brand)
                    filter.brand = String(filters.brand);
                if (filters.model)
                    filter.model = String(filters.model);
                // Дополнительные фильтры при необходимости
                let sort = {};
                if (sortField && sortOrder) {
                    sort[String(sortField)] = sortOrder === "asc" ? "asc" : "desc";
                }
                else {
                    sort = { createdAt: "desc" };
                }
                const ads = yield this.adsService.listAds(filter, sort, Number(page), Number(pageSize));
                res.status(200).json(ads);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateAd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const data = {
                    description: req.body.description,
                    price: req.body.price,
                    contacts: req.body.contacts,
                    options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
                    inspectionLat: req.body.inspectionLat,
                    inspectionLng: req.body.inspectionLng,
                };
                const updatedAd = yield this.adsService.updateAd(id, data);
                res.status(200).json(updatedAd);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteAd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deletedAd = yield this.adsService.deleteAd(id);
                res.status(200).json(deletedAd);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
AdsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AdsService)),
    __metadata("design:paramtypes", [AdsService_1.default])
], AdsController);
exports.default = AdsController;
