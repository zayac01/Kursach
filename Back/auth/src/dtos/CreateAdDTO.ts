// src/dtos/CreateAdDTO.ts
export interface CreateAdDTO {
  brand: string;
  model: string;
  year: number; // Принимаем строку или число
  body: string;
  generation: string;
  engineType: string;
  driveType: string;
  transmission: string;
  engineMod: string;
  color: string;
  mileage: string | number;
  options: string[];
  documentType: string;
  owners: string | number;
  purchaseDate: string | Date;
  description: string;
  contacts: string;
  price: number;
  licensePlate: string;
  vin: string;
  sts: string;
  userId: number;
  imageUrls: string[];
  // images?: { create: { url: string }[] };

}