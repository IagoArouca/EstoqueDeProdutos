import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.log('--- Swagger UI Ativo: http://localhost:3000/api ---');
    
    const config = new DocumentBuilder()
      .setTitle('Inventory API (Gestão de Estoque)')
      .setDescription('API RESTful para gerenciamento de produtos e usuários, seguindo a Clean Architecture.')
      .setVersion('1.0')
      .addTag('products', 'Operações de CRUD para Produtos')
      .addTag('auth', 'Autenticação e Registro de Usuários')

      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o JWT obtido no endpoint /auth/login',
          in: 'header',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  } else {
    console.log('--- Ambiente de Produção: Swagger Desativado ---');
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();