import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';
import { UnprocessableEntityError } from 'src/auth/errors/unprocessableEntity.error';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.senha !== createUserDto.confirmarSenha) {
      throw new UnprocessableEntityError();
    }

    const userData = {
      ...createUserDto,
      confirmarSenha: undefined,
      senha: await bcrypt.hash(createUserDto.senha, 10) 
    };

    const createdUser = await this.prisma.users.create({
      data: userData
    })

    return {
      ...createdUser,
      senha: undefined
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findFirst({
      where: {
        email
      }
    })
  }

}
