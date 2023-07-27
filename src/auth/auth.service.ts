import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from 'src/auth/models/UserPayload';
import { UserToken } from 'src/auth/models/UserToken';
import { BadRequestError } from './errors/badRequest.error';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
    async validateUser(email: string, senha: string): Promise<User> {
        const user: User = await this.userService.findByEmail(email); 
        if (user) {
            const passwordIsValid = await bcryt.compare(senha, user.senha);
            if (passwordIsValid) {
                return {
                    ...user,
                    senha: undefined
                }
            }
        }
        throw new BadRequestError("Email ou Senha Estão incorretos");
      }

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.nome
        };

        const jwtToken = this.jwtService.sign(payload);
        return {
            access_token: jwtToken,
        }
    }

}
