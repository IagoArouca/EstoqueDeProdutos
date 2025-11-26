import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product.entity";
import { ProductTypeOrmRepository } from "src/product/infrastructure/repositories/product.typeorm.repository";
import { UpdateProductDto } from "src/product/infrastructure/dto/update-product.dto";

@Injectable()
export class UpdateProductUseCase {
    constructor (
        private readonly repository: ProductTypeOrmRepository,
    ) {}

    async execute(id: string, data: UpdateProductDto): Promise<Product> {
        const validData: Partial<UpdateProductDto> = Object.keys(data)
            .filter(key => data[key] !== undefined)
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});

            return this.repository.update(id, validData as Partial<Product>)
    }
}