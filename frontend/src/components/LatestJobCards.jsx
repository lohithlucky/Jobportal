import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-bold text-[#6A38C2] text-sm tracking-wide uppercase">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500 font-medium">{job?.location || "India"}</p>
        </div>
        <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-gray-400 group-hover:text-[#6A38C2] transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
      
      <div className="mb-6">
        <h1 className="font-extrabold text-xl text-gray-900 group-hover:text-[#6A38C2] transition-colors line-clamp-1 mb-2">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-indigo-50 text-indigo-700 border-none px-3 py-1 font-semibold" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-emerald-50 text-emerald-700 border-none px-3 py-1 font-semibold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="bg-amber-50 text-amber-700 border-none px-3 py-1 font-semibold" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
