import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {api}  from '../services/api'; 
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {

            const response = await api.post('/auth/register', { 
                email, 
                password,

            });


            console.log('Registro bem-sucedido:', response.data);
            
            alert('Registro realizado com sucesso! Faça login para continuar.');
            navigate('/login'); 

        } catch (err: any) {
            console.error('Erro de Registro:', err.response);
            
            const responseData = err.response?.data;
            let errorMessage = 'Erro ao registrar usuário. Tente novamente.';

            if (responseData?.message) {
                if (Array.isArray(responseData.message)) {
                    errorMessage = responseData.message[0]; 
                } else {
                    errorMessage = responseData.message;
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl space-y-8">
                
                <div className="text-center">
                    <AcademicCapIcon className="mx-auto h-12 w-12 text-indigo-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Crie sua conta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        O primeiro usuário será o administrador do sistema.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                         <p className="mt-1 text-xs text-gray-500">
                            Mínimo de 8 caracteres.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                            <span className="block">{error}</span>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>


                <div className="text-sm text-center">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Faça login
                    </Link>
                </div>
            </div>
        </div>
    );
};