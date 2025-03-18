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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/AdsService.ts
const inversify_1 = require("inversify");
const AdsRepository_1 = __importDefault(require("../repositories/AdsRepository"));
const types_1 = require("../types");
const http_error_class_1 = require("../../../auth/src/errors/http-error.class");
let AdsService = class AdsService {
    constructor(adsRepository) {
        this.adsRepository = adsRepository;
    }
    createAd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Проверяем на дублирование объявления по уникальным полям: sts, vin и licensePlate
            const duplicate = yield this.adsRepository.findDuplicate(data.sts, data.vin, data.licensePlate);
            if (duplicate) {
                throw new http_error_class_1.HTTPError(409, "Объявление с такими СТС, VIN и госномером уже существует", "createAd");
            }
            return yield this.adsRepository.createAd(data);
        });
    }
    getAdById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adsRepository.getAdById(id);
        });
    }
    listAds(filter, sort, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            return yield this.adsRepository.listAds(filter, sort, skip, pageSize);
        });
    }
    updateAd(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adsRepository.updateAd(id, data);
        });
    }
    deleteAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Если объявление не найдено, выбрасываем HTTPError
            const ad = yield this.adsRepository.getAdById(id);
            if (!ad) {
                throw new http_error_class_1.HTTPError(404, "Объявление уже удалено или не существует", "deleteAd");
            }
            return yield this.adsRepository.deleteAd(id);
        });
    }
};
AdsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.AdsRepository)),
    __metadata("design:paramtypes", [AdsRepository_1.default])
], AdsService);
exports.default = AdsService;
