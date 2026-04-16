import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!input.companyId) {
      toast.error("Please select a company");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="flex items-center justify-center w-full py-20 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white p-12 md:p-16 shadow-sm border border-gray-100 rounded-[3rem] space-y-12 animate-in fade-in zoom-in-95 duration-500"
        >
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
              Launch a <span className="text-[#6A38C2]">Career</span>
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Fill in the details to broadcast your new opening</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="e.g. Senior Frontend Engineer"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Brief Narrative</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="What is this role about?"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Stack/Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node.js, TypeScript (comma separated)"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Salary Package (LPA)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="e.g. 15-25"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Job Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Bangalore / Remote"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Employment Format</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time / Contract"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Experience Preferred</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="e.g. 5 Years"
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Open Seats</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all font-bold"
              />
            </div>
            
            <div className="md:col-span-2 space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Publishing Organization</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="h-14 rounded-2xl border-gray-100 bg-indigo-50 focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-[#6A38C2]">
                    <SelectValue placeholder="Select one of your registered companies" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-gray-100 shadow-2xl">
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem key={company._id} value={company?._id}>
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 italic">
                  * No companies found. Please register a company first.
                </div>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-gray-50">
            {loading ? (
              <Button disabled className="w-full h-16 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs">
                <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Verifying Data...
              </Button>
            ) : (
              <Button type="submit" disabled={companies.length === 0} className="w-full h-16 rounded-2xl bg-gray-900 hover:bg-black text-white font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                Go Live Now
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
