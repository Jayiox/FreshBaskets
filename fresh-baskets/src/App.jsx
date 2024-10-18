import Homepage from './components/Homepage(Landing-Page)/Homepage';
import UserAccountHomepage from './components/Homepage(User-account)/Homepage';
import { CartProvider } from './components/utils/CartsContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/Homepage(User-account)/ProductDetail';
import CategoryProducts from './components/Homepage(User-account)/CategoryProducts';
import Login from './components/Homepage(Landing-Page)/Login';
import Signup from './components/Homepage(Landing-Page)/Signup';
import AboutUs from './components/Homepage(Landing-Page)/AboutUs';
import VerifyEmail from './components/Homepage(Landing-Page)/VerifyEmail';
import ProfileManagement from './components/Homepage(User-account)/ProfileManagement'
import Cart from './components/User-Acount-Menu/Carts';
import StartToSell from './components/User-Acount-Menu/StartToSell';
import MyProducts from './components/User-Acount-Menu/MyProducts';
import AddNewProduct from './components/User-Acount-Menu/AddNewProduct';
import Success from './components/User-Acount-Menu/Success';
import Cancel from './components/User-Acount-Menu/Cancel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/i18n/i18n';

function App() {
  return (
    <>
      <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/user-account' element={<UserAccountHomepage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path='/product/:name' element={<ProductDetail />} />
          <Route path='/category/:categoryName' element={<CategoryProducts />} />
          <Route path="/carts" element={<Cart />} />
        <Route path="/start-to-sell" element={<StartToSell />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/add-new-product" element={<AddNewProduct />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
      </CartProvider>
      <ToastContainer />
    </>
  );
}

export default App;