import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const sellerEmail = localStorage.getItem('sellerEmail');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products?sellerEmail=${sellerEmail}`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerEmail]);

  if (loading) {
    return <p>Loading your products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">My Products</h2>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-full bg-gray-300 object-cover mr-4"
              />
              <div className="flex-grow">
                <p className="font-bold text-lg mb-2">{product.name}</p>
                <p className="text-gray-600 mb-1">{product.description}</p>
                <p className="text-gray-800 font-semibold">Price: ₱{product.unitPrice.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        className="block w-48 mx-auto mt-8 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        onClick={() => navigate('/add-new-product')}
      >
        Add New Product
      </button>
    </div>
  );
};

export default MyProducts;
