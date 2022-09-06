import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const routes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];
export default routes;
