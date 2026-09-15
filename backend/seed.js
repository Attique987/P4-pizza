const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");

dotenv.config();

const data = {
  "Wow Deals": [
    {
      name: "W1",
      description:
        "2 Zinger Burger + Fries + 500ml Drink",
      price: 1000,
      
    },
    {
      name: "W2",
      description:
        "3 Zinger Burger + 1L Drink",
      price: 1250,
      
    },
    {
      name: "W3",
      description:
        "2 Zinger Burger + Fries + 5 Wings",
      price: 1300,
    
    },
    {
      name: "W4",
      description:
        "2 Double Masti Burger + 500ml Drink",
      price: 1150,
      
    },
    {
      name: "W5",
      description:
        "4 Zinger Burger + 1L Drink",
      price: 1650,
      
    },
    {
      name: "W6",
      description:
        "5 Zinger Burger + 1.5L Drink",
      price: 2000,
      
    },
    {
      name: "W7",
      description:
        "4 Chicken Roll + 1L Drink",
      price: 1050,
     
    },
    {
      name: "W8",
      description:
        "5 Chicken Pieces + 1L Drink",
      price: 1150,
     
    },
  ],

  "Mid Night Specials": [
    {
      name: "N1",
      description:
        "2 Zinger Burger + 500ml Drink",
      price: 800,
     
    },
    {
      name: "N2",
      description:
        "2 Small Pizza + 1L Drink",
      price: 1300,
     
    },
    {
      name: "N3",
      description:
        "Medium Malai Boti Pizza + 500ml Drink",
      price: 1200,
      
    },
    {
      name: "N4",
      description:
        "Large Pizza + 1L Drink",
      price: 1450,
      
    },
    {
      name: "N5",
      description:
        "XLarge Pizza + 1.5L Drink",
      price: 1950,
     
    },
    {
      name: "N6",
      description:
        "2 Large Pizza + 1 Small Pizza",
      price: 3250,
   
    },
  ],

  "Birthday Specials": [
    {
      name: "BD1",
      description:
        "Large Crown Pizza + Burger + Fries + Cake",
      price: 3500,
     
    },
    {
      name: "BD2",
      description:
        "2 Large Pizza + Hot Wings + Fries + Cake",
      price: 4700,
     
    },
  ],

  "Fried Chicken": [
    {
      name: "1 Piece",
      description: "Crispy Fried Chicken",
      price: 220,
      
    },
    {
      name: "Choice Piece",
      description: "Choice Fried Chicken Piece",
      price: 250,
      
    },
    {
      name: "3 Pieces",
      description: "3 Pieces Fried Chicken",
      price: 650,
    
    },
    {
      name: "6 Pieces",
      description: "6 Pieces Fried Chicken",
      price: 1250,
      
    },
  ],

  "Crispy Wings": [
    {
      name: "5 Wings",
      description: "5 Crispy Wings",
      price: 300,
    
    },
    {
      name: "20 Wings",
      description: "20 Crispy Wings",
      price: 1100,
      
    },
  ],

  "French Fries": [
    {
      name: "Regular",
      description: "Regular French Fries",
      price: 200,
     
    },
    {
      name: "Medium",
      description: "Medium French Fries",
      price: 300,
      image: "/images/fries1.webp",
    },
    {
      name: "Large",
      description: "Large French Fries",
      price: 400,
      
    },
  ],

  "Loaded Fries": [
    {
      name: "Small Chicken Cheese Fries",
      description:
        "Small Chicken Cheese Fries",
      price: 450,
      
    },
    {
      name: "Large Chicken Cheese Fries",
      description:
        "Large Chicken Cheese Fries",
      price: 650,
    
    },
  ],

  Nuggets: [
    {
      name: "5 Nuggets",
      description: "5 Chicken Nuggets",
      price: 270,
     
    },
    {
      name: "10 Nuggets",
      description: "10 Chicken Nuggets",
      price: 500,
      
    },
  ],
};

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log("Old products/categories deleted.");

    for (const categoryName of Object.keys(
      data
    )) {
      const category =
        await Category.create({
          name: categoryName,
        });

      const products = data[
        categoryName
      ].map((product) => ({
        ...product,
        category: category._id,
        available: true,
      }));

      await Product.insertMany(
        products
      );
    }

    // Create admin
    const adminExists =
      await User.findOne({
        email: "admin@p4pizza.com",
      });

    if (!adminExists) {
      const password =
        await bcrypt.hash(
          "admin123",
          10
        );

      await User.create({
        name: "P4 Pizza Admin",
        email: "admin@p4pizza.com",
        phone: "03000000000",
        password,
        role: "admin",
      });

      console.log(
        "Admin created."
      );
    }

    console.log(
      "Database seeded successfully."
    );

    console.log(
      "Admin Email: admin@p4pizza.com"
    );

    console.log(
      "Admin Password: admin123"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();