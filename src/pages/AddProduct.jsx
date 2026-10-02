// AddProduct.jsx - the "/add" page: a controlled form with validation (Section D).
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function AddProduct({ onAddProduct }) {
  const navigate = useNavigate();

  // One state object holds all form values (controlled form)
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "electronics",
  });
  // Holds error messages, e.g. { name: "Name is required" }
  const [errors, setErrors] = useState({});

  // Runs on every keystroke. e.target.name tells us which field changed,
  // so one function can handle all inputs.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Check every field and return an object of error messages
  function validate() {
    const newErrors = {};

    if (form.name.trim() === "") {
      newErrors.name = "Product name is required.";
    }

    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    // Simple URL check: must start with http:// or https:// and have a dot
    const urlPattern = /^https?:\/\/.+\..+/;
    if (!urlPattern.test(form.image)) {
      newErrors.image = "Enter a valid URL (starting with http:// or https://).";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from reloading

    const newErrors = validate();
    setErrors(newErrors);

    // If there is any error, stop here
    if (Object.keys(newErrors).length > 0) return;

    // No errors: build the product and send it up to App
    onAddProduct({
      id: Date.now(), // simple unique number
      name: form.name.trim(),
      price: Number(form.price),
      image: form.image,
      category: form.category,
      rating: 0,
      description: "",
    });

    navigate("/"); // go back to the product list (no page reload)
  }

  return (
    <div>
      <h1>Add New Product</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Product Name
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </label>

        <label>
          Price
          <input name="price" value={form.price} onChange={handleChange} />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </label>

        <label>
          Image URL
          <input name="image" value={form.image} onChange={handleChange} />
          {errors.image && <span className="error-text">{errors.image}</span>}
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
          </select>
        </label>

        <button className="button" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

AddProduct.propTypes = {
  onAddProduct: PropTypes.func.isRequired,
};

export default AddProduct;
