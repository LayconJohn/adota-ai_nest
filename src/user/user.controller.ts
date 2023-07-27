import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('users')
  @ApiBearerAuth()
  @IsPublic()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      return new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: "Senha e confirmar Senha devem ser iguais"
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
    
  }
}
