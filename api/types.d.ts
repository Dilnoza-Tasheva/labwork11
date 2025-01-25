import mongoose from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
    displayName: string;
    phone: string;
}

export interface Item {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    price: number;
    category: string;
    seller: string | mongoose.Types.ObjectId;
}

export type ItemWithoutId = Omit<Item, '_id'>