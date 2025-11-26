import React, { useCallback, useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { productService } from '../services/productService';
import { ProductFormModal } from '../components/ProductFormModal';

const StockBadge: React.FC<{ stock: number }> = ({ stock }) => {
    let color: string;
    let label: string;

    if (stock > 50) {
        color = 'bg-green-100 text-green-800';
        label = 'Estoque Alto';
    } else if (stock > 10) {
        color = 'bg-yellow-100 text-yellow-800';
        label = 'Estoque Médio';
    } else {
        color = 'bg-red-100 text-red-800';
        label = 'Estoque Baixo!';
    }

    return (
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {label} ({stock})
        </span>
    );
};


export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await productService.getAll();

            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                setError("O formato de dados da API está incorreto (Não é um Array).");
                setProducts([]);
            }
        } catch (err: any) {
            const apiMessage = err.response?.data?.message || 'Falha na comunicação com a API.';
            setError(`Erro ao carregar produtos: ${apiMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); 

    const handleCreateClick = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id: string, name: string) => { 
        if (!window.confirm(`Tem certeza que deseja excluir o produto "${name}"?`)) {
            return;
        }
        try {
            await productService.remove(id);
            alert(`Produto "${name}" excluído com sucesso.`);
            fetchProducts();
        } catch (err: any) {
            alert(`Erro ao excluir: ${err.response?.data?.message || 'Falha na comunicação com a API.'}`);
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }

    if (isLoading) {
        return <div className="text-gray-700 text-center py-10">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="text-red-600 font-bold text-center py-10">{error}</div>;
    }

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-md">

                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Produtos</h1>
                    <button 
                        onClick={handleCreateClick}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
                    >
                        Adicionar
                    </button>
                </div>

                <div className="overflow-x-auto">
                    {products.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center bg-gray-50 rounded-lg">Nenhum produto cadastrado. Clique no botão acima para adicionar!</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Preço</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estoque</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-indigo-50 transition duration-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-500">
                                            {product.id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{product.name}</td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">
                                            R$ {parseFloat(product.price as unknown as string).toFixed(2).replace('.', ',')}
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <StockBadge stock={product.stock} />
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                            <button 
                                                onClick={() => handleEditClick(product)}
                                                className="text-indigo-600 hover:text-indigo-900 font-medium"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(product.id as string, product.name)}
                                                className="text-red-600 hover:text-red-900 font-medium"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <ProductFormModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSuccess={fetchProducts}
                />
            )}
        </>
    );
};