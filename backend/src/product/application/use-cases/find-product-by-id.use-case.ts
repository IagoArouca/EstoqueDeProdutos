import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product.entity";
import { ProductTypeOrmRepository } from "src/product/infrastructure/repositories/product.typeorm.repository";

@Injectable()
export class FindProductByIdUseCase {
    constructor (
        private readonly repository: ProductTypeOrmRepository,
    ) {}

    async execute(id: string): Promise<Product> {
        return this.repository.findById(id);
    }
}