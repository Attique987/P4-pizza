import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  Bike,
  Store,
  ChevronDown,
} from "lucide-react";

import logo from "../assets/logo.png";
import { api } from "../api";

const Nav = () => {
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [deliveryMode, setDeliveryMode] = useState("delivery");

  // =========================
  // LOAD CART
  // =========================

  const loadCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const response = await api.getCart();

      const items = response?.cart?.items || [];

      const totalQuantity = items.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );

      setCartCount(totalQuantity);
    } catch (error) {
      // Backend OFF
      // Cart remains 0.
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCart();
  }, [location.pathname]);

  // Update cart whenever product is added
  useEffect(() => {
    const updateCart = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    console.log("Searching for:", searchText);

    // You can connect this to your menu search later.
  };

  // =========================
  // ACTIVE LINK
  // =========================

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* TOP OFFER BAR */}
      <div className="hidden bg-gray-950 px-4 py-2 text-center text-sm font-semibold text-white md:block">
        🍕 Fresh & Hot • Fast Delivery • Best Deals at P4 Pizza
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">

        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* =========================
              LOGO
          ========================= */}

          <Link
            to="/"
            className="flex shrink-0 items-center"
          >
            <img
              src={logo}
              alt="P4 Pizza"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* =========================
              DESKTOP NAV LINKS
          ========================= */}

          <div className="hidden items-center gap-7 lg:flex">

            <Link
              to="/"
              className={`relative py-7 text-sm font-bold transition ${
                isActive("/")
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              Home

              {isActive("/") && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-red-600" />
              )}
            </Link>

            <Link
              to="/menu"
              className={`relative py-7 text-sm font-bold transition ${
                isActive("/menu")
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              Menu

              {isActive("/menu") && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-red-600" />
              )}
            </Link>

            {/* DEALS */}
            <div className="group relative">

              <button className="flex items-center gap-1 py-7 text-sm font-bold text-gray-700 transition hover:text-red-600">
                Deals
                <ChevronDown
                  size={15}
                  className="transition-transform group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute left-1/2 top-[68px] w-52 -translate-x-1/2 translate-y-2 rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                <Link
                  to="/menu"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Wow Deals
                </Link>

                <Link
                  to="/menu"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Midnight Specials
                </Link>

                <Link
                  to="/menu"
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600"
                >
                  Birthday Deals
                </Link>

              </div>

            </div>

            <Link
              to="/about"
              className={`relative py-7 text-sm font-bold transition ${
                isActive("/about")
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`relative py-7 text-sm font-bold transition ${
                isActive("/contact")
                  ? "text-red-600"
                  : "text-gray-700 hover:text-red-600"
              }`}
            >
              Contact

              {isActive("/contact") && (
                <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-red-600" />
              )}
            </Link>

          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="hidden items-center gap-3 lg:flex">

            {/* SEARCH */}
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50"
              >
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search food..."
                  autoFocus
                  className="w-36 bg-transparent px-4 py-2 text-sm outline-none"
                />

                <button
                  type="submit"
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <Search size={19} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchText("");
                  }}
                  className="pr-3 text-gray-500 hover:text-red-600"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2.5 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
                aria-label="Search"
              >
                <Search size={21} />
              </button>
            )}

            {/* DELIVERY */}
            <button
              onClick={() => setDeliveryMode("delivery")}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                deliveryMode === "delivery"
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Bike size={18} />
              Delivery
            </button>

            {/* PICKUP */}
            <button
              onClick={() => setDeliveryMode("pickup")}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                deliveryMode === "pickup"
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <Store size={18} />
              Pickup
            </button>

            {/* CART */}
            <Link
              to="/cart"
              className="relative rounded-full p-2.5 text-gray-700 transition hover:bg-red-50 hover:text-red-600"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={23} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* LOGIN */}
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
            >
              <User size={18} />
              Login
            </Link>

          </div>

          {/* =========================
              MOBILE BUTTONS
          ========================= */}

          <div className="flex items-center gap-2 lg:hidden">

            {/* MOBILE CART */}
            <Link
              to="/cart"
              className="relative rounded-full p-2.5 text-gray-700"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-full bg-gray-100 p-2.5 text-gray-800"
              aria-label="Toggle menu"
            >
              {mobileMenu ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>

          </div>

        </div>

        {/* =========================
            MOBILE MENU
        ========================= */}

        {mobileMenu && (
          <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">

            <div className="mx-auto max-w-7xl">

              {/* SEARCH */}
              <form
                onSubmit={handleSearch}
                className="mb-5 flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
              >
                <Search
                  size={19}
                  className="ml-4 text-gray-400"
                />

                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search pizza, burger..."
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </form>

              {/* LINKS */}
              <div className="space-y-1">

                <Link
                  to="/"
                  className={`block rounded-xl px-4 py-3.5 font-bold ${
                    isActive("/")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/menu"
                  className={`block rounded-xl px-4 py-3.5 font-bold ${
                    isActive("/menu")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  Menu
                </Link>

                <Link
                  to="/menu"
                  className="block rounded-xl px-4 py-3.5 font-bold text-gray-700"
                >
                  Deals
                </Link>

                <Link
                  to="/about"
                  className={`block rounded-xl px-4 py-3.5 font-bold ${
                    isActive("/about")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className={`block rounded-xl px-4 py-3.5 font-bold ${
                    isActive("/contact")
                      ? "bg-red-50 text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  Contact
                </Link>

              </div>

              {/* DELIVERY / PICKUP */}
              <div className="mt-5 grid grid-cols-2 gap-3">

                <button
                  onClick={() => setDeliveryMode("delivery")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 font-bold ${
                    deliveryMode === "delivery"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Bike size={18} />
                  Delivery
                </button>

                <button
                  onClick={() => setDeliveryMode("pickup")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 font-bold ${
                    deliveryMode === "pickup"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <Store size={18} />
                  Pickup
                </button>

              </div>

              {/* LOGIN */}
              <Link
                to="/login"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gray-950 py-3.5 font-bold text-white"
              >
                <User size={19} />
                Login
              </Link>

            </div>

          </div>
        )}

      </nav>
    </>
  );
};

export default Nav;