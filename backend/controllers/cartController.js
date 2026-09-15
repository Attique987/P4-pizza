const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET CART
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      quantity = 1,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (!product.available) {
      return res.status(400).json({
        success: false,
        message: "Product is unavailable.",
      });
    }

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity.",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() ===
        productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        product: productId,
        quantity: qty,
      });
    }

    await cart.save();

    cart = await Cart.findById(
      cart._id
    ).populate("items.product");

    res.json({
      success: true,
      message: "Product added to cart.",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCart = async (req, res) => {
  try {
    const {
      productId,
      quantity,
    } = req.body;

    if (
      !productId ||
      quantity === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID and quantity are required.",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() ===
        productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart.",
      });
    }

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter(
        (item) =>
          item.product.toString() !==
          productId
      );
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();

    const updatedCart =
      await Cart.findById(
        cart._id
      ).populate("items.product");

    res.json({
      success: true,
      message: "Cart updated.",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// REMOVE
const removeFromCart = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    const cart =
      await Cart.findOne({
        user: req.user._id,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items =
      cart.items.filter(
        (item) =>
          item.product.toString() !==
          productId
      );

    await cart.save();

    const updatedCart =
      await Cart.findById(
        cart._id
      ).populate("items.product");

    res.json({
      success: true,
      message: "Product removed.",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CLEAR
const clearCart = async (
  req,
  res
) => {
  try {
    const cart =
      await Cart.findOne({
        user: req.user._id,
      });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared.",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
};