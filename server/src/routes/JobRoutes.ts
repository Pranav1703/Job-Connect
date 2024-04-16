import express from "express"
import { postjob, getAllJobs , getJobById, updateJob, getMyJobs, deleteJob } from "../controllers/jobs.js"
import { isAuthorized } from "../middleware/auth.js"

const router = express.Router()

router.post("/post",isAuthorized,postjob)
router.get("/alljobs",isAuthorized,getAllJobs)
router.get("/:id",isAuthorized,getJobById)
router.post("/update/:id",isAuthorized,updateJob)
router.get("/employer/myjobs",isAuthorized,getMyJobs)
router.delete("/delete/:id",isAuthorized,deleteJob)

export default router