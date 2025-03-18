"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
// src/inversify.config.ts
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const AdsController_1 = __importDefault(require("./controllers/AdsController"));
const AdsService_1 = __importDefault(require("./services/AdsService"));
const AdsRepository_1 = __importDefault(require("./repositories/AdsRepository"));
const container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.TYPES.AdsRepository).to(AdsRepository_1.default);
container.bind(types_1.TYPES.AdsService).to(AdsService_1.default);
container.bind(types_1.TYPES.AdsController).to(AdsController_1.default);
