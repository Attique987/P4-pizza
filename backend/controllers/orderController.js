const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    const {
      address,
      phone,
      paymentMethod,
    } = req.body;

    if (!address || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Address and phone are required.",
      });
    }

    const cart =
      await Cart.findOne({
        user: req.user._id,
      }).populate("items.product");

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    let total = 0;

    const orderItems =
      cart.items.map((item) => {
        const product =
          item.product;

        const itemTotal =
          product.price *
          item.quantity;

        total += itemTotal;

        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.image,
        };
      });

    const order =
      await Order.create({
        user: req.user._id,
        items: orderItems,
        address,
        phone,
        paymentMethod:
          paymentMethod ||
          "Cash on Delivery",
        total,
      });

    cart.items = [];

    await cart.save();

    const populatedOrder =
      await Order.findById(
        order._id
      )
        .populate(
          "user",
          "name email phone"
        )
        .populate(
          "items.product"
        );

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully.",
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id,
      })
        .populate("items.product")
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      )
        .populate(
          "user",
          "name email phone"
        )
        .populate(
          "items.product"
        );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You cannot view this order.",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};