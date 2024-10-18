import { Link } from 'react-router-dom';

const ProductListing = ({ products }) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6'>
      {products.map((product) => (
        <div
          key={product.id}
          className='bg-white shadow-md rounded-lg overflow-hidden border border-green-500'
        >
          <Link to={`/product/${product.name}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='text-lg font-bold text-green-500'>{product.name}</h3>
              <p className='text-[#ff8e2b]'>{product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default ProductListing;
