import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import categories from "./data/categories.js";
import User from "./models/userModel.js";
import Category from "./models/categoryModel.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleCategories = categories.map((category) => {
      return { ...category, user: adminUser };
    });

    await Category.insertMany(sampleCategories);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
