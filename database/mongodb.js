import mongoose from 'mongoose';

import {NODE_ENV, MONGO_URI} from '../config/env.js';

if(!MONGO_URI){
    throw new Error('MONGO_URI is not defined');
}


const connnectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connnectDb;