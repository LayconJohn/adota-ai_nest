import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiTags('auth')
    @Post('login')
    @IsPublic()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
