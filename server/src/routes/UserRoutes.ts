import express from "express"
import { signUp, login, logOut} from "../controllers/user.js"
import { isAuthorized } from "../middleware/auth.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",isAuthorized,logOut)
export default router