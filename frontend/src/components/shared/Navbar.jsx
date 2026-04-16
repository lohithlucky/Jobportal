import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-[100] border-b border-gray-100 shadow-sm overflow-visible">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4 w-full">
        {/* Logo and Nav Links Container */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-10 w-10 bg-[#6A38C2] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
              J
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none">
              Job<span className="text-[#6A38C2]">Finder</span>
            </h1>
          </Link>
          
          <ul className="hidden md:flex font-bold items-center gap-8 text-gray-600">
            {user && user.role == "recruiter" ? (
              <>
                <li><Link to="/admin/companies" className="hover:text-[#6A38C2] transition-colors text-sm">Companies</Link></li>
                <li><Link to="/admin/jobs" className="hover:text-[#6A38C2] transition-colors text-sm">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-[#6A38C2] transition-colors text-sm">Home</Link></li>
                <li><Link to="/jobs" className="hover:text-[#6A38C2] transition-colors text-sm">Jobs</Link></li>
                <li><Link to="/browse" className="hover:text-[#6A38C2] transition-colors text-sm">Browse</Link></li>
              </>
            )}
          </ul>
        </div>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="font-bold text-gray-700 hover:text-[#6A38C2] hover:bg-indigo-50">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b2fb3] rounded-xl px-7 font-bold text-white shadow-xl shadow-indigo-100 transition-all hover:scale-105 active:scale-95">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative group cursor-pointer border-2 border-transparent hover:border-indigo-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo-100">
                  <Avatar className="h-10 w-10 overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-100 shadow-sm border border-gray-100 bg-gray-50">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                      className="object-cover h-full w-full aspect-square"
                    />
                    <AvatarFallback className="bg-indigo-100 text-[#6A38C2] font-black text-xs">
                      {user?.fullname?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-8 mt-4 bg-white border border-gray-100 shadow-2xl rounded-[2rem] animate-in fade-in slide-in-from-top-2 duration-300 z-[110]" align="end" sideOffset={10}>
                <div className="space-y-8">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-16 w-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white bg-gray-50 shrink-0">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        className="object-cover h-full w-full aspect-square"
                      />
                      <AvatarFallback className="bg-indigo-50 font-black">{user?.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-extrabold text-gray-900 leading-tight text-lg">{user?.fullname}</h4>
                      <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1.5 px-2 py-0.5 bg-indigo-50 rounded-full inline-block">
                        {user?.role} MEMBER
                      </p>
                    </div>
                  </div>
                  
                  {user?.profile?.bio && (
                    <p className="text-sm text-gray-500 font-medium bg-gray-50 p-5 rounded-3xl border border-gray-100 italic leading-relaxed">
                      "{user?.profile?.bio}"
                    </p>
                  )}
                  
                  <div className="space-y-2 pt-2 border-t border-gray-50">
                    {user && user.role == "student" && (
                      <Link 
                        to="/profile"
                        className="flex items-center gap-3 p-4 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-all font-bold group/link"
                      >
                        <User2 className="h-5 w-5 text-gray-400 group-hover/link:text-indigo-500" />
                        <span className="text-sm">Manage Profile</span>
                      </Link>
                    )}
                    <button 
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold group/logout"
                    >
                      <LogOut className="h-5 w-5 group-hover/logout:translate-x-1 transition-transform" />
                      <span className="text-sm">Sign Out Safely</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
