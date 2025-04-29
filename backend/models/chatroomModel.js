import mongoose from 'mongoose'
const chatRoomSchema = new mongoose.Schema({
    roomName: { type: String, default: "room2024" },
    people: [
        { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    ],
    messages: [

        { type: mongoose.Schema.Types.ObjectId, ref: "messages" },


    ],
    groupChat: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const chatRoomModel = mongoose.model("chatrooms", chatRoomSchema)
export default chatRoomModel

