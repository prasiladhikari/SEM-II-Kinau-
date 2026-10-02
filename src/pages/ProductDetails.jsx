// ProductDetails.jsx - the "/product/:id" page (Section E).
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

function ProductDetails({ products, loading, onAddToCart }) {
  // useParams reads the ":id" part of the URL, e.g. /product/3 -> "3"
  const { id } = useParams();

  if (loading) {
    return <p className="message">Loading...</p>;
  }

  // URL values are strings, so we convert the product id to a string to compare
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="message">
        <p>Product not found.</p>
        <Link to="/">Back to products</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">&larr; Back to products</Link>

      <div className="details">
        <img src={product.image} alt={product.name} />
        <div>
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="rating">
            <Star size={16} /> {product.rating > 0 ? product.rating : "No rating yet"}
          </p>
          <p>{product.description || "No description available."}</p>
          <button className="button" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductDetails;
