import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    locationType:{
        type: String,
        required: true,
        enum: ["On Site","Remote"]
    },
    state:{
        type: String,
    },
    city:{
        type: String
    },
    MinSalary:{
        type: String,
        required: true
    },
    MaxSalary:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

})

export const Job = mongoose.model("Job",jobSchema)