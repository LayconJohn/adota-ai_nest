import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.senha !== createUserDto.confirmarSenha) {
      throw new Error("Senha e confirmar senha devem ser iguais");
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
