# किन्नौ

A small shopping app built with **React (Vite)**, **React Router** and **functional components + Hooks only**.
It is written to be simple and easy to read, with comments in every file.

## How to run


```bash
npm install    
npm run dev    
```

## What I used

| Package | Why |
| --- | --- |
| react, react-dom | The React library |
| react-router-dom | Pages / routes |
| prop-types | Checks the props given to components |
| lucide-react | Icons (cart, star, sun, moon, trash) |
| vite | Fast dev server and build tool |

## Folder structure

```
src/
  main.jsx               Starts React and turns on the router
  App.jsx                Main state (products, cart, theme) + all routes
  index.css              All styles, light and dark theme
  components/
    Navbar.jsx           Links, cart count, dark mode button
    ProductCard.jsx      One product card
    ProductList.jsx      Many cards using .map()
  pages/
    Home.jsx             Search + sort + list, loading and error messages
    ProductDetails.jsx   /product/:id
    Cart.jsx             /cart
    AddProduct.jsx       /add  (controlled form + validation)
    NotFound.jsx         404 page
```


## Assumptions

- Products come from `https://fakestoreapi.com/products`, so an internet connection is needed.
- New products added with the form are kept in memory only, so they disappear when the page is refreshed. The cart works the same way.
- Added products have no rating, so the card shows "No rating yet".
- Adding the same product twice increases its quantity in the cart.
- The cart count in the navbar shows the total quantity of all items.
