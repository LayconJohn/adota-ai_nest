import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsEmail()
    email: string;

    @IsString()
    nome: string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca'
    })
    senha: string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca'
    })
    confirmarSenha: string;

    @IsString()
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
        message: 'CPF fora do formato válido'
    })
    cpf: string;
}
