import React from "react";
import { Sidebar } from "../components/Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-blue-100">
            < Sidebar />

            <main className="flex-1 p-6 sm:p-8">
                {children}
            </main>
        </div>
    )
};