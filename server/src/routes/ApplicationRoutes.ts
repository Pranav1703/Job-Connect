import express from "express"
import { apply } from "../controllers/application.js"
import { isAuthorized } from "../middleware/auth.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/apply",upload.single("resume"),isAuthorized,apply)


export default router