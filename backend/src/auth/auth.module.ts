import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: parseInt(configService.get<string>('JWT_EXPIRATION_TIME')!, 10)
                },
            }),
            inject: [ConfigService],
        })
    ], providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
