// NotFound.jsx - 404 page for URLs that do not exist
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="message">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;
