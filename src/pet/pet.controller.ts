import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

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
  

  @Get()
  findAll() {
    return this.petService.findAll();
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
