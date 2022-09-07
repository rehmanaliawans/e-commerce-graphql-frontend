import "./App.css";
import Home from "./pages/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Navbar from "./components/Navbar";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";
import "@brainhubeu/react-carousel/lib/style.css";
import { CartProvider } from "react-use-cart";
import Category from "./components/Category";
const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
      <Category />
    </>
  );
};
function App() {
  const client = new ApolloClient({
    uri: "http://localhost:1337/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <CartProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
