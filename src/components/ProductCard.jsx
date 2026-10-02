// ProductCard.jsx - shows detail of  ONE product (Section A).

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

function ProductCard({ id, name, price, image, rating, onAddToCart }) {
  return (
    <div className="card">

      {/*  click to open details page */}
      <Link to={`/product/${id}`} className="card-link">
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>

      <p className="price">${price.toFixed(2)}</p>
      <p className="rating">
        <Star size={16} /> {rating > 0 ? rating : "No rating yet"}
      </p>

      <button className="button" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

// PropTypes check that the right type of data is passed in.
ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
