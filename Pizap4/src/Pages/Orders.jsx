import React, { useEffect, useState } from "react";
import { api } from "../api";
import productImages from "../data/productImages";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
      return;
    }

    const loadOrders = async () => {
      try {
        const data = await api.getOrders();
        setOrders(data.orders || []);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My <span className="text-red-600">Orders</span>
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center">
            <h2 className="text-2xl font-bold">
              No orders yet
            </h2>

            <a
              href="/menu"
              className="inline-block mt-5 bg-red-600 text-white px-6 py-3 rounded-full"
            >
              Order Now
            </a>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <div className="flex flex-wrap justify-between gap-3 mb-5">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-bold">
                      {order._id}
                    </p>
                  </div>

                  <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                    {order.status}
                  </span>

                </div>

                <div className="space-y-3">

                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <img
                        src={
                          productImages[item.name]
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold">
                          {item.name}
                        </h3>

                        <p className="text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <strong>
                        Rs.{" "}
                        {item.price *
                          item.quantity}
                      </strong>

                    </div>
                  ))}

                </div>

                <div className="border-t mt-5 pt-5 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>
                    Rs. {order.total}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;