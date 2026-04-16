import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // Check if the user has already applied for the job
    const existitngApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existitngApplication) {
      return res.status(400).json({
        message: "You have already applied for the job.",
        success: false,
      });
    }

    //Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // ✅ CREATE & LINK Application atomically
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Use atomic $push to ensure MongoDB registration even under load
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: newApplication._id }
    });

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.error("❌ Application Logic Error:", error);
    return res.status(500).json({
      message: "Critical error during application process.",
      success: false,
    });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin will see how many users have applied
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    //find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
