import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cart } from "./components/user/Cart"; // Import Cart context
import { Toaster } from 'react-hot-toast';
import Home from "./pages/user/HomePage.jsx";
import ShoppingCart from "./pages/user/ShoppingCart.jsx";

function App() {
  return (
    <Cart>
      <Toaster/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </Cart>
  );
}

export default App;
