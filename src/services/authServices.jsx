import api from '../utils/Api';

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  }

async register(name, email, password) {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return {
      success: true,
      message: 'Registration successful, please log in.'
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed'
    };
  }
}


  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return {
        success: true,
        user: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get user'
      };
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
}

export default new AuthService();