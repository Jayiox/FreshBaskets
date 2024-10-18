import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className='container mx-auto p-8'>
      <button
        onClick={handleBackClick}
        className='flex items-center text-lg font-semibold text-green-600 hover:text-green-800 mb-6'
      >
        <FaArrowLeft className='mr-2' /> Back
      </button>
      <h1 className='text-4xl font-bold'>About Us</h1>
      <p className='mt-4 text-lg'>
        Fresh Baskets is your go-to platform for organic and fresh produce
        delivered directly to your door. Our mission is to promote sustainable
        farming and support local farmers by providing the freshest, most
        delicious produce available.
      </p>
      <br />
      <h2 className='text-4xl font-bold'>Developers:</h2>
      <p>Mackie</p>
      <p>Lester</p>
      <p>Christian</p>
      <p>Isaac</p>
    </div>
  );
};

export default AboutUs;
