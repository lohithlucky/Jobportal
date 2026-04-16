import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchQuery } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dynamically compute categories from actual jobs
  const [categories, setCategories] = React.useState([
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Analyst",
    "Manager"
  ]);

  React.useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      const uniqueRoles = [...new Set(allJobs.map(job => {
        if (job.title.toLowerCase().includes("developer")) return "Developer";
        if (job.title.toLowerCase().includes("analyst")) return "Analyst";
        if (job.title.toLowerCase().includes("engineer")) return "Engineer";
        return job.title.split(" ").slice(0, 2).join(" ");
      }))].filter(r => r).slice(0, 8);
      setCategories(uniqueRoles);
    }
  }, [allJobs]);

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem
              key={index} // ✅ Added unique key
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
