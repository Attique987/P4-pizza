import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Nav from "./Pages/Nav";
import Items from "./Pages/Items";
import Menu from "./Pages/Menu";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <BrowserRouter>

      <Nav />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Items />
              <Menu />
            </>
          }
        />

        {/* MENU */}
        <Route
          path="/menu"
          element={<Menu />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={<Orders />}
        />
        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
};

export default App;