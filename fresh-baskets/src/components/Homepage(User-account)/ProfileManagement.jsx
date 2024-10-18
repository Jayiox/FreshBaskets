import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import CSS for toast styles

const ProfileManagement = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    address: '',
    email: ''
  });

  const [initialUser, setInitialUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No token found, please log in.');
        navigate('/login');
        return;
      }

      try {
        const response = await axiosInstance.get('/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        });

        setUser(response.data);
        setInitialUser(response.data); // Save the initial user data for comparison
      } catch (error) {
        console.error('Error fetching user information:', error);
        toast.error('Failed to load user info. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!user.firstName) newErrors.firstName = 'First Name is required';
    if (!user.lastName) newErrors.lastName = 'Last Name is required';
    if (!user.contactNumber) newErrors.contactNumber = 'Contact Number is required';
    if (!user.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      console.log('Updating user with data:', user);

      await axiosInstance.put('/userinfo', user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success Toast after profile update
      toast.success('Profile updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setInitialUser(user); // Update initial user state
    } catch (error) {
      console.error('Error updating user info:', error);
      // Error Toast
      toast.error('Failed to update user info. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle back button click with unsaved changes prompt
  const handleBackClick = () => {
    if (JSON.stringify(user) !== JSON.stringify(initialUser)) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave without saving?');
      if (!confirmLeave) return;
    }
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <p>Loading profile information...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <ToastContainer />
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="flex items-center text-lg font-semibold text-green-500 hover:text-green-700 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6">Profile Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <label className="block text-lg font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="border rounded p-2 w-full bg-gray-100"
          />
        </div>

        <div className="flex gap-6 mb-6">
          {/* First Name */}
          <div className="w-1/2">
            <label className="block text-lg font-bold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              disabled={submitting}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="w-1/2">
            <label className="block text-lg font-bold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              disabled={submitting}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          {/* Contact Number */}
          <div className="w-1/2">
            <label className="block text-lg font-bold">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={user.contactNumber}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              disabled={submitting}
            />
            {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
          </div>

          {/* Address */}
          <div className="w-1/2">
            <label className="block text-lg font-bold">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              disabled={submitting}
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
        </div>       

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-green-500 text-white p-2 rounded ${submitting ? 'opacity-50' : ''}`}
          disabled={submitting}
        >
          {submitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;