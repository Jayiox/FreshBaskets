import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Basic validation
  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters and include both uppercase and lowercase letters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
          email,
          password,
          confirmPassword,
        });

        // Show success message using toast
        toast.success('Account created successfully! \n Please verify your email!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setErrors({});
        
        // Navigate to login page after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
        
      } catch (error) {
        if (error.response && error.response.data.errors) {
          const backendErrors = {};
          error.response.data.errors.forEach(err => {
            if (err.param === 'email' && err.msg === 'Email already exists') {
              backendErrors.email = 'This email has already been registered. Please login.';
            } else {
              backendErrors[err.param] = err.msg;
            }
          });
          setErrors(backendErrors);

          // Show error toast for backend errors
          toast.error('Signup failed. Please check the form for errors.', {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          setErrors({ general: 'Signup failed, please try again.' });
          
          // General error toast
          toast.error('Signup failed. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-green-100 p-8 flex flex-col items-center justify-center relative">
      {/* Back Button on the top-left */}
      <button
        onClick={handleBackClick}
        className="absolute top-6 left-6 flex items-center text-lg font-semibold text-green-600 hover:text-green-800"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="flex items-center bg-green-100 space-x-8">
        {/* Left side - Fresh Baskets logo with animation */}
        <div className="hidden md:flex flex-col justify-center items-start animate-bounce">
          <h1 className="text-5xl font-extrabold text-green-600 animate-slideIn">Fresh</h1>
          <h1 className="text-5xl font-extrabold text-[#ff8e2b] animate-slideIn">Baskets</h1>
        </div>
        <div className="bg-white p-10 px-20 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Signup</h2>

          {/* Show success message */}
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500' : 'focus:ring-green-400'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : 'focus:ring-green-400'
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500' : 'focus:ring-green-400'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-bold hover:bg-green-600 transition duration-300"
            >
              Signup
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Add ToastContainer to show toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
