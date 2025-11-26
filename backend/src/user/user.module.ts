import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities/user.entity';
import { UserTypeOrmRepository } from './infrastructure/repositories/user.typeorm.repository';
import { UserService } from './application/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        UserTypeOrmRepository,
        UserService,
    ],
    controllers: [],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {}
