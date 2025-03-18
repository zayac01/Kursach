// src/controllers/AdsController.ts
import { Request, Response, Router, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { body, query, param } from "express-validator";
import AdsService from "../services/AdsService";
import { TYPES } from "../types";
import { CreateAdDTO } from "../dtos/CreateAdDTO";
import { UpdateAdDTO } from "../dtos/UpdateAdDTO";
import { validateRequest } from "../middlewares/validateRequest";
import { AuthGuard } from "../command/auth.guard";

@injectable()
export default class AdsController {
  public router: Router;

  constructor(@inject(TYPES.AdsService) private adsService: AdsService) {
    this.router = Router();
    this.registerRoutes();
  }

  private registerRoutes(): void {
    // Создание объявления с валидацией
    this.router.post(
      "/",
      new AuthGuard().execute, // Добавляем проверку авторизации
      [
        body("brand").isString().notEmpty().withMessage("Марка обязательна"),
        body("model").isString().notEmpty().withMessage("Модель обязательна"),
        body("year")
          .isInt({ min: 1886 })
          .withMessage("Год выпуска должен быть числом, начиная с 1886"),
        body("body").isString().notEmpty().withMessage("Кузов обязательный"),
        body("engineType").isString().notEmpty().withMessage("Тип двигателя обязателен"),
        body("driveType").isString().notEmpty().withMessage("Тип привода обязателен"),
        body("transmission").isString().notEmpty().withMessage("Тип коробки передач обязателен"),
        body("engineMod").isString().notEmpty().withMessage("Модификация двигателя обязательна"),
        body("color").isString().notEmpty().withMessage("Цвет обязателен"),
        body("mileage").isInt({ min: 0 }).withMessage("Пробег должен быть неотрицательным числом"),
        body("options").custom((value) => Array.isArray(value) || typeof value === "string").withMessage("Опции должны быть массивом или строкой"),
        body("documentType").isString().notEmpty().withMessage("Тип документа обязателен"),
        body("owners").isInt({ min: 1 }).withMessage("Количество владельцев должно быть положительным числом"),
        body("purchaseDate").isISO8601().withMessage("Неверный формат даты покупки"),
        body("description").isString().notEmpty().withMessage("Описание обязательно"),
        body("contacts").isString().notEmpty().withMessage("Контакты обязательны"),
        body("price").isFloat({ min: 0 }).withMessage("Цена должна быть неотрицательным числом"),
        body("licensePlate").isString().notEmpty().withMessage("Госномер обязателен"),
        body("vin").isString().notEmpty().withMessage("VIN обязателен"),
        body("sts").isString().notEmpty().withMessage("Номер СТС обязателен"),
        body("inspectionLat").optional().isFloat().withMessage("Широта должна быть числом"),
        body("inspectionLng").optional().isFloat().withMessage("Долгота должна быть числом"),
        body("brand").isString().notEmpty().withMessage("Марка обязательна"),
      ],
      validateRequest,
      this.createAd.bind(this)
);

    // Получение списка объявлений с валидацией query-параметров
    this.router.get(
      "/",
      [
        query("page").optional().isInt({ min: 1 }).withMessage("Страница должна быть положительным числом"),
        query("pageSize").optional().isInt({ min: 1 }).withMessage("Размер страницы должен быть положительным числом"),
      ],
      validateRequest,
      this.listAds.bind(this)
    );

    // Получение объявления по ID
    this.router.get(
      "/:id",
      [param("id").isInt().withMessage("ID должен быть числом")],
      validateRequest,
      this.getAdById.bind(this)
    );

    // Обновление объявления (обновляем только разрешённые поля)
    this.router.put(
      "/:id",
      [
        param("id").isInt().withMessage("ID должен быть числом"),
        body("description").optional().isString().withMessage("Описание должно быть строкой"),
        body("price").optional().isFloat({ min: 0 }).withMessage("Цена должна быть неотрицательным числом"),
        body("contacts").optional().isString().withMessage("Контакты должны быть строкой"),
        body("options")
          .optional()
          .custom((value) => Array.isArray(value) || typeof value === "string")
          .withMessage("Опции должны быть массивом или строкой"),
        body("inspectionLat").optional().isFloat().withMessage("Широта должна быть числом"),
        body("inspectionLng").optional().isFloat().withMessage("Долгота должна быть числом"),
      ],
      validateRequest,
      this.updateAd.bind(this)
    );

    // Удаление объявления
    this.router.delete(
      "/:id",
      [param("id").isInt().withMessage("ID должен быть числом")],
      validateRequest,
      this.deleteAd.bind(this)
    );
  }

  // private async createAd(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const userId = req.user?.id;
  //     if (!userId) {
  //       res.status(401).json({ error: "Unauthorized" });
  //       return;
  //     }
  //     const data: CreateAdDTO = {
  //       ...req.body,
  //       options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
  //       purchaseDate: new Date(req.body.purchaseDate),
  //       userId: userId,
  //     };
  //     const ad = await this.adsService.createAd(data);
  //     res.status(201).json(ad);
  //   } catch (error) {
  //     if (error.message === "Объявление с такими VIN, СТС и госномером уже существует") {
  //       res.status(409).json({ error: error.message });
  //     } else {
  //       next(error);
  //     }
  //   }
  // } до chatgpt

  private async createAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const data: CreateAdDTO = {
        ...req.body,
        options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
        purchaseDate: new Date(req.body.purchaseDate),
        userId: userId
      };
      const ad = await this.adsService.createAd(data);
      res.status(201).json(ad);
    } catch (error) {
      if (error instanceof Error) {
        // Например, если обнаружен дубликат объявления
        if (error.message === "Объявление с такими VIN, СТС и госномером уже существует") {
          res.status(409).json({ error: error.message });
        } else {
          next(error);
        }
      } else {
        next(new Error("Неизвестная ошибка при создании объявления"));
      }
    }
  } // после chatgpt


  private async getAdById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const ad = await this.adsService.getAdById(id);
      if (!ad) {
        res.status(404).json({ error: "Объявление не найдено" });
        return;
      }
      res.status(200).json(ad);
    } catch (error) {
      next(error);
    }
  }

  private async listAds(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, pageSize = 10, sortField, sortOrder, ...filters } = req.query;
      const filter: any = {};
      if (filters.brand) filter.brand = String(filters.brand);
      if (filters.model) filter.model = String(filters.model);
      // Дополнительные фильтры при необходимости

      let sort: any = {};
      if (sortField && sortOrder) {
        sort[String(sortField)] = sortOrder === "asc" ? "asc" : "desc";
      } else {
        sort = { createdAt: "desc" };
      }

      const ads = await this.adsService.listAds(filter, sort, Number(page), Number(pageSize));
      res.status(200).json(ads);
    } catch (error) {
      next(error);
    }
  }

  private async updateAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const data: UpdateAdDTO = {
        description: req.body.description,
        price: req.body.price,
        contacts: req.body.contacts,
        options: Array.isArray(req.body.options) ? req.body.options : [req.body.options],
        inspectionLat: req.body.inspectionLat,
        inspectionLng: req.body.inspectionLng,
      };
      const updatedAd = await this.adsService.updateAd(id, data);
      res.status(200).json(updatedAd);
    } catch (error) {
      next(error);
    }
  }

  private async deleteAd(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deletedAd = await this.adsService.deleteAd(id);
      res.status(200).json(deletedAd);
    } catch (error) {
      next(error); // Ошибка будет обработана в ExceptionFilter
    }
  }
}
