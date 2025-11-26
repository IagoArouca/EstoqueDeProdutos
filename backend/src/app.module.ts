import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { Product } from './domain/entities/product.entity'; 
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { User } from './domain/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
 
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env', 
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'), 
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Product, User],
        synchronize: true,
      }),
      inject: [ConfigService], 
    }),

    ProductModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}