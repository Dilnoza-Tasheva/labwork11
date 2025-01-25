import express from 'express';
import Item from '../models/Item';
import auth, { RequestWithUser } from '../middleware/auth';
import {imagesUpload} from "../multer";

const itemRouter = express.Router();

itemRouter.get('/', async (req, res) => {
    const items = await Item.find().populate('seller', 'displayName phone');
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

itemRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
        const user = (req as RequestWithUser).user;
        try {
            const { name, description, price } = req.body;
            const image = req.file ? `/images/${req.file.filename}` : null;

            const item = new Item({
                name,
                description,
                price,
                image,
                user: user._id,
            });

            await item.save();
            res.send(item);
        } catch (error) {
            next(error);
        }
    }
);

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

export default itemRouter;
