import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    DOB: {
        type: String
    },
    worksAt: {
        type: String
    },

    friends: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        },
    ],
    notifications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'notifications'
        },
    ],
    rooms: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'rooms'
        },
    ],
    avatar: {
        type: String,
        default: "avatar_url"
    },
    cloudinary_id: {
        type: String,
        default: "avatar_url"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel