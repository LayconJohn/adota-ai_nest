import { Controller, Get, Post, Body, Patch, Param, HttpException, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('pets')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiBearerAuth()
  @Post()
  async create(@Body() createPetDto: CreatePetDto, @CurrentUser() user:User) {
    try {
      return await this.petService.create(createPetDto, user.id);
    } catch (error) {
        return new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "Não foi possível cadastrar o pet"
        }, HttpStatus.BAD_REQUEST)
      }
  }

  @IsPublic()
  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number) {
    try {
      return await this.petService.findAll(page);
    } catch (error) {
      return new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Insira uma página válida"
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.petService.findOne(+id);
    } catch (error) {
      if (error.message === "BAD_REQUEST") {
        return new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: "Insira um id válido"
        }, HttpStatus.BAD_REQUEST);
      }
      if (error.message === "NOT_FOUND") {
        return new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: "Pet não encontrado"
        }, HttpStatus.NOT_FOUND);
      }
    }
  }

  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: string, @CurrentUser() user:User) {
    try {
      return await this.petService.update(+id, user);
    } catch (error) {
      if (error.message === "UNAUTHORIZED") {
        return new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: "Esse pet não é autorizado para esse usuário"
        }, HttpStatus.UNAUTHORIZED);
      }
      if (error.message === "NOT_FOUND") {
        return new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: "Pet não encontrado"
        }, HttpStatus.NOT_FOUND);
      }
      return new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: "Esse pet não é autorizado para esse usuário"
      }, HttpStatus.UNAUTHORIZED);
    }
  }

}
