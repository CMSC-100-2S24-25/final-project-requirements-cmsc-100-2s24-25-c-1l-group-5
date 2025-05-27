import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Import components
import { Cart } from "./components/user/Cart";
import { Toaster } from 'react-hot-toast';
import { OrdersList } from "./components/user/OrdersList.jsx";

// Import merchant pages
import ProductListingsPage from "./pages/admin/ProductListingsPage.jsx";
import OrderFulfillmentPage from "./pages/admin/OrderFulfillmentPage.jsx";
import SalesReportPage from "./pages/admin/SalesReportPage.jsx";
import UserManagementPage from "./pages/admin/UserManagement.jsx";

// Import customer pages
import Home from "./pages/user/HomePage.jsx";
import ShoppingCart from "./pages/user/ShoppingCart.jsx";
import OrdersPage from "./pages/user/OrdersPage.jsx";

// Import login/signup pages
import LoginPage from "./pages/login-signup/LoginPage.jsx";
import SignUpPage from "./pages/login-signup/SignUpPage.jsx";


function App() {
  const { token, userType } = useAuth();
  const isUserLoggedIn = !!token;

  return (
    <Router>
      <Cart>
        <OrdersList>
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={
                !isUserLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType === "customer" ? (
                  <Navigate to="/homepage" replace />
                ) : userType === "merchant" ? (
                  <Navigate to="/admin/products" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* Protected user routes */}
            {isUserLoggedIn && userType === "customer" && (
              <>
                <Route path="/homepage" element={<Home />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/orders" element={<OrdersPage />} />
              </>
            )}
            {/* Admin/Merchant routes */}
            {isUserLoggedIn && userType === "merchant" && (
              <>
                <Route path="/admin/products" element={<ProductListingsPage />} />
                <Route path="/admin/orders" element={<OrderFulfillmentPage />} />
                <Route path="/admin/sales-report" element={<SalesReportPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
              </>
            )}
          </Routes>
        </OrdersList>
      </Cart>
    </Router>

  );
}

export default App;