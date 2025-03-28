import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.interface.repo';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
	async findById(id: number): Promise<UserModel | null> { // просто изет пользователя
		return this.prismaService.client.userModel.findUnique({
		  where: { id },
		});
	  }
	  
	  async update(id: number, data: Partial<UserModel>): Promise<UserModel> {
		return this.prismaService.client.userModel.update({
		  where: { id },
		  data,
		});
	  }
}
