import { IsEmail, isEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido.'})
    @IsNotEmpty({ message: 'O campo e-mail é obrigatório.'})
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'O campo senha é obrigatório.'})
    @MinLength(8, {message: 'A senha deve ter pelo menos 8 caracteres.'})
    password: string;
}