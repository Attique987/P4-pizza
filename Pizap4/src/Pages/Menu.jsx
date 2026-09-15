import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import { api } from "../api";
import productImages from "../data/productImages";
import {
  localCategories,
  localProducts,
} from "../data/localMenuData";

const Menu = () => {
  const [categories, setCategories] = useState(localCategories);
  const [products, setProducts] = useState(localProducts);
  const [selectedCategory, setSelectedCategory] = useState(
    localCategories[0]._id
  );

  const [loading, setLoading] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      setLoading(true);

      const [categoryResponse, productResponse] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);

      const backendCategories =
        categoryResponse.categories || categoryResponse.data || [];

      const backendProducts =
        productResponse.products || productResponse.data || [];

      if (backendCategories.length > 0) {
        setCategories(backendCategories);
        setSelectedCategory(backendCategories[0]._id);
      }

      if (backendProducts.length > 0) {
        setProducts(backendProducts);
      }
    } catch (error) {
      console.log("Backend is OFF. Using local frontend menu.");

      // IMPORTANT:
      // Do NOT clear products here.
      // Local products will continue showing.
      setCategories(localCategories);
      setProducts(localProducts);
      setSelectedCategory(localCategories[0]._id);
    } finally {
      setLoading(false);
    }
  };

  const scrollCategories = (direction) => {
    if (!categoryRef.current) return;

    categoryRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  const getProductImage = (item) => {
    // First use local frontend image
    if (productImages[item.name]) {
      return productImages[item.name];
    }

    // If backend product has no local image, use backend image
    if (item.image) {
      if (item.image.startsWith("http")) {
        return item.image;
      }

      return `http://localhost:5000${item.image}`;
    }

    return "/placeholder.png";
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      await api.addToCart(productId, 1);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart!");
    } catch (error) {
      alert(
        "Backend is not running. Please start the backend to use the cart."
      );
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.category?._id === selectedCategory ||
      product.category === selectedCategory
  );

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">

        {/* TITLE */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-red-600">
            Our Menu
          </p>

          <h2 className="text-4xl font-extrabold text-gray-900">
            Delicious Food For Everyone
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Freshly prepared pizzas, burgers, fried chicken and delicious
            deals made especially for you.
          </p>
        </div>

        {/* CATEGORY NAV */}
        <div className="relative mb-10">

          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            ref={categoryRef}
            className="flex gap-3 overflow-x-auto px-10 scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`whitespace-nowrap rounded-full px-6 py-3 font-semibold transition ${
                  selectedCategory === category._id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-red-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mb-6 text-center text-gray-500">
            Loading menu...
          </div>
        )}

        {/* PRODUCTS */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden bg-gray-100">

                  <img
                    src={getProductImage(item)}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {!item.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="rounded-full bg-white px-4 py-2 font-bold text-red-600">
                        Not Available
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xl font-extrabold text-red-600">
                      Rs. {item.price}
                    </span>

                    <button
                      disabled={!item.available}
                      onClick={() => handleAddToCart(item._id)}
                      className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      <ShoppingCart size={18} />
                      Add
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;