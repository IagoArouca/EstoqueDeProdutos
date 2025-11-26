import { api } from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '../types/Product';

import type { ApiResponse } from '../types/Common'; 

export const productService = {
    async getAll(): Promise<Product[]> {
        const response = await api.get<ApiResponse<Product[]>>('/products');
        return response.data.data;
    },
    
    async getById(id: string): Promise<Product> {
        const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
        return response.data.data;
    },
    
    async create(dto: CreateProductDto): Promise<Product> {
        const response = await api.post<ApiResponse<Product>>('/products', dto);
        return response.data.data;
    },
    
    async update(id: string, dto: UpdateProductDto): Promise<Product> {

        const response = await api.patch<ApiResponse<Product>>(`/products/${id}`, dto);
        return response.data.data;
    },
    

    async remove(id: string): Promise<void> {
        await api.delete<ApiResponse<void>>(`/products/${id}`);
    }
};