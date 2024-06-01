import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/jobs.js";

export const postjob = asyncHandler(async(req,res,next)=>{
    const { role }= req.body.user
    console.log(role)
    const {
        jobTitle,
        companyName,
        locType,
        state,
        city,
        MinSalary,
        MaxSalary,
        description
    } = req.body

    if (!jobTitle || !companyName || !description || !locType || !MinSalary || !MaxSalary){
        res.json({
            err: "Please provide full job details."
        })
        return next(new Error("Please provide full job details."));
    }

    const postedBy = req.body.user._id

    const job = await Job.create({
        title:jobTitle,
        companyName: companyName,
        locationType:locType,
        state:state,
        city:city,
        MinSalary:MinSalary,
        MaxSalary:MaxSalary,
        description:description,
        postedBy: postedBy
    })

    res.json({
        msg: "Job posted successfully"
    })

})

export const getAllJobs = asyncHandler(async(req,res,next)=>{
    try {
        const jobs = await Job.find({ expired: false }).populate("postedBy","username");
        res.json({
          jobs,
        });
    } catch (error) {
        console.log("fetching error----------------------------",error)
    }
})

export const getJobById = asyncHandler(async(req,res,next)=>{
    const { id } = req.params
    const job = await Job.findById({_id:id}).populate("postedBy","username");

    if(!job){
        res.json({
            msg:"job id doesnt exists"
        })
        return next(new Error("job id doesnt exist"))
    }
    
    res.json({
        job
    })
})

export const updateJob = asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const { role } = req.body.user;
    if(role==="Job Seeker"){
        return next(new Error("unauthorized"))
    }

    const {
        title,
        companyName,
        locationType,
        state,
        city,
        MinSalary,
        MaxSalary,
        description,
        expired
    } = req.body

    let job = await Job.findById(id);
    if(!job){
        return next(new Error("job not found"))
    }
    job = await Job.findByIdAndUpdate(id,{ 
        title,
        companyName,
        locationType,
        state,
        city,
        MinSalary,
        MaxSalary,
        description,
        expired
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

    res.json({
        msg:"update success"
    })
})

export const getMyJobs = asyncHandler(async (req,res,next) => {
    const { role , id } = req.body.user;

    if (role === "Job Seeker") {
      return next(
        new Error("Job Seeker not allowed to access this resource.")
      );
    }
    const myJobs = await Job.find({ postedBy: id });
    res.status(200).json({
      myJobs,
    });
});

export const deleteJob = asyncHandler(async(req,res,next)=>{
    const { role } = req.body.user;
    if (role === "Job Seeker") {
      return next(
        new Error("Job Seeker not allowed to access this resource.")
      );
    }
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new Error("Job not found."));
    }
    await job.deleteOne();
    res.status(200).json({
      msg: "Job Deleted!",
    });
})