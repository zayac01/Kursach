import { IsEmail, IsString } from "class-validator"

export class UserRegisterDto {
    @IsEmail({}, { message: 'Неверен email'})
    email: string

    @IsString({ message: 'Не указан пароль'})
    password: string

    @IsString({ message: 'Не указано имя'})
    name: string
}