import express from 'express'
import isUserAuthenticated from '../auth/isUserAuthenticated.js'
import getchatroom from '../controllers/roomController.js'
const chatroomRouter = express.Router()

chatroomRouter.get("/get-room/:friendId", isUserAuthenticated, getchatroom)

export default chatroomRouter