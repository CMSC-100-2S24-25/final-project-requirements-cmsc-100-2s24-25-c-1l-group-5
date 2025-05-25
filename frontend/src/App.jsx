import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from "./components/user/Cart"; // Import Cart context
import { Toaster } from 'react-hot-toast';
import Home from "./pages/user/HomePage.jsx";
import ShoppingCart from "./pages/user/ShoppingCart.jsx";
import OrdersPage from "./pages/user/OrdersPage.jsx";
import { OrdersList } from "./components/user/OrdersList.jsx";
import LoginPage from "./pages/login-signup/LoginPage.jsx";
import SignUpPage from "./pages/login-signup/SignUpPage.jsx";

function App() {
  return (
    <Router>
      <Cart>
        <OrdersList>
          <Toaster />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </OrdersList>
      </Cart>
    </Router>

  );
}

export default App;
