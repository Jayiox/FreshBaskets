import { GrLanguage, GrMenu } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(); // Initialize translation

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Change the language using i18n
    setLanguageMenuOpen(false);
  };

  return (
    <>
      <header className='bg-[#27AE60] py-4 fixed top-0 left-0 w-full z-50'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link to="/" className='text-3xl font-bold text-white cursor-pointer'>
            {t('freshBaskets')}
          </Link>

          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
              <GrMenu size={30} className='text-3xl' />
            </button>
          </div>

          <ul className='hidden md:flex items-center space-x-6'>
            <li>
              <Link to='/about' className='px-4 py-2 text-white rounded-md hover:underline transition'>
                {t('aboutUs')}
              </Link>
            </li>
            <li>
              <button
                className='border border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-[#27AE60] transition'
                onClick={() => navigate('/login')}
              >
                {t('login')}
              </button>
            </li>
            <li>
              <button
                className='bg-white text-[#27AE60] px-4 py-2 rounded-md border-white transition hover:bg-[#27AE60] hover:text-white'
                onClick={() => navigate('/signup')}
              >
                {t('signUp')}
              </button>
            </li>
            <li className='relative'>
              <button onClick={toggleLanguageMenu} className='text-white focus:outline-none'>
                <GrLanguage size={30} className='text-3xl hover:text-[#F2994A]' />
              </button>

              {/* Language Dropdown */}
              {languageMenuOpen && (
                <ul className='absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md text-center'>
                  <li
                    className='py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => changeLanguage('en')}
                  >
                    English
                  </li>
                  <li
                    className='py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => changeLanguage('tl')}
                  >
                    Tagalog
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className='absolute top-16 left-0 w-full bg-white shadow-md'>
            <ul className='flex flex-col items-center py-4 space-y-4'>
              <li>
                <Link
                  to='/about'
                  className='px-4 py-2 text-white bg-[#27AE60] rounded-md hover:bg-[#219653] transition'
                >
                  {t('aboutUs')}
                </Link>
              </li>
              <li className='w-4/5'>
                <button
                  className='border border-[#27AE60] text-[#27AE60] px-4 py-2 rounded-md w-full hover:bg-[#27AE60] hover:text-white transition'
                  onClick={() => navigate('/login')}
                >
                  {t('login')}
                </button>
              </li>
              <li className='w-4/5'>
                <button
                  className='bg-[#27AE60] text-white px-4 py-2 rounded-md w-full hover:bg-white hover:text-[#27AE60] transition'
                  onClick={() => navigate('/signup')}
                >
                  {t('signUp')}
                </button>
              </li>
              <li className='relative'>
                <button onClick={toggleLanguageMenu} className='text-[#27AE60] focus:outline-none'>
                  <GrLanguage size={30} className='hover:text-[#F2994A]' />
                </button>

                {/* Mobile Language Dropdown */}
                {languageMenuOpen && (
                  <ul className='absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md text-center'>
                    <li
                      className='py-2 hover:bg-gray-200 cursor-pointer'
                      onClick={() => changeLanguage('en')}
                    >
                      English
                    </li>
                    <li
                      className='py-2 hover:bg-gray-200 cursor-pointer'
                      onClick={() => changeLanguage('tl')}
                    >
                      Tagalog
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
