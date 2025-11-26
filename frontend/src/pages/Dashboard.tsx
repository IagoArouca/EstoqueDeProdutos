import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
    CubeIcon, CurrencyDollarIcon, ExclamationTriangleIcon, ArchiveBoxArrowDownIcon 
} from '@heroicons/react/24/outline';

const mockStats = {
    totalProducts: 452,
    lowStockItems: 12,
    totalStockValue: 185200.50,
    itemsForReorder: 5,
};

const mockChartData = [
    { name: 'Teclado Mecânico', Estoque: 80, Mínimo: 10 },
    { name: 'Mouse Sem Fio', Estoque: 150, Mínimo: 20 },
    { name: 'Monitor 24"', Estoque: 45, Mínimo: 5 },
    { name: 'SSD 500GB', Estoque: 110, Mínimo: 15 },
    { name: 'Câmera Web', Estoque: 95, Mínimo: 10 },
];


const StatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    iconBgColor: string; 
}> = ({ title, value, icon: Icon, iconBgColor }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-b-4 hover:border-gray-400">

        <div className="flex items-center space-x-4">

            <div className={`flex-shrink-0 p-3 rounded-full bg-gray-100`}>
                <Icon className={`h-6 w-6 text-gray-700`} /> 
            </div>

            <div className="min-w-0"> 
                <p className="text-sm font-medium text-gray-500 truncate">{title}</p> 

                <p className="text-1xl font-extrabold text-gray-900 mt-0.5">{value}</p>
            </div>
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const formatCurrency = (value: number) => 
        `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900">
                    Visão Geral do Estoque
                </h1>
                <button
                    onClick={logout}
                    className="py-2 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
                >
                    Sair
                </button>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                    👋 Olá, {user?.email}!
                </h2>
                <p className="text-gray-600 mt-1 text-sm">
                    {user?.role === 'ADMIN' 
                        ? 'Você tem acesso total. Utilize o menu lateral para gerenciar.'
                        : 'Bem-vindo ao sistema. Você pode visualizar e consultar os produtos.'
                    }
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total de Produtos" 
                    value={mockStats.totalProducts} 
                    icon={CubeIcon}
                    iconBgColor="bg-indigo-500" 
                />
                <StatCard 
                    title="Valor Total" 
                    value={formatCurrency(mockStats.totalStockValue)} 
                    icon={CurrencyDollarIcon} 
                    iconBgColor="bg-green-500" 
                />
                <StatCard 
                    title="Estoque Baixo" 
                    value={mockStats.lowStockItems} 
                    icon={ExclamationTriangleIcon} 
                    iconBgColor="bg-yellow-500" 
                />
                <StatCard 
                    title="Itens para Recomprar" 
                    value={mockStats.itemsForReorder} 
                    icon={ArchiveBoxArrowDownIcon} 
                    iconBgColor="bg-red-500" 
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Estoque por Produto (Top 5)</h2>
                
                <div className="w-full h-80"> 
                    {isClient && ( 
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={mockChartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                                <YAxis allowDecimals={false} />
                                <Tooltip 
                                    labelStyle={{ fontWeight: 'bold' }} 
                                    formatter={(value, name) => [`${value} un.`, name]}
                                />
                                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                <Bar dataKey="Estoque" fill="#4f46e5" name="Estoque Atual" /> 
                                <Bar dataKey="Mínimo" fill="#f59e0b" name="Estoque Mínimo" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
            
        </div>
    );
};