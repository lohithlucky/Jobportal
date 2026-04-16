import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import CompaniesTable from "./CompaniesTable";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const Companies = () => {
  useGetAllCompanies();
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-500">Manage your companies and track recruitment progress.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Registered Companies</p>
            <h2 className="text-4xl font-bold text-[#6A38C2] mt-2">{companies.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Job Posts</p>
            <h2 className="text-4xl font-bold text-[#F83002] mt-2">{allAdminJobs.length}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Status</p>
            <h2 className="text-4xl font-bold text-green-500 mt-2">Live</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <Input 
                className="pl-10 rounded-xl bg-gray-50 border-none h-12 focus-visible:ring-[#6A38C2]/20" 
                placeholder="Search companies..." 
              />
            </div>
            <Button 
              onClick={() => navigate("/admin/companies/create")}
              className="bg-[#6A38C2] hover:bg-[#5b2fb3] rounded-xl h-12 px-8 font-semibold shadow-lg shadow-[#6A38C2]/20"
            >
              + Create New Company
            </Button>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
