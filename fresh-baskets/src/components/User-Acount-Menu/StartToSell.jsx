import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const StartToSell = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    location: '',
    phone: '',
    email: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [businessId, setBusinessId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setTokenError('You are not logged in. Please log in to register or update your business.');
      return;
    }

    const fetchBusiness = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axiosInstance.get('/business', config);
        if (response.data.length > 0) {
          const business = response.data[0];
          setFormData({
            businessName: business.businessName,
            location: business.location,
            phone: business.phone,
            email: business.email,
          });
          setBusinessId(business._id);
          setIsUpdating(true);
        }
      } catch (error) {
        console.error('Failed to fetch business data', error);
      }
    };

    fetchBusiness();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.businessName) formErrors.businessName = 'Business Name is required';
    if (!formData.location) formErrors.location = 'Business Location is required';
    if (!formData.phone) {
      formErrors.phone = 'Phone Number is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      formErrors.phone = 'Phone Number must be digits only';
    }
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setTokenError('Authorization token is missing. Please log in again.');
      setSubmitting(false);
      return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      try {
        let response;
        if (isUpdating && businessId) {
          response = await axiosInstance.put(`/business/${businessId}`, formData, config);
          setSuccessMessage('Business updated successfully!');
          toast.success('Business updated successfully');
        } else {
          response = await axiosInstance.post('/business', formData, config);
          setSuccessMessage('Business registered successfully!');
          toast.success('Business registered successfully');
        }
        setErrors({});
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setTokenError('Unauthorized. Please log in and try again.');
        } else {
          setErrors({ apiError: 'Failed to submit business information. Try again later.' });
        }
        console.error('API error response:', error.response);
      } finally {
        setSubmitting(false);
      }
    } else {
      setErrors(formErrors);
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        {isUpdating ? 'Update Business Profile' : 'Start to Sell'}
      </h2>
      {tokenError && <p className="text-red-500 text-center">{tokenError}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Business Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {errors.apiError && <p className="text-red-500 text-sm text-center">{errors.apiError}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 ${
            submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={!!tokenError || submitting}
        >
          {isUpdating ? 'Update Business' : 'Submit'}
        </button>
      </form>
      <div className="mt-6 flex justify-between">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          onClick={() => navigate('/user-account')}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => navigate('/add-new-product')}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default StartToSell;
