import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
export const isAuthorized = asyncHandler(async (req, res, next) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const { token } = req.cookies;
        if (!token) {
            return next(new Error("Token unavailable"));
        }
        const decodedToken = jwt.verify(token, secret);
        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
            throw new Error("User unauthorized");
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log("error at auth handler: ", error);
    }
});
