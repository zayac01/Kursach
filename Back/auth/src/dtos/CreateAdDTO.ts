// src/dtos/CreateAdDTO.ts
export interface CreateAdDTO {
    brand: string;
    model: string;
    year: number;
    body: string;
    generation?: string;
    engineType: string;
    driveType: string;
    transmission: string;
    engineMod: string;
    color: string;
    mileage: number;
    options: string[];
    documentType: string;
    owners: number;
    purchaseDate: Date;
    description: string;
    contacts: string;
    inspectionLat?: number;
    inspectionLng?: number;
    images?: string[];
    price: number;
    licensePlate: string;
    vin: string;
    sts: string;
    userId: number;
  }
  