import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Helper with .toString() for safe comparison
  const getApplicantId = (app) => {
    if (!app) return null;
    const applicant = app.applicant || app; // handle both object and raw ID if needed
    return typeof applicant === 'object' ? applicant._id.toString() : applicant.toString();
  };

  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => getApplicantId(application) === user?._id?.toString()
  );
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for jobs");
      navigate("/login");
      return;
    }
    
    if (user.role == "recruiter") {
      toast.error("Recruiters cannot apply for positions");
      return;
    }

    if (!user.profile?.resume) {
      toast.error("Please upload your resume in your profile before applying");
      navigate("/profile");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {}, // Empty body for POST
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob?.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => getApplicantId(application) === user?._id?.toString()
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40">
          <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <svg className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Job Narrative Missing</h1>
          <p className="text-gray-400 font-medium mb-10">We couldn't retrieve the details for this specific position.</p>
          <Button onClick={() => navigate("/jobs")} className="bg-[#6A38C2] rounded-2xl px-10 h-14 font-bold uppercase tracking-widest text-xs">
            Back to All Openings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Navbar />
      <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
          <div className="p-10 md:p-16 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-indigo-50 text-[#6A38C2] border-none px-5 py-2.5 font-black uppercase text-[10px] tracking-widest" variant="outline">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="bg-emerald-50 text-emerald-700 border-none px-5 py-2.5 font-black uppercase text-[10px] tracking-widest" variant="outline">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-amber-50 text-amber-700 border-none px-5 py-2.5 font-black uppercase text-[10px] tracking-widest" variant="outline">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>
            
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
                isApplied
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-[#6A38C2] hover:bg-[#5b2fb3] text-white shadow-indigo-100 hover:scale-105 active:scale-95"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </Button>
          </div>

          <div className="p-10 md:p-16">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
              <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Essential Job Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-20">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Role</p>
                <p className="text-xl font-bold text-gray-900">{singleJob?.title}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Global Location</p>
                <p className="text-xl font-bold text-gray-900">{singleJob?.location}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Experience Range</p>
                <p className="text-xl font-bold text-gray-900">{singleJob?.experienceLevel} Years</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Financial Package</p>
                <p className="text-xl font-bold text-gray-900">{singleJob?.salary} LPA</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Interest Density</p>
                <p className="text-xl font-bold text-gray-900 underline decoration-indigo-200 underline-offset-8">{singleJob?.applications?.length} Applicants</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Launch Date</p>
                <p className="text-xl font-bold text-gray-900">{singleJob?.createdAt?.split("T")[0]}</p>
              </div>
            </div>

            <div className="mt-20">
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
                <div className="h-2 w-2 bg-[#6A38C2] rounded-full"></div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Job Narrative</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed font-medium bg-gray-50 p-10 rounded-[2rem] border border-gray-100 italic">
                "{singleJob?.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
