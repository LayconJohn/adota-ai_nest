import { IsBoolean, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { Pet } from "../entities/pet.entity";

export class CreatePetDto extends Pet {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    raca: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/(((https?|ftp):\/\/)?([\w\-\.])+(\.)([\w]){2,4}([\w\/+=%&_\.~?\-]*))*$/)
    imagem: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/)
    contato: string;

    @IsString()
    @Matches(/(\d{2})[-.\/](\d{2})[-.\/](\d{4})/)
    nascimento: string;
}
