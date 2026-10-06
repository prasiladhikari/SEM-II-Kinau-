// Cart.jsx - the "/cart" page 
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Trash2 } from "lucide-react";

function Cart({ cart, onRemove }) {
  if (cart.length === 0) {
    return (
      <div className="message">
        <p>Your cart is empty.</p>
        <Link to="/">Go shopping</Link>
      </div>
    );
  }

  // Total price = sum of (price x quantity) for every item
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="cart-info">
            <h3>{item.name}</h3>
            <p>
              ${item.price.toFixed(2)} x {item.quantity}
            </p>
          </div>
          <button
            className="icon-button"
            onClick={() => onRemove(item.id)}
            aria-label={"Remove " + item.name}
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Cart;
