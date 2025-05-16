import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/user/HomePage.jsx'
import ShoppingCart from "./pages/user/ShoppingCart.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </Router>
  )
}

export default App
