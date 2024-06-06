import Header from "./components/layout/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import "./App.css";
import {Toaster} from "react-hot-toast";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";
import orderAccepted from "./components/cart/orderAccepted";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/invoice";

function App() {
  return (
    <Router>
    <div className="App">
      <Toaster position="top-center"/>
      <Header/>

     <div className="container">
     <Routes>                                     
      <Route path="/" element={<Home/>}/>       
      <Route path="/product/:id" element={<ProductDetails/>}/>   
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/password/forgot" element={<ForgotPassword />}/>
      <Route path="/password/reset/:token" element={<ResetPassword />}/>

      <Route path="/me/profile" element={
      <ProtectedRoute>
         <Profile/>
        </ProtectedRoute>}/>
      <Route path="/me/update_profile" element={   <ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
      <Route path="/me/update_password" element={   <ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>}/>
      <Route path="/confirm_order" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>}/>
      <Route path="/payment_method" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>}/>
      <Route path="/order_accepted" element={<orderAccepted />}/>
      <Route path="/me/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>}/>
      <Route path="/me/order/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>}/>
      <Route path="/me/invoice/:id" element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
     </Routes>
     </div>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
