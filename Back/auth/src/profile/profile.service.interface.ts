import { UserModel } from '@prisma/client';

export interface UpdateProfileDto {
    name?: string;
    email?: string;
}

export interface IProfileService {
    getProfile(userId: number): Promise<UserModel>;
    getUserAds(userId: number): Promise<any[]>;
    getUserArticles(userId: number): Promise<any[]>;
    updateProfile(userId: number, data: UpdateProfileDto): Promise<UserModel>;
}