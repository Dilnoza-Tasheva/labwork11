import express from 'express';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middleware/auth';
import {imagesUpload} from "../multer";
import {ItemWithoutId} from "../types";

const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category: category.toString() } : {};
    const items = await Item.find(filter).populate("seller", "displayName phone");
    res.send(items);
});

itemRouter.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id).populate('seller', 'displayName phone');
    if (!item) {
        res.status(404).send({ error: 'Item not found' })
        return;
    }
    res.send(item);
});

const CATEGORIES = ["Electronics", "Furniture", "Clothing"];

itemRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        if (req.body.category && !CATEGORIES.includes(req.body.category)) {
             res.status(400).send({ error: "Invalid category" });
             return;
        }
        const newItemData: ItemWithoutId = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file ? `/images/${req.file.filename}` : null,
            seller: req.body.seller,
        };

        const item = new Item(newItemData);
        await item.save();

        res.send(item);
    } catch (error) {
        next(error);
    }
});

itemRouter.delete('/:id', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            res.status(404).send({ error: 'Item not found' });
            return;
        }
        if (item.seller.toString() !== user._id.toString()) {
            res.status(403).send({ error: 'Unauthorized' });
            return;
        }
        await item.deleteOne();
        res.send({ message: 'Item deleted' });
    } catch (error) {
        next(error);
    }
});

itemRouter.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    if (!CATEGORIES.includes(category)) {
        res.status(400).send({ error: 'Invalid category' });
        return;
    }
    const items = await Item.find({ category }).populate('seller', 'displayName phone');
    res.send(items);
});


export default itemRouter;
