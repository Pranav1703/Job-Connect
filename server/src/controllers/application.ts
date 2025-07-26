import { Application } from "../models/application.js";
import { Job } from "../models/jobs.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import 'dotenv/config'
import { S3Client, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({ region: 'ap-south-1' });

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

    
    if (!req.file) {
        return next(new Error("Resume file missing"));
    }
    // const { filename } = req.file!
    // const resumePath = `storage/${filename}`
    // Upload to S3
    
    console.log(req.file!)
    
    
    let resumePath;
    try {
        // 3. Use the new managed uploader from lib-storage
        const s3Params: PutObjectCommandInput = {
            Bucket: 'jobboard-rb',
            Key: `resumes/${Date.now()}-${req.file.originalname}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };
        
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: s3Params,
        });

        const uploadResult = await parallelUploads3.done();
        resumePath = uploadResult.Location; // S3 public URL

    } catch (err) {
        console.error("S3 upload failed", err);
        return next(new Error("Resume upload failed"));
    }

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