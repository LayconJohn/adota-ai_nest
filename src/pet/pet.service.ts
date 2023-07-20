import { Injectable } from '@nestjs/common';
import { BadRequestError } from 'src/auth/errors/badRequest.error';
import { NotFoundError } from 'src/auth/errors/notFound.error';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
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

  async findAll(page: number) {
    if (page < 1) {
      throw new BadRequestError("BAD_REQUEST")
    }
    let firstPet = 0;
    let lastPet = 10;
    if (page > 1) {
      firstPet = (page * 10) - 10;
      lastPet = page * 10;
    }

    const pets = await this.prisma.pets.findMany({
      where:{
        adotado: false
      },
      include: {
        users: {
          select:{
            nome: true
          }
        }
      }
    });
    return pets.reverse().slice(firstPet, lastPet);
  }

  async findOne(id: number) {
    if (id < 0 || isNaN(id)) {
      throw new BadRequestError("BAD_REQUEST");
    }
    const pet = await this.prisma.pets.findFirst({
      where: {
        id
      },
      include: {
        users:{
          select:{
            nome: true
          }
        }
      }
    })
    
    if (!pet) {
      throw new NotFoundError("NOT_FOUND")
    }
    return pet
  }

  async update(id: number, user: User) {
    if (id < 0 || isNaN(id)) {
      throw new BadRequestError("BAD_REQUEST");
    }

    const pet = await this.prisma.pets.findFirst({
      where: {
        id
      }
    })
    if (!pet) {
      if (!pet) {
        throw new NotFoundError("NOT_FOUND")
      }
    }
    if (user.id !== pet.userId) {
      throw new UnauthorizedError("UNAUTHORIZED")
    }

    return await this.prisma.pets.update({
      where: {
        id
      },
      data: {
        adotado: true
      }
    })
  }
}


