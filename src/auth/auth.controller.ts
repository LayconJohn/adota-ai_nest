import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiTags('auth')
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Request() req: AuthRequest) {
        try {
            return this.authService.login(req.body);
        } catch (error) {
            return new HttpException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                error: "Email ou senha errados"
              }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        
    }
}
