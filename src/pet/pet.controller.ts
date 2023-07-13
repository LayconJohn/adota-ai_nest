import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Request, ParseIntPipe, Query } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.remove(+id);
  }
}
