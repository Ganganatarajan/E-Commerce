import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'admin' or 'user'
    const { login } = useAuth();
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setError('');
    setLoading(true);
     const result = await login(formData.email, formData.password);

     if (result.success) {
      console.log('dhsdhsdkjd success')
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };


  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Here you would integrate with your actual authentication API
  //     // For now, just show a success message
  //     if (formData.email && formData.password) {
  //       alert(`Login successful! Welcome ${loginType}!`);
  //       // Here you would typically redirect to the appropriate dashboard
  //     } else {
  //       setError('Please enter valid credentials.');
  //     }
  //   } catch (err) {
  //     setError('Login failed. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-pink-100">
            {loginType === 'admin' ? (
              <Shield className="h-6 w-6 text-pink-600" />
            ) : (
              <UserCheck className="h-6 w-6 text-gray-600" />
            )}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {loginType === 'admin' ? 'Admin Login' : 'User Login'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choose your login type and sign in to your account
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 space-y-6">
          {/* Login Type Selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setLoginType('admin');
                setFormData({ email: '', password: '' });
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginType === 'admin'
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType('user');
                setFormData({ email: '', password: '' });
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                loginType === 'user'
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <UserCheck className="w-4 h-4 inline mr-2" />
              User
            </button>
          </div>



          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition disabled:opacity-50 ${
                loginType === 'admin'
                  ? 'bg-pink-600 text-white hover:bg-pink-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {loading ? 'Signing in...' : `Sign in as ${loginType}`}
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;