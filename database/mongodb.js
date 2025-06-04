import mongoose from 'mongoose';

import { MONGO_URI} from '../config/env.js';

if(!MONGO_URI){
    throw new Error('MONGO_URI is not defined');
}

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "cns"
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;