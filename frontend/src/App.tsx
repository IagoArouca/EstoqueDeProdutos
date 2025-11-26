import { Routes, Route, Navigate} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Login} from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { MainLayout } from './layouts/MainLayout';
import { ProductList } from "./pages/ProductList";


const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<MainLayout><Dashboard /></MainLayout>} />} 
      />
      <Route 
        path="/products" 
        element={<ProtectedRoute element={<MainLayout><ProductList /></MainLayout>} />} 
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;