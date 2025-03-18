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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/AdsRepository.ts
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
let AdsRepository = class AdsRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createAd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.ad.create({
                data: {
                    brand: data.brand,
                    model: data.model,
                    year: data.year,
                    body: data.body,
                    generation: data.generation,
                    engineType: data.engineType,
                    driveType: data.driveType,
                    transmission: data.transmission,
                    engineMod: data.engineMod,
                    color: data.color,
                    mileage: data.mileage,
                    options: data.options,
                    documentType: data.documentType,
                    owners: data.owners,
                    purchaseDate: data.purchaseDate,
                    description: data.description,
                    contacts: data.contacts,
                    inspectionLat: data.inspectionLat,
                    inspectionLng: data.inspectionLng,
                    price: data.price,
                    licensePlate: data.licensePlate,
                    vin: data.vin,
                    sts: data.sts,
                    userId: data.userId,
                },
            });
        });
    }
    getAdById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.ad.findUnique({
                where: { id },
            });
        });
    }
    listAds(filter, sort, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.ad.findMany({
                where: filter,
                orderBy: sort,
                skip: skip,
                take: take,
            });
        });
    }
    updateAd(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.ad.update({
                where: { id },
                data: data,
            });
        });
    }
    deleteAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.ad.delete({
                where: { id },
            });
        });
    }
};
AdsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], AdsRepository);
exports.default = AdsRepository;
