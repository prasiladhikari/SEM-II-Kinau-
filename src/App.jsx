import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";

const API_URL = "https://fakestoreapi.com/products";

function App() {
  // ----- State -----
  const [products, setProducts] = useState([]); // all products
  const [loading, setLoading] = useState(true); // true while fetching
  const [error, setError] = useState(""); // error message (empty = no error)
  const [cart, setCart] = useState([]); // items in cart: { ...product, quantity }
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ----- Dark mode -----
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ----- fetch products once when the app loads -----
  // The empty [] at the end means "run only one time, on mount".
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Server responded with status " + response.status);
        }
        const data = await response.json();

        const cleanProducts = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          rating: item.rating.rate,
          category: item.category,
          description: item.description,
        }));
        setProducts(cleanProducts);
      } catch (err) {
        setError("Could not load products. " + err.message);
      } finally {
        setLoading(false); 
      }
    }

    fetchProducts();
  }, []);

  
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // Section B: add to cart. If the product is already there, increase quantity.
  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  // Section D: put the new product at the TOP of the list
  function addProduct(newProduct) {
    setProducts([newProduct, ...products]);
  }

  // Total number of items (adds up all quantities)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // ----- Section E: routes -----
  return (
    <div>
      <Navbar cartCount={cartCount} theme={theme} onToggleTheme={toggleTheme} />
      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                loading={loading}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} onRemove={removeFromCart} />}
          />
          <Route path="/add" element={<AddProduct onAddProduct={addProduct} />} />
          {/* "*" matches any URL not listed above -> 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
