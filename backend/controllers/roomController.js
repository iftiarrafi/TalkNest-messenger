import chatRoomModel from "../models/chatroomModel.js"
import userModel from "../models/userModel.js"

const getchatroom = async (req, res) => {
    try {
        const { friendId } = req.params
        const myId = req.user.id

        const room = await chatRoomModel.findOne({
            people: { $all: [friendId, myId] }
        }).populate({ path: "people", select: "username , avatar" }).populate({ path: "messages", select: "content senderId senderName timestamp" });


        //console.log(room);

        if (room) {
            const messages = room.messages
            // console.log(room.messages);

            return res.status(200).json({ room, messages })
        } else {

            let user1 = await userModel.findById(friendId)
            let user2 = await userModel.findById(myId)

            const chatroomName = `${user1.username}_${user2.username}`

            const newRoom = new chatRoomModel({ roomName: chatroomName, people: [friendId, myId], messages: [] })
            const room = await newRoom.save()
            const messages = []
            return res.status(200).json({ room, messages })

        }

    } catch (error) {
        return res.status(404).json({ message: "error occured while getting room", error: error.message || error })
    }
}

export default getchatroom