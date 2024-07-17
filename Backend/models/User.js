import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:4,
        index: true
    },

    password: {
        type: String,
        required: true
    }
})


export const userModel = mongoose.model('User', userSchema)