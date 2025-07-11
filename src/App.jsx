import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './pages/ProductForm';
import CheckoutSuccess from './pages/CheckOut';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import './App.css';
const RootRedirect = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/home" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout/success" 
                  element={
                    <ProtectedRoute>
                      <CheckoutSuccess />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/new" 
                  element={
                    <ProtectedRoute adminOnly>
                      <ProductForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/edit/:id" 
                  element={
                    <ProtectedRoute adminOnly>
                      <ProductForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users/edit/:id" 
                  element={
                    <ProtectedRoute adminOnly>
                      <UserForm />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Page not found</p>
    <a href="/" className="btn-primary">Go Home</a>
  </div>
);

const UserForm = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Edit User</h1>
    <p>User form implementation goes here...</p>
  </div>
);

export default App;