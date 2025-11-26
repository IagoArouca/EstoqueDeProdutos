import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials } from "../types/Auth";

export const Login: React.FC = () => {
    const { login, isAuthenticated} = useAuth();

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);
    const[isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setError(null);

    
    }

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
            setError(null);

            try {
                await login(credentials);
            } catch (err: any) {
                setError(err.message || "Erro desconhecido ao tentar fazer login.")
                setIsLoading(false);
            }
        };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md">
                
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                    
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Acesso ao InventoryPro
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Use suas credenciais para entrar no sistema de estoque.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Campo E-mail */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={credentials.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="seu.email@empresa.com"
                            />
                        </div>
                        
                        {/* Campo Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Exibição de Erros */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        
                        {/* Botão de Login */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                    ${isLoading 
                                        ? 'bg-indigo-400 cursor-not-allowed' 
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`
                                }
                            >
                                {isLoading ? 'Acessando...' : 'Entrar'}
                            </button>
                        </div>
                        
                    </form>
                    
                    {/* Link para Registro (NOVA SEÇÃO) */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem conta?{' '}
                            <Link 
                                to="/register" 
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Crie uma agora!
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}