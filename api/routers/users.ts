import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.generateToken();

        await user.save();
        res.send({user, message: "Register success"});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'Username not found'});
            return;
        }
        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong!'});
            return;
        }
        user.generateToken();
        await user.save();

        res.send({message: 'Username and password is correct', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};

        if (!token) {
            res.send(success);
            return;
        }

        const user = await User.findOne({token});
        if (!user) {
            res.send(success);
            return;
        }

        user.token = '';
        await user.save();
        res.send(success);
        return;

    } catch (e) {
        return next(e);
    }
});

export default userRouter;