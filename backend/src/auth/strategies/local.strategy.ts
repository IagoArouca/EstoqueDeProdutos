import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/application/user.service";

interface AuthLoginDto {
    email: string;
    password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (
        private readonly userService: UserService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, passwordPlain: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const isPasswordValid = await user.comparePassword(passwordPlain);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const { passwordHash, ...result } = user;
        return result;
    }
}