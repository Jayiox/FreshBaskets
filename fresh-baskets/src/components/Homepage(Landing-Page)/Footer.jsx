import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false); // this is for the scroll to top
  const [isOpen, setIsOpen] = useState(false); //  this is for the contact modal
  const openContact = () => setIsOpen(true); //  this is for the contact modal
  const closeContact = () => setIsOpen(false); // this is for the contact modal

  // this for the scrollToTop
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // this is for the contact me modal

  return (
    <>
      <footer className='w-full bg-gray-100 py-12'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='w-1/2'>
          <div className='flex flex-row gap-2 items-start'>
            <h1 className="text-4xl font-extrabold text-green-600">Fresh</h1>
            <h1 className="text-4xl font-extrabold text-[#ff8e2b]">Baskets</h1>
            </div>
            <p className='text-[#8D6E63] mt-4 text-lg'>
              Delivering the freshest local produce directly to your home while
              supporting sustainable farming and eco-conscious practices.
            </p>
          </div>

          <div className='w-1/2 flex justify-end space-x-8'>
            <div>
              <h3 className='text-xl font-semibold text-gray-700'>
                Quick Links
              </h3>
              <ul className='mt-4 space-y-2 text-gray-600'>
                <li>
                  <a
                    onClick={scrollToTop}
                    className='hover:text-[#27AE60] cursor-pointer'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <Link to='/about'>
                    <a className='hover:text-[#27AE60] cursor-pointer'>
                      About
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    onClick={openContact}
                    className='hover:text-[#27AE60] cursor-pointer'
                  >
                    Contact
                  </a>
                </li>

                {/* Modal */}
                {isOpen && (
                  <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                      <h2 className='text-2xl font-bold mb-4'>
                        Get in touch with us!
                      </h2>
                      <form className='space-y-4'>
                        <div>
                          <label className='block text-gray-700'>Name</label>
                          <input
                            type='text'
                            className='w-full border border-gray-300 px-3 py-2 rounded-md'
                            placeholder='Your Name'
                          />
                        </div>
                        <div>
                          <label className='block text-gray-700'>Email</label>
                          <input
                            type='email'
                            className='w-full border border-gray-300 px-3 py-2 rounded-md'
                            placeholder='Your Email'
                          />
                        </div>
                        <div>
                          <label className='block text-gray-700'>Message</label>
                          <textarea
                            className='w-full border border-gray-300 px-3 py-5 rounded-md'
                            placeholder='Your Message'
                          ></textarea>
                        </div>
                        <div className='flex justify-between'>
                          <button
                            type='submit'
                            className='bg-[#27AE60] text-white px-6 py-2 rounded-md hover:bg-[#219653] transition duration-300'
                          >
                            Send Message
                          </button>
                          <button
                            onClick={closeContact}
                            type='button'
                            className='bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300'
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <li>
                  <a href='#' className='hover:text-[#27AE60] cursor-pointer'>
                    Shop
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-semibold text-gray-700'>Connect</h3>
              <ul className='mt-4 space-y-2 text-gray-600'>
                <li>
                  <a href='#' className='hover:text-[#27AE60] cursor-pointer'>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-[#27AE60] cursor-pointer'>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-[#27AE60] cursor-pointer'>
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
