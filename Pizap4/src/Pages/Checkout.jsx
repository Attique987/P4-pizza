import React, { useEffect, useState } from "react";
import { api } from "../api";

const Checkout = () => {
  const [form, setForm] = useState({
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    const load = async () => {
      try {
        const data = await api.getCart();
        setCart(data.cart);
      } catch (error) {
        alert(error.message);
      }
    };

    load();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await api.createOrder(form);

      alert("Order placed successfully!");

      window.location.href =
        `/orders`;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const total =
    cart?.items?.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-7">

          <form
            onSubmit={placeOrder}
            className="bg-white p-7 rounded-2xl shadow"
          >

            <h2 className="text-2xl font-bold mb-5">
              Delivery Information
            </h2>

            <textarea
              name="address"
              placeholder="Complete Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
              rows="4"
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-4"
              required
            />

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg mb-5"
            >
              <option>
                Cash on Delivery
              </option>

              <option>
                Online Payment
              </option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-full font-semibold"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>

          <div className="bg-white p-7 rounded-2xl shadow h-fit">

            <h2 className="text-2xl font-bold mb-5">
              Order Total
            </h2>

            {cart?.items?.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between mb-3"
              >
                <span>
                  {item.product.name} ×{" "}
                  {item.quantity}
                </span>

                <span>
                  Rs.{" "}
                  {item.product.price *
                    item.quantity}
                </span>
              </div>
            ))}

            <div className="border-t my-5" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;