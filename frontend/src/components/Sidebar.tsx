import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Produtos', href: '/products', icon: '📦' },
    { name: 'Usuários', href: '#', icon: '👥' },
    { name: 'Relatórios', href: '#', icon: '📊' },
];

export const Sidebar: React.FC = () => {
    return (
        <div className="hidden md:flex md:flex-shrink-0 ">
            <div className="flex fle-col w-64 border-r border-gray-200 bg-gray-900">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex item-center flex-shrink-o px-4">
                        <h1 className="text-xl font-bold text-white">InventoryPro</h1>
                    </div>

                    <nav className="mt-5 flex-1 px-2 bg-gray-900 space-y-1">
                        {navigation.map((item) => (
                            < NavLink
                            key={item.name}
                            to={item.href}
                            className="bg-indigo-50 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"                           
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
};