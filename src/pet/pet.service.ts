import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto, userId: number) {
    const createdPet =  await this.prisma.pets.create({
      data: {
        ...createPetDto,
        userId: userId,
        adotado: false
      },
      include:{
        users: {
          select: {
            nome: true
          }
        }
      }
    })
    return createdPet;
  }

  async findAll() {
    const pets = await this.prisma.pets.findMany({
      where:{
        adotado: false
      }
    });
    return pets;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}


