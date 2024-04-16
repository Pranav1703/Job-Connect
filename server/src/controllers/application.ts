import { asyncHandler } from "../utils/asyncHandler.js";

export const apply = asyncHandler(async(req,res,next)=>{
    
    console.log(req.body)

    const userId = req.body.user._id;
    const jobId = req.body.jobId;

    console.log(userId,jobId)

    console.log("file: ",req.file!)

})