import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/domain/entities/user.entity";

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
    ) {}

    async login(user: Partial<User>) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return {
            accessToken: this.jwtService.sign(payload),
            
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            },
        };
    }
}