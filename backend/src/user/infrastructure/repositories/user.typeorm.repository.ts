import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserTypeOrmRepository {
    constructor (
        @InjectRepository(User)
        private readonly typeormRepository: Repository<User>,
    ) {}

    async findById(id: string): Promise<User> {
        const user = await this.typeormRepository.findOne({ where: { id } });
        if(!user) {
            throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`)
        }
        return user;
    }

    async findByEmail(email: string): Promise< User | null > {
        return this.typeormRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.typeormRepository.create(userData);
        return this.typeormRepository.save(newUser);
    }

    async count(): Promise<number> {
        return this.typeormRepository.count();
    }
}