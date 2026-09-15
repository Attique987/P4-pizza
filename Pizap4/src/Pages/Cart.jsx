import React, { useEffect, useState } from "react";
import { api } from "../api";
import productImages from "../data/productImages";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const data = await api.getCart();
      setCart(data.cart);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    loadCart();
  }, []);

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    try {
      const data = await api.updateCart(
        productId,
        quantity
      );

      setCart(data.cart);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      const data =
        await api.removeFromCart(productId);

      setCart(data.cart);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const clearCart = async () => {
    try {
      const data = await api.clearCart();

      setCart(data.cart);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Cart...
      </div>
    );
  }

  const items = cart?.items || [];

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Your <span className="text-red-600">Cart</span>
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center">
            <h2 className="text-2xl font-bold">
              Your cart is empty
            </h2>

            <a
              href="/menu"
              className="inline-block mt-5 bg-red-600 text-white px-6 py-3 rounded-full"
            >
              Go to Menu
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-7">

            <div className="lg:col-span-2 space-y-4">

              {items.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={product._id}
                    className="bg-white p-4 rounded-2xl shadow flex gap-5 items-center"
                  >

                    <img
                      src={productImages[product.name]}
                      alt={product.name}
                      className="w-28 h-28 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h2 className="text-xl font-bold">
                        {product.name}
                      </h2>

                      <p className="text-gray-500">
                        Rs. {product.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 bg-gray-200 rounded-full"
                        >
                          -
                        </button>

                        <span className="font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              product._id,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 bg-red-600 text-white rounded-full"
                        >
                          +
                        </button>

                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(product._id)
                      }
                      className="text-red-600 font-semibold"
                    >
                      Remove
                    </button>

                  </div>
                );
              })}

              <button
                onClick={clearCart}
                className="text-red-600 font-semibold"
              >
                Clear Cart
              </button>

            </div>

            {/* TOTAL */}
            <div className="bg-white p-6 rounded-2xl shadow h-fit">

              <h2 className="text-2xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>Rs. {total}</span>
              </div>

              <div className="border-t my-5" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>

              <a
                href="/checkout"
                className="block text-center mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
              >
                Checkout
              </a>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;