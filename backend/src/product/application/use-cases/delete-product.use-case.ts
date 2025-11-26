// src/product/application/use-cases/delete-product.use-case.ts

import { Injectable } from '@nestjs/common';
import { ProductTypeOrmRepository } from '../../infrastructure/repositories/product.typeorm.repository';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        private readonly repository: ProductTypeOrmRepository,
    ) {}

    async execute(id: string): Promise<void> {
        
        return this.repository.delete(id);
    }
}