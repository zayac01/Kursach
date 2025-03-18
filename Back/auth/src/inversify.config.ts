// src/inversify.config.ts
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import AdsController from "./controllers/AdsController";
import AdsService from "./services/AdsService";
import AdsRepository from "./repositories/AdsRepository";

const container = new Container();
container.bind<AdsRepository>(TYPES.AdsRepository).to(AdsRepository);
container.bind<AdsService>(TYPES.AdsService).to(AdsService);
container.bind<AdsController>(TYPES.AdsController).to(AdsController);

export { container };
