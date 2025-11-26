import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import { UserTypeOrmRepository } from "../infrastructure/repositories/user.typeorm.repository";

@Injectable()
export class UserService {
    constructor (
        private readonly repository: UserTypeOrmRepository,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findByEmail(email);
    }

    async registerUser(email: string, passwordPlain: string, role: string = 'employee'): Promise<User> {
        const existingUser = await this.repository.findByEmail(email)
        if(existingUser) {
            throw new ConflictException('O e-mail já está em uso.');
        }

        const passwordHash = await User.hashPassword(passwordPlain);

        const userToCreate = {
            email,
            passwordHash,
            role,
        };

        return this.repository.create(userToCreate);
    }

    async countUsers(): Promise<number> {
        return this.repository.count();
    }
}