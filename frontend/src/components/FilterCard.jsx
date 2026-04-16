import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Dynamically extract unique locations and clean role names from existing jobs
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      // 1. Unique Locations (simplified to major city if formatted "City, State")
      const locations = [...new Set(allJobs.map(job => job.location.split(",")[0].trim()))].sort();
      
      // 2. Roles: Extract common keywords or full titles if meaningful
      const roles = [...new Set(allJobs.map(job => {
        // Just take the first two words if title is long, or common ones like "Developer", "Analyst"
        const title = job.title;
        if (title.toLowerCase().includes("developer")) return "Developer";
        if (title.toLowerCase().includes("analyst")) return "Analyst";
        if (title.toLowerCase().includes("engineer")) return "Engineer";
        if (title.toLowerCase().includes("manager")) return "Manager";
        return title.split(" ").slice(0, 2).join(" ");
      }))].filter(r => r).slice(0, 8).sort();

      setFilterData([
        {
          filterType: "Location",
          array: locations.slice(0, 10), // Limit to top 10 for UI
        },
        {
          filterType: "Profile",
          array: roles,
        },
        {
          filterType: "Salary Range",
          array: ["0-10 LPA", "10-20 LPA", "20-40 LPA", "40+ LPA"],
        },
      ]);
    } else {
        // Fallback for empty state or before first load
        setFilterData([
            { filterType: "Location", array: ["Bangalore", "Hyderabad", "Remote"] },
            { filterType: "Profile", array: ["Developer", "Analyst", "Manager"] },
            { filterType: "Salary Range", array: ["0-10 LPA", "10-20 LPA", "20-40 LPA", "40+ LPA"] },
        ]);
    }
  }, [allJobs]);

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-extrabold text-2xl text-gray-900 leading-none">Filters</h1>
        <button 
          onClick={() => setSelectedValue("")}
          className="text-xs font-bold uppercase tracking-widest text-[#6A38C2] hover:opacity-70 transition-opacity"
        >
          Reset
        </button>
      </div>
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-12">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-6">
            <h1 className="font-bold text-xs text-gray-400 uppercase tracking-widest bg-gray-50/50 p-2 rounded-lg inline-block">
                {data.filterType}
            </h1>
            <div className="space-y-4">
              {data.array.map((item, subIndex) => {
                const id = `${data.filterType}-${item}`;
                return (
                  <div
                    key={subIndex}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <RadioGroupItem
                      value={item}
                      id={id}
                      className="h-5 w-5 border-2 border-gray-200 text-[#6A38C2] focus:ring-[#6A38C2]"
                    />
                    <Label 
                      htmlFor={id}
                      className="text-[15px] font-semibold text-gray-500 group-hover:text-gray-900 cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
