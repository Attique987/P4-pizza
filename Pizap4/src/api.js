const API_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const request = async (
  endpoint,
  options = {}
) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong."
    );
  }

  return data;
};

export const api = {

  register: (user) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  login: (user) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  profile: () =>
    request("/auth/profile"),

  getCategories: () =>
    request("/categories"),

  getProducts: () =>
    request("/products"),

  getCart: () =>
    request("/cart"),

  addToCart: (
    productId,
    quantity = 1
  ) =>
    request("/cart/add", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }),

  updateCart: (
    productId,
    quantity
  ) =>
    request("/cart/update", {
      method: "PUT",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }),

  removeFromCart: (productId) =>
    request(
      `/cart/remove/${productId}`,
      {
        method: "DELETE",
      }
    ),

  clearCart: () =>
    request("/cart/clear", {
      method: "DELETE",
    }),

  createOrder: (order) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    }),

  getOrders: () =>
    request("/orders"),

  getOrder: (id) =>
    request(`/orders/${id}`),
};