import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Handle Salary Range Filtering
        if (searchQuery.includes("LPA")) {
            const salary = job.salary; // Assuming job.salary is a number in LPA
            if (searchQuery === "0-10 LPA") return salary >= 0 && salary <= 10;
            if (searchQuery === "10-20 LPA") return salary > 10 && salary <= 20;
            if (searchQuery === "20-40 LPA") return salary > 20 && salary <= 40;
            if (searchQuery === "40+ LPA") return salary > 40;
        }

        // Standard Keyword Filtering
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/4">
            <FilterCard />
          </div>
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-[2rem] border border-gray-100 shadow-sm border-dashed p-10">
                <div className="h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <Search size={40} className="text-[#6A38C2]" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter">No Matching Jobs</h2>
                <p className="text-gray-500 font-medium text-center max-w-sm">We couldn't find any positions matching your filters. Try broadening your search or resetting categories.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
