import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, Matches } from "class-validator";
import { Pet } from "../entities/pet.entity";

export class CreatePetDto extends Pet {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Spike',
        description: `Informação para identificação e vizualização do Pet.`,
      })
    nome: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Pastor Alemão',
        description: `Informação para identificar o tipo de raça do Pet`,
      })
    raca: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Possui uma pata quebrada, que está recuperando',
        description: `Informação para detalhar alguma informação relevante sobre o Pet`,
      })
    descricao: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/(((https?|ftp):\/\/)?([\w\-\.])+(\.)([\w]){2,4}([\w\/+=%&_\.~?\-]*))*$/)
    @ApiProperty({
        example: 'https://example.com',
        description: `Link da imagem do Pet`,
      })
    imagem: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/)
    @ApiProperty({
        example: '(00) 99999-9999',
        description: `Informação para entrar em contato com o usuário reponsável`,
      })
    contato: string;

    @IsString()
    @Matches(/(\d{2})[-.\/](\d{2})[-.\/](\d{4})/)
    @ApiProperty({
        example: '04/06/2023',
        description: `Informação para identificar o a idade do pet`,
      })
    nascimento: string;
}
