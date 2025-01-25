import mongoose from "mongoose";
import config from "./config";
import Product from "./models/Item";
import User from "./models/User";
import { randomUUID } from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("products");
        await db.dropCollection("users");
    } catch (e) {
        console.log("Collections were not present, skipping drop");
    }

    const [user1, user2] = await User.create(
        {
            username: "john_doe",
            password: "securepassword",
            displayName: "John Doe",
            phone: "+123456789",
            token: randomUUID(),
        },
        {
            username: "jane_smith",
            password: "anotherpassword",
            displayName: "Jane Smith",
            phone: "+987654321",
            token: randomUUID(),
        }
    );

    await Product.create(
        {
            category: "Electronics",
            title: "Smartphone",
            description: "A modern smartphone with a sleek design",
            price: 699,
            image: "fixtures/smartphone.jpg",
            seller: user1._id,
        },
        {
            category: "Electronics",
            title: "Laptop",
            description: "High-performance laptop for gaming and work",
            price: 1200,
            image: "fixtures/laptop.jpg",
            seller: user2._id,
        },
        {
            category: "Furniture",
            title: "Dining Table",
            description: "Elegant wooden dining table for 6 people",
            price: 450,
            image: "fixtures/dining_table.jpeg",
            seller: user1._id,
        },
        {
            category: "Clothing",
            title: "Winter Jacket",
            description: "Warm and stylish jacket for cold seasons",
            price: 120,
            image: "fixtures/winter_jacket.jpg",
            seller: user2._id,
        }
    );
    await db.close();
};

run().catch(console.error);
