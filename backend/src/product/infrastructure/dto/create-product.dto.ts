import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({description: 'Nome único e comercial do produto.', example: 'Café Expresso Premium'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Preço de venda do produto.', example: 19.99 })
    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0.01)
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    stock: number;

    @IsOptional()
    @IsString()
    category?: string;
}