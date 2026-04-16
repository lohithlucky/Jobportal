import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center relative overflow-hidden py-24 px-4 bg-white">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="mx-auto px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#6A38C2] text-xs font-bold uppercase tracking-widest">
          The Future of Recruitment is Here
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Find your next <br /> 
          <span className="text-[#6A38C2]">Career Milestone</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Connecting ambitious professionals with the world's most innovative companies. Your transformation starts today.
        </p>
        
        <div className="relative w-full md:w-[75%] mx-auto mt-10">
          <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl shadow-indigo-100 border border-gray-100 p-2 rounded-2xl md:rounded-full transition-all focus-within:ring-4 focus-within:ring-indigo-50">
            <div className="flex items-center w-full px-6 py-3 md:py-0 relative">
              <Search className="text-gray-400 h-5 w-5 shrink-0" />
              <input
                type="text"
                value={query}
                placeholder="Job titles, companies, or locations..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && searchJobHandler()}
                className="outline-none border-none w-full px-4 text-gray-700 bg-transparent placeholder:text-gray-400 font-medium h-12"
              />
            </div>
            <button
              onClick={searchJobHandler}
              className="w-full md:w-auto bg-[#6A38C2] hover:bg-[#5b2fb3] text-white px-10 py-4 rounded-xl md:rounded-full transition-all font-bold tracking-tight active:scale-95 shadow-lg shadow-indigo-200"
            >
              Search Jobs
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {['Bangalore', 'Remote', 'Full-stack', 'Product Designer'].map((tag) => (
            <span key={tag} className="text-xs font-bold text-gray-400 hover:text-[#6A38C2] cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
