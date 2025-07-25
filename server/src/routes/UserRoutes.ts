import express from "express"
import { signUp, login, logOut, verify} from "../controllers/user.js"
import { isAuthorized } from "../middleware/auth.js";

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",isAuthorized,logOut)
router.get("/verify",isAuthorized,verify)
export default router