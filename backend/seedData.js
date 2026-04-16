import mongoose from "mongoose";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB for seeding...");

    // 1. Find or create an admin user
    let admin = await User.findOne({ role: "recruiter" });
    if (!admin) {
      console.log("No recruiter found. Creating a 'Seed Admin' account...");
      admin = await User.create({
        fullname: "Seed Admin",
        email: "admin@seed.com",
        phoneNumber: "9999999999",
        password: "hashed_password_123", // not important for seeding
        role: "recruiter",
      });
    }

    // 2. Clear existing jobs to start fresh (Only if you want a clean slate)
    await Job.deleteMany({});
    console.log("🗑️ Cleared existing jobs...");

    // 3. Find or Create Top Companies
    const companiesData = [
      { name: "Google India", description: "World class innovation center", location: "Bangalore", website: "https://google.com", userId: admin._id },
      { name: "Microsoft", description: "Redefining the software industry", location: "Hyderabad", website: "https://microsoft.com", userId: admin._id },
      { name: "TCS", description: "Global IT solutions leader", location: "Mumbai", website: "https://tcs.com", userId: admin._id },
      { name: "Flipkart", description: "Unlocking E-commerce for India", location: "Bangalore", website: "https://flipkart.com", userId: admin._id },
      { name: "HCL Tech", description: "Digital transformation pioneers", location: "Noida", website: "https://hcl.com", userId: admin._id },
    ];

    const companies = [];
    for(const cData of companiesData) {
      let company = await Company.findOne({ name: cData.name });
      if(!company) {
        company = await Company.create(cData);
      }
      companies.push(company);
    }
    console.log(`🏢 Ensured ${companies.length} companies exist...`);

    // 4. Create Diverse Jobs
    const jobsData = [
      {
        title: "Senior SDE - Cloud Architecture",
        description: "Join our cloud team to build high-performance systems for millions of users.",
        requirements: ["React", "NodeJS", "AWS", "MongoDB"],
        salary: 45,
        experienceLevel: 5,
        location: "Bangalore",
        jobType: "Full-time",
        position: 3,
        company: companies[0]._id,
        created_by: admin._id
      },
      {
        title: "Marketing Lead",
        description: "Drive brand awareness and user growth strategies for our consumer apps.",
        requirements: ["Social Media", "SEO", "Analytics", "Communication"],
        salary: 22,
        experienceLevel: 3,
        location: "Mumbai",
        jobType: "Full-time",
        position: 1,
        company: companies[2]._id,
        created_by: admin._id
      },
      {
        title: "Data Analyst",
        description: "Extract insights from complex datasets to drive business value.",
        requirements: ["Python", "SQL", "Tableau", "Statistics"],
        salary: 15,
        experienceLevel: 1,
        location: "Hyderabad",
        jobType: "Part-time",
        position: 2,
        company: companies[1]._id,
        created_by: admin._id
      },
      {
        title: "Frontend Developer (UI/UX focus)",
        description: "Craft beautiful and responsive web experiences using modern technologies.",
        requirements: ["HTML", "CSS", "Next.js", "Framer Motion"],
        salary: 30,
        experienceLevel: 2,
        location: "Pune",
        jobType: "Remote",
        position: 5,
        company: companies[3]._id,
        created_by: admin._id
      },
      {
        title: "HR Specialist",
        description: "Scale our engineering teams and manage talent acquisition workflows.",
        requirements: ["Recruitment", "People Ops", "Strategy"],
        salary: 12,
        experienceLevel: 4,
        location: "Noida",
        jobType: "Full-time",
        position: 1,
        company: companies[4]._id,
        created_by: admin._id
      }
    ];

    await Job.insertMany(jobsData);
    console.log("✅ Successfully seeded 5 premium jobs!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedJobs();
