// ProductList.jsx - shows many ProductCards using .map() (Section A).
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p className="message">No products found.</p>;
  }

  return (
    <div className="product-grid">
      {/* .map() turns each product object into a ProductCard.
          "key" helps React track each item in the list. */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          rating={product.rating}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;
