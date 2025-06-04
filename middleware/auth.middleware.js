import jwt from 'jsonwebtoken';
import { JWT_SECRET} from "../config/env.js";
import User from "../models/users.model.js"

const authorize = (req,res,next)=>{
    try{
        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
                success: false,
                error: 'Token not found',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = User.findById(decoded._id);

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User does not exist'
            })
        }

        req.user = user;

        next();
    } catch(error){
        res.status(401).json({
            success: false,
            error: error,
            message: 'Not authorized'
        })
    }

}

export default authorize;