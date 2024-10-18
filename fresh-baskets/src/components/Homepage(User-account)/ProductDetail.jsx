import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categorizedProducts } from '../../datas';
import Header from './Header';
import { useCart } from '../utils/CartsContext'; // Import the cart context
import BreadCrumbs from './BreadCrumbs'; // Import the Breadcrumbs component

const ProductDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Destructure addToCart from the context
  
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = Object.values(categorizedProducts)
      .flat()
      .find((item) => item.name?.toLowerCase() === name?.toLowerCase());
      
    setProduct(foundProduct);
    setCurrentImageIndex(0);
  }, [name]);

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p>The product you're looking for doesn't exist or is unavailable.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  const images = product.images;

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('₱', '')), // Ensure price is a number
      quantity,
      image: product.images[0], // Use the first image as thumbnail
    };

    addToCart(productToAdd);
    navigate('/carts');
  };

  const handleBuyNow = () => {
    handleAddToCart(); // First, add the product to cart
    navigate('/checkout'); // Then redirect to checkout
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const totalPrice = (parseInt(product.price.replace('₱', '').replace('/kilo', '')) * quantity).toFixed(2);

  return (
    <>
      <Header />
      
      {/* Breadcrumbs Outside the White Background */}
      <div className="max-w-5xl mx-auto p-4 mt-6">
        <BreadCrumbs productName={product.name} /> {/* Add Breadcrumbs component */}
      </div>

      {/* Product Details Section */}
      <div className="max-w-5xl mx-auto p-8 border bg-white border-green-500 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative flex flex-col items-center">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-96 h-96 object-cover rounded-lg shadow-lg"
            />

            {/* Image Navigation Buttons */}
            <button
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-800 hover:text-gray-600 transition ease-in-out"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-800 hover:text-gray-600 transition ease-in-out"
            >
              &gt;
            </button>
          </div>

          {/* Product Details */}
          <div className="text-gray-800">
            <h1 className="text-4xl font-extrabold mb-4 text-green-600">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 text-2xl">
                {"★".repeat(product.rating)}{" "}
                {"☆".repeat(5 - product.rating)}
              </span>
              <span className="ml-4 text-gray-600">({product.rating} stars)</span>
            </div>

            <p className="text-2xl font-semibold text-green-700 mb-6">₱{totalPrice}/kilo</p>

            <div className="text-gray-600">
              <h3 className="text-xl font-bold mb-2">Product Details</h3>
              <p className="text-lg">{product.details}</p>
            </div>

            {/* Quantity Control */}
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 bg-gray-200 rounded-md text-lg hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 bg-gray-200 rounded-md text-lg hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition shadow-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
