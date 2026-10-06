// ProductList.jsx 
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p className="message">No products found.</p>;
  }

  return (
    <div className="product-grid">

      {products.map((product) => (
        <ProductCard
          key={product.id} //unique product id
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
