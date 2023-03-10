import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './pages-containers/header/Header';
import { HomePage } from './pages-containers/home/HomePage';
import { LoginPage } from './pages-containers/login/LoginPage';
import { RegisterPage } from './pages-containers/register/RegisterPage';
import { ProductsPage } from './pages-containers/products/ProductsPage';
import { ProductPage } from './pages-containers/product/ProductPage';
import { AccountPage } from './pages-containers/account/AccountPage';
import { OrdersPage } from './pages-containers/orders/OrdersPage';
import { CartPage } from './pages-containers/cart/CartPage';
import { CheckoutPage } from './pages-containers/checkout/CheckoutPage';
import { AdminPage } from './pages-containers/admin/AdminPage';
import { Footer } from './pages-containers/footer/Footer';


function App() {
  return (
    <div className="app container-fluid text-center">
      <Router>

        <div className='row' id='header'>
          <Header />
        </div>
        
        <div className='row' id='main'>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            
            <Route exact path='/login' element={<LoginPage />} />
            <Route exact path='/register' element={<RegisterPage />} />
            <Route exact path='/products' element={<ProductsPage />} />
            <Route exact path='/products/:index' element={<ProductPage />} />
            
            <Route exact path='/account' element={<AccountPage />} />
            <Route exact path='/orders' element={<OrdersPage />} />
            <Route exact path='/cart' element={<CartPage />} />
            <Route exact path='/checkout' element={<CheckoutPage />} />
            
            <Route exact path='/admin' element={<AdminPage />} />
          </Routes>
        </div>

        <div className='row' id='footer'>
          <Footer />
        </div>

      </Router>
    </div>
  );
}

export default App;
