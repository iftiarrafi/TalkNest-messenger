import jwt from 'jsonwebtoken'
const isUserAuthenticated = async (req, res, next) => {
    try {

        const { userToken } = req.cookies
        if (!userToken) {
            return res.status(500).json({ message: "No token is found" })
        }

        req.user = jwt.verify(userToken, process.env.JWT_SECRET)
        next()



    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while checking authentication.." })
    }
}

export default isUserAuthenticated