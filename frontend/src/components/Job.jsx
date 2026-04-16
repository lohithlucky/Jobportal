import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  //const jobId = "sdfghjkmnbvcxsrh";
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-8 rounded-3xl shadow-sm bg-white border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[10px] font-black text-[#6A38C2] bg-indigo-50 px-4 py-1.5 rounded-lg uppercase tracking-[0.2em]">
          {daysAgoFunction(job?.createdAt) == 0
            ? "New Listing"
            : `${daysAgoFunction(job?.createdAt)}d ago`}
        </span>
        <button className="text-gray-300 hover:text-[#6A38C2] transition-colors">
          <Bookmark className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-5 mb-8">
        <div className="h-16 w-16 rounded-2xl border border-gray-50 flex items-center justify-center p-3 bg-gray-50 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
          <Avatar className="h-full w-full">
            <AvatarImage src={job?.company?.logo} className="object-contain" />
          </Avatar>
        </div>
        <div>
          <h2 className="font-extrabold text-gray-900 leading-tight tracking-tight text-lg">{job?.company?.name}</h2>
          <p className="text-sm text-gray-400 font-bold flex items-center gap-1.5 mt-1">
            <svg className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {job?.location || "India"}
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h1 className="font-black text-2xl text-gray-900 mb-3 group-hover:text-[#6A38C2] transition-colors leading-tight">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-semibold">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        <Badge className="bg-indigo-50 text-[#6A38C2] border-none px-4 py-2 font-black uppercase text-[10px] tracking-widest shadow-sm shadow-indigo-100" variant="outline">
          {job?.position} Openings
        </Badge>
        <Badge className="bg-emerald-50 text-emerald-700 border-none px-4 py-2 font-black uppercase text-[10px] tracking-widest shadow-sm shadow-emerald-100" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-amber-50 text-amber-700 border-none px-4 py-2 font-black uppercase text-[10px] tracking-widest shadow-sm shadow-amber-100" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 rounded-2xl bg-gray-50 text-gray-900 border-transparent hover:bg-gray-100 transition-all font-bold tracking-tight uppercase text-xs h-12"
        >
          Details
        </Button>
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 rounded-2xl bg-[#6A38C2] hover:bg-[#5b2fb3] text-white font-bold transition-all shadow-xl shadow-indigo-100 uppercase text-xs tracking-tight h-12"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Job;
