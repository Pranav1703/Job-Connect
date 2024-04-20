import { Application } from "../models/application.js";
import { Job } from "../models/jobs.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const apply = asyncHandler(async(req,res,next)=>{
    
    console.log(req.body)
    
    const {
        name,
        email,
        phone,
        github,
        coverLetter,
        jobId
    } = req.body
    const job = await Job.findById(jobId)

    if(!job){
        return next(new Error("job doesnt exist"))
    }
    const applicantId = {
        user: req.body.user._id,
        role: "Job Seeker"
    }
    const employerId = {
        user: job.postedBy,
        role: "Employer"
    }


    console.log(req.file!)
    const { destination, filename } = req.file!
    const resumePath = destination+"/"+filename

    if(!name || 
        !email ||
        !phone ||
        !github||
        !coverLetter ||
        !resumePath ||
        !jobId ||
        !applicantId ||
        !employerId
    ){
        return next(new Error("provide all detials"))
    }

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        github,
        resumePath,
        applicantId,
        employerId
    })

    res.json({
        msg: "success"
    })

})