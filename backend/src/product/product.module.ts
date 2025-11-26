import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { ProductTypeOrmRepository } from './infrastructure/repositories/product.typeorm.repository';
import { ProductController } from './infrastructure/controllers/product/product.controller';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { FindAllProductsUseCase } from './application/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from './application/use-cases/find-product-by-id.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
    ],
    controllers:[ProductController],
    providers: [
        ProductTypeOrmRepository,
        CreateProductUseCase,
        FindAllProductsUseCase,
        FindProductByIdUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
    ],
})
export class ProductModule {}
