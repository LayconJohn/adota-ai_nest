import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsEmail()
    @ApiProperty({
        example: 'fulaninho@email.com',
        description: `É possível conectar com redes sociais sem uma senha, mas para login usando o e-mail diretamente é necessário informar uma senha.`,
      })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'fulaninho',
        description: `É possível conectar com redes sociais sem uma senha, mas para login usando o e-mail diretamente é necessário informar uma senha.`,
      })
    @ApiProperty({
    example: 'fulaninho',
    description: `O nome será utilizado para qualquer coisa (Perfil, Home Page, etc) que precise exibir informações da pessoa conectada.`,
    })
    nome: string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca'
    })
    @ApiProperty({
        example: 'Fulano1234',
        description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
      })
    senha: string;

    @IsString()
    @MinLength(6)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca'
    })
    @ApiProperty({
        example: 'Fulano1234',
        description: `Para login usando o e-mail diretamente é necessário informar uma senha.`,
      })
    confirmarSenha: string;

    @IsString()
    @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
        message: 'CPF fora do formato válido'
    })
    @ApiProperty({
        example: '000.000.000-00',
        description: `Informação de identificação do usuário.`,
      })
    cpf: string;
}
