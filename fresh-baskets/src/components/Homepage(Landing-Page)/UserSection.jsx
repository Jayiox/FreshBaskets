import { Link } from 'react-router-dom';

const UserSection = () => {
  return (
    <>
      <section className="container mx-auto text-center p-20 mb-20 mt-16">
      <p className="text-4xl text-gray-700 mb-8">
        Ready to elevate the way you shop for fresh, local produce?
      </p>

      <div className="space-x-6">
        <Link to='/login'>
        <button className="bg-[#27AE60] text-white px-6 py-3 rounded-md hover:bg-[#219653] transition duration-300">
          Login
        </button>
        </Link>
        <Link to='/signup'>
        <button className="bg-white text-[#27AE60] border-2 border-[#27AE60] px-6 py-3 rounded-md hover:bg-[#27AE60] hover:text-white transition duration-300">
          Sign Up
        </button>
        </Link>
      </div>
    </section>
    </>
  );
};

export default UserSection;