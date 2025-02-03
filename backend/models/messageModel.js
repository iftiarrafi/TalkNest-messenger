import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({
    content: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    senderName: { type: String },
    timestamp: { type: String }
})

const messageModel = mongoose.model("messages", messageSchema)
export default messageModel

