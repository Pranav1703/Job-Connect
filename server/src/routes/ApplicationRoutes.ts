import express from "express"
import { apply, deleteApplication, getAllEmployerApplications, getAllSeekerApplications } from "../controllers/application.js"
import { isAuthorized } from "../middleware/auth.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/apply",upload.single("resume"),isAuthorized,apply)
router.get("/jobseeker/getMyApplications",isAuthorized,getAllSeekerApplications);
router.get("/employer/getMyApplicants",isAuthorized,getAllEmployerApplications);
router.delete("/delete/:id",isAuthorized,deleteApplication)

export default router