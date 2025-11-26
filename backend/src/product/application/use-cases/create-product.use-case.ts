import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "src/product/infrastructure/dto/create-product.dto";
import { Product } from "src/domain/entities/product.entity";
import { ProductTypeOrmRepository } from "src/product/infrastructure/repositories/product.typeorm.repository";

@Injectable()
export class CreateProductUseCase {
    constructor (
        private readonly repository: ProductTypeOrmRepository,
    ) {}

    async execute(data: CreateProductDto): Promise<Product> {

        const productToCreate = new Product();

        productToCreate.name = data.name;
        productToCreate.description = data.description ?? '';
        productToCreate.price = data.price;
        productToCreate.stock = data.stock;
        productToCreate.category = data.category ?? 'Geral';

        const createdProduct = await this.repository.create(productToCreate);

        return createdProduct;
    }
}