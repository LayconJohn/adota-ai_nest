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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
