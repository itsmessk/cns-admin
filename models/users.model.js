import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false,
        required: [ true, 'Admin is required']
    },

    userName: {
        type: String,
        required: [ true, 'User Name is required'],
        minLength: [ 3, 'User Name must be at least 3 characters long'],
        maxLength: [ 20, 'User Name must be at most 20 characters long'],
        trim: true,
    },

    password: {
        type: String,
        required: [ true, 'Password is required'],
        minLength: [ 3, 'Password must be at least 3 characters long'],
        maxLength: [ 100, 'Password must be at most 20 characters long'],
        trim: true,
    },

    email: {
        type: String,
        required: [ true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }


}, {
    timestamps: true,
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

export default User;