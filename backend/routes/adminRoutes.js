const express = require("express");

const {
  getDashboard,
  getUsers,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboard
);

router.get(
  "/users",
  protect,
  admin,
  getUsers
);

router.get(
  "/orders",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/orders/:id/status",
  protect,
  admin,
  updateOrderStatus
);

module.exports = router;