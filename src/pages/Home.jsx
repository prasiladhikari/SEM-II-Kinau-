// Home.jsx - the "/" page: search + sort + product list.
import { useState } from "react";
import PropTypes from "prop-types";
import ProductList from "../components/ProductList";
import LoadingSkeleton from "../components/LoadingSkeleton";


function Home({ products, loading, error, onAddToCart }) {
  const [search, setSearch] = useState(""); // for text in the search box
  const [sortOrder, setSortOrder] = useState("default"); // dropdown value

// for loading skeletion 
if (loading) {
  return (
    <div>
      <h1>Today's Product</h1>
      {/* Same grid as the real product list, filled with 8 skeleton cards */}
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <LoadingSkeleton key={number} />
        ))}
      </div>
      <p className="message">Loading products...</p>
    </div>
  );
}


  if (error) {
    return <p className="message error-text">{error}</p>;
  }

  // Section B (2): filter by name (lowercase both so "Shirt" matches "shirt")
  let visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Section B (3): sort by price. filter() already gave us a new array,
  // so sorting it will not change the original products.
  if (sortOrder === "low") {
    visibleProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    visibleProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <h1>Today's Product</h1>

      <div className="toolbar">
        {/* Controlled inputs: the value always comes from state */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <ProductList products={visibleProducts} onAddToCart={onAddToCart} />
    </div>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Home;
