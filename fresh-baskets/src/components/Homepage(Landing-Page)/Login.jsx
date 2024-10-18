import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';  // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for react-toastify

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Check if account is unverified and notify the user to verify their email
      if (response.data.unverified) {
        toast.warn('This email has been registered but not verified. Please verify your email.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // Store token in localStorage
        localStorage.setItem('authToken', response.data.token);

        // Show success toast notification
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,  // Toast auto-closes after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirect to user-account page after successful login
        setTimeout(() => {
          navigate('/user-account');
        }, 3000);  // Wait for 3 seconds before navigating
      }
    } catch (error) {
      setError('Invalid email or password');
      
      // Show error toast notification
      toast.error('Login failed! Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <Header />
      <div className="flex items-center bg-green-100 space-x-8">
        <Link to='/'>
          <div className="flex flex-col justify-center items-start animate-fadeIn">
            <h1 className="text-5xl font-extrabold text-green-600">Fresh</h1>
            <h1 className="text-5xl font-extrabold text-[#ff8e2b]">Baskets</h1>
          </div>
        </Link>

        <div className="bg-white p-10 px-20 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            <button className="w-full bg-green-500 text-white py-2 rounded-md font-bold hover:bg-green-600 transition duration-300">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-green-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {/* Add ToastContainer to the component */}
      <ToastContainer />
    </div>
  );
};

export default Login;
