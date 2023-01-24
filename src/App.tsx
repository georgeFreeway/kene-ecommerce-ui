import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks/useTypedSelectors';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { calculate } from './features/cartSlice';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Modal from './pages/Modal';
import RegisterPage from './pages/Register';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Order from './pages/Order';


function App() {
  const { cartitems } = useAppSelector((state) => state.cart);
  const { isOpen } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);

  useEffect(() => {
    dispatch(calculate());
  }, [dispatch, cartitems]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {isOpen && <Modal />}
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/products/:_id' element={<ProductPage />} />
          <Route path='/addtocart' element={<CartPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/checkout' element={ user ? <Checkout /> : <Navigate to='/register' />} />
          <Route path='/payment' element={ user ? <Payment /> : <Navigate to='/register' />} />
          <Route path='/order' element={ user ? <Order /> : <Navigate to='/register' />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
