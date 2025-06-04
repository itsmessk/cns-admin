import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/users.model.js';
import mongoose from 'mongoose';
import {JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV} from "../config/env.js";

console.log(NODE_ENV);

const cookieOptions = {
    secure: NODE_ENV === 'production',
    httpOnly: true ,
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 10
}

export const register = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {admin, userName, password, email} = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.status = 401;
            throw error;

        }

        const salt = await bcrypt.genSalt(10);

        const hashedPass = await bcrypt.hash(password, salt);

        //const newUser = await User.create([{ admin, userName, password: hashedPass, email }] , {session});
        const newUser = await User.create([{ admin, userName, password: hashedPass, email }]);



        const token = jwt.sign({_id: newUser[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


        await session.commitTransaction();


        res
            .status(201)
            .cookie('token', token, cookieOptions)
            .json({
                success: true,
                message: 'User successfully registered',
                token: token,
            });


    } catch (error) {
        if(session.inTransaction()){
            await session.abortTransaction();
        }
        next(error);
    }
    finally{
        await session.endSession();
    }
}

export const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            const error = new Error('Invalid Credentials, Check email or password');
            error.statusCode = 400;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error('Invalid Credentials, Check email or password');
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200)
            .cookie('token', token, cookieOptions)
            .json({
                success: true,
                message: 'User successfully logged in',
                data:{
                    user: user,
                    token: token
                }
            });
    } catch (error) {
        next(error);
    }
}
