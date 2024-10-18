import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = ({ searchQuery, onSearchChange, onLogoClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSeller, setIsSeller] = useState(false); // State to track if the user is a seller
  const navigate = useNavigate();

  useEffect(() => {
    const checkSellerStatus = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('/api/user/account', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.role === 'seller') {
          setIsSeller(true);
        }
      } catch (error) {
        console.log('Error fetching user account:', error);
      }
    };

    checkSellerStatus();
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    toast.success('Logout successful!');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="border-b-2 pt-5 pb-5 border-[#27AE60]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/user-account" onClick={onLogoClick}>
            <div className="flex flex-row gap-2 items-start">
              <h1 className="text-3xl font-extrabold text-green-600">Fresh</h1>
              <h1 className="text-3xl font-extrabold text-[#ff8e2b]">Baskets</h1>
            </div>
          </Link>

          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search..."
              className="border rounded-full py-2 px-4 w-72 ring-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-2 text-gray-500 hover:text-green-500">
              <FaSearch />
            </button>
          </div>

          <div className="flex space-x-4 items-center relative">
            <IoPerson className="text-[#27AE60] text-2xl cursor-pointer" onClick={handleProfileClick} />
            <GiHamburgerMenu className="text-[#27AE60] text-2xl cursor-pointer" onClick={toggleMenu} />

            {menuOpen && (
              <div className="absolute right-0 mt-56 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <ul className="flex flex-col items-center space-y-2">
                  {!isSeller ? (
                    <li>
                      <Link to="/start-to-sell" className="hover:text-green-600">
                        Start to Sell
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/my-shop" className="hover:text-green-600">
                        My Shop
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/carts" className="hover:text-green-600">
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-orders" className="hover:text-green-600">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-700 font-bold w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
 