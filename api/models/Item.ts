import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: null,
    },
    price: {
        type: Number,
        required: true,
        min: 0 },
    category: {
        type: String,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;