import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "src/domain/entities/product.entity";

@Injectable()
export class ProductTypeOrmRepository {
    constructor (
        @InjectRepository(Product)
        private readonly typeormRepository: Repository<Product>,
    ) {}

    async create(productData: Product): Promise<Product> {
        const newProduct = this.typeormRepository.create(productData);
        return this.typeormRepository.save(newProduct);
    }

    async findAll(): Promise<Product[]> {
        return this.typeormRepository.find();
    }

    async findById(id: string): Promise<Product> {
        const product = await this.typeormRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new NotFoundException(`Produto com ID "${id}" não encontrado.`)
        }

        return product;
    }

    async update(id: string, productData: Partial<Product>): Promise<Product> {
        const result = await this.typeormRepository.update(id, productData);

        if(result.affected === 0) {
            throw new NotFoundException(`Produto com ID "${id} não encontrado para atualização."`);
        }

        return this.findById(id);
    }

    async delete(id: string) : Promise<void> {
        const result = await this.typeormRepository.delete(id);

        if(result.affected === 0) {
            throw new NotFoundException(`Produto com ID "${id}" não encontrado para exclusão.`);
        }
    }
}