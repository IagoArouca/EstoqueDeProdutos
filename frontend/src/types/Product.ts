export interface Product {
    id: string;
    name: string;
    description?: string; 
    price: number;
    stock: number;
    createdAt: string; 
    updatedAt: string;
}

export interface CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}