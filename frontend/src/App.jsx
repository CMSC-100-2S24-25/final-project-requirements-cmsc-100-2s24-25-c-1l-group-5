import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from "./components/user/Cart"; // Import Cart context
import { Toaster } from 'react-hot-toast';
import Home from "./pages/user/HomePage.jsx";
import ShoppingCart from "./pages/user/ShoppingCart.jsx";
import OrdersPage from "./pages/user/OrdersPage.jsx";
import { OrdersList } from "./components/user/OrdersList.jsx";
import LoginPage from "./pages/login-signup/LoginPage.jsx";
import SignUpPage from "./pages/login-signup/SignUpPage.jsx";
import OrderFulfillmentPage from "./pages/admin/OrderFulfillmentPage.jsx";
import ProductListingsPage from "./pages/admin/ProductListingsPage.jsx";
import DashboardPage from "./pages/admin/SalesReportPage.jsx";
import UserManagementPage from "./pages/admin/UserManagement.jsx";
import ProfilePage from "./pages/admin/ProfilePage.jsx";

function App() {
  return (
    <Router>
      <Cart>
        <OrdersList>
          <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/homepage" element={<Home />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </OrdersList>
      </Cart>
    </Router>

  );
}

export default App;
