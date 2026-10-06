import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ShoppingCart, Sun, Moon } from "lucide-react";

function Navbar({ cartCount, theme, onToggleTheme }) {
  return (
    <header className="navbar">
      <Link to="/" className="logo font-nepali">
        किन्नौ
      </Link>

      <nav className="nav-links">
        <Link to="/">Products</Link>
        <Link to="/add">Add Product</Link>

        
        <Link to="/cart" className="cart-link">
          <ShoppingCart size={20} />
          <span> ({cartCount})</span>
        </Link>



        {/* Dark mode button: shows the icon of the mode you will switch TO */}
        <button
          className="icon-button"
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default Navbar;