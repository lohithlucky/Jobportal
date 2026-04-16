import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  useGetAllJobs();

  const { allJobs = [] } = useSelector((store) => store.job || {});

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          <span className="text-[#6A38C2]">Top & Latest</span> Opportunities
        </h1>
        <p className="mt-4 text-gray-600 text-lg">Browse curated positions from industry leaders across India.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs.length <= 0 ? (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <span className="text-gray-400 font-medium text-lg italic">No jobs available right now. Check back soon!</span>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
