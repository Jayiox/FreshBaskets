import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying your email, please wait...');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        setMessage(response.data.msg); // Set success message from server
        setLoading(false); // Stop loading

        // Redirect to login page after showing success message
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Increase wait time for better user experience
      } catch (error) {
        setMessage('Email verification failed. Please try again.');
        setLoading(false); // Stop loading on error
        console.error('Error verifying email:', error.response?.data);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification token.');
      setLoading(false); // Stop loading if token is invalid
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      {/* Show loading message or final message based on loading state */}
      <h2 className="text-3xl font-bold text-green-600">
        {loading ? 'Verifying your email, please wait...' : message}
      </h2>
    </div>
  );
};

export default VerifyEmail;
