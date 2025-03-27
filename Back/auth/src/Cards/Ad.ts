export interface Ad {
    id: number;
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
    purchaseDate: string;
    description: string;
    contacts: string;
    price: number;
    licensePlate: string;
    vin: string;
    sts: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    images: { url: string }[];
}