import { Application } from "../models/application.js";
import { Job } from "../models/jobs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import 'dotenv/config'

export const apply = asyncHandler(async(req,res,next)=>{
    
    const {
        name,
        email,
        phone,
        gitHub,
        coverLetter,
        jobID
    } = req.body
    const job = await Job.findById(jobID)

    if(!job){
        return next(new Error("job doesnt exist"))
    }
    const applicantID = {
        user: req.body.user._id,
        role: "Job Seeker"
    }
    const employerID = {
        user: job.postedBy,
        role: "Employer"
    }

    console.log(req.file!)
    const { filename } = req.file!
    const resumePath = `storage/${filename}`

    if(!name || 
        !email ||
        !phone ||
        !gitHub||
        !coverLetter ||
        !resumePath ||
        !jobID ||
        !applicantID ||
        !employerID
    ){
        return next(new Error("provide all detials"))
    }

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        gitHub,
        resumePath,
        applicantID,
        employerID,
        jobID
    })

    res.json({
        msg: "success"
    })

})

export const getAllSeekerApplications = asyncHandler(async(req,res,next)=>{
    const { role } = req.body.user;
    if (role === "Employer") {
      return next(
        new Error("Employer not allowed to access this resource.")
      );
    }
    const { _id } = req.body.user;
    const applications = await Application.find({ "applicantID.user": _id }).populate("jobID")
                                                                            .populate("employerID.user","username")
                                                                            .populate("applicantID.user","username");

    res.json({
        msg: "success",
        applications
    })
})

export const getAllEmployerApplications = asyncHandler(async(req,res,next)=>{
    const { role } = req.body.user;
    if (role === "Job Seeker") {
      return next(
        new Error("Job Seeker not allowed to access this resource.")
      );
    }
    const { _id } = req.body.user;
    const applications = await Application.find({ "employerID.user": _id }).populate("jobID")
                                                                           .populate("employerID.user","username")
                                                                           .populate("applicantID.user","username");

    res.json({
        msg: "success",
        applications
    })
})

export const deleteApplication = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const application = await Application.findById(id)
    if(!application){
        return next(Error("Application not found"))
    }
    await application.deleteOne()
    res.status(200).json({
        msg: "Application Deleted!",
    });
})