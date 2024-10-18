import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyShop = () => {
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    stockStatus: 'in stock',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', formData.productName);
    productData.append('price', formData.price);
    productData.append('category', formData.category);
    productData.append('stockStatus', formData.stockStatus);
    productData.append('description', formData.description);
    productData.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product. Try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="form-group">
          <label>Stock Status</label>
          <select
            name="stockStatus"
            value={formData.stockStatus}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="in stock">In Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="border p-2 w-full"
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default MyShop;
