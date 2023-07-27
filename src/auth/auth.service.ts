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
    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user: User = await this.userService.findByEmail(email); 
        if (!user) {
            throw new BadRequestError("Email ou Senha Estão incorretos");
        }
        
        const passwordIsValid = await bcryt.compare(password, user.senha);
        if (passwordIsValid) {
            const { senha, ...returnUser } = user;
            return returnUser;
        }
        
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
