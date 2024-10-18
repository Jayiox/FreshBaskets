import React, { useState } from 'react';
import axios from 'axios';

const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    stockStatus: 'in stock',
    description: '',
    image: null,
    sellerEmail: localStorage.getItem('sellerEmail') || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    const productData = new FormData();
    productData.append('name', formData.productName);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('stockStatus', formData.stockStatus);
    productData.append('description', formData.description);
    productData.append('image', formData.image);
    productData.append('sellerEmail', formData.sellerEmail);

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:3000/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');
      setFormData({
        productName: '',
        price: '',
        category: '',
        stockStatus: 'in stock',
        description: '',
        image: null,
        sellerEmail: localStorage.getItem('sellerEmail') || '',
      });
    } catch (error) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl text-green-600 font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Stock Status:</label>
          <select
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Product Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
