import express from 'express'
import login, { getMessages, register, searchPeople } from '../controllers/userController.js'
import isUserAuthenticated from '../auth/isUserAuthenticated.js'
const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.post('/logout',)

userRouter.post('/send-friend-request',)
userRouter.delete('/delete-room/:roomId',)

userRouter.get('/fetch-rooms',)
userRouter.post('/create-room',)
userRouter.get('/get-messages/:roomId',)

userRouter.get("/search-people", isUserAuthenticated, searchPeople)
userRouter.get("/get-messages", isUserAuthenticated, getMessages)

export default userRouter