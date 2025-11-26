import React, { useState, useEffect } from 'react';
import type { Product, CreateProductDto } from '../types/Product';
import { productService } from '../services/productService';

interface ProductFormModalProps {
  product?: Product | null; 
  onClose: () => void; 
  onSuccess: () => void; 
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ 
  product, 
  onClose, 
  onSuccess 
}) => {
  
  const isEditing = !!product;
  const initialData: CreateProductDto = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
  };

  const [formData, setFormData] = useState<CreateProductDto>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(initialData);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isEditing && product) {
        await productService.update(product.id, formData);
        alert(`Produto "${formData.name}" atualizado com sucesso!`);
      } else {
        await productService.create(formData);
        alert(`Produto "${formData.name}" criado com sucesso!`);
      }
      
      onSuccess(); 
      onClose();  
      
    } catch (err: any) {
      console.error(err);
      setError(`Erro: ${err.response?.data?.message || 'Falha na comunicação com a API.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!onClose) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Produto' : 'Criar Novo Produto'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição (Opcional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input
                id="price"
                type="number"
                name="price"
                required
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Estoque</label>
              <input
                id="stock"
                type="number"
                name="stock"
                required
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-400">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-100 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md transition ${
                isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar ')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};