import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true

  },
  coverLetter: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gitHub: {
    type: String,
    required: true
  },
  resumePath: {
    type: String,
    required: true
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  jobID:{
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required:true
  }
});

export const Application = mongoose.model("Application", applicationSchema);
