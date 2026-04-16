import mongoose from "mongoose";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const seedStatesJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB for state seeding...");

    // 1. Find or create an admin user
    let admin = await User.findOne({ role: "recruiter" });
    if (!admin) {
      console.log("No recruiter found. Creating a 'Seed Admin' account...");
      admin = await User.create({
        fullname: "Seed Admin",
        email: "admin@seed.com",
        phoneNumber: "9999999999",
        password: "hashed_password_123", 
        role: "recruiter",
      });
    }

    // 2. Clear existing jobs for a clean state
    await Job.deleteMany({});
    console.log("🗑️ Cleared existing jobs...");

    // 3. Define State-specific Companies
    const companiesData = [
      { name: "Andhra Tech", location: "Visakhapatnam", description: "Coastal innovations", website: "https://andhratech.com", userId: admin._id },
      { name: "Assam Tea Corp", location: "Guwahati", description: "Natural processing excellence", website: "https://assamtea.com", userId: admin._id },
      { name: "Goa Resorts", location: "Panaji", description: "Luxury hospitality tech", website: "https://goaresorts.com", userId: admin._id },
      { name: "Gujarat Metals", location: "Ahmedabad", description: "Industrial manufacturing leader", website: "https://gujmet.com", userId: admin._id },
      { name: "Kerala Ayurveda & Wellness", location: "Kochi", description: "Holistic healthcare", website: "https://keralawellness.com", userId: admin._id },
      { name: "Punjab Agricultural Systems", location: "Chandigarh", description: "Smart farming solutions", website: "https://punjabagri.com", userId: admin._id },
      { name: "Rajasthan Heritage Tours", location: "Jaipur", description: "Cultural experience platform", website: "https://heritagetours.com", userId: admin._id },
      { name: "Tamil Nadu Motors", location: "Chennai", description: "Automobile engineering", website: "https://tnmotors.com", userId: admin._id },
      { name: "West Bengal Infotech", location: "Kolkata", description: "Data services and software", website: "https://wbinfo.com", userId: admin._id },
      { name: "Delhi Global Services", location: "New Delhi", description: "Global consultancy", website: "https://delhiglobal.com", userId: admin._id },
      { name: "Ladakh Himalayan Energy", location: "Leh", description: "Renewable energy in the mountains", website: "https://lehsolar.com", userId: admin._id },
      { name: "Odisha Mining Co", location: "Bhubaneswar", description: "Resource extraction management", website: "https://odmining.com", userId: admin._id },
      { name: "Bihar Skill Hub", location: "Patna", description: "Educational training and development", website: "https://biharskill.com", userId: admin._id },
      { name: "Madhya Pradesh Agro", location: "Indore", description: "Agricultural supply chain", website: "https://mpagro.com", userId: admin._id },
      { name: "Sikkim Organic", location: "Gangtok", description: "Organic farming tech", website: "https://sikkimorg.com", userId: admin._id },
    ];

    const companies = [];
    for(const cData of companiesData) {
      let company = await Company.findOne({ name: cData.name });
      if(!company) {
        company = await Company.create(cData);
      }
      companies.push(company);
    }

    // 4. Jobs for every major state/UT
    const jobsData = [
      { title: "SDE - Cloud Infrastructure", description: "Lead cloud transitions", requirements: ["AWS", "Terraform"], salary: 40, experienceLevel: 4, location: "Bangalore, Karnataka", jobType: "Full-time", position: 2, company: companies[0]._id, created_by: admin._id },
      { title: "Junior Data Analyst", description: "Analyze coastal data", requirements: ["SQL", "Excel"], salary: 8, experienceLevel: 1, location: "Visakhapatnam, Andhra Pradesh", jobType: "Full-time", position: 1, company: companies[0]._id, created_by: admin._id },
      { title: "Supply Chain Manager", description: "Optimize tea export", requirements: ["Logistics", "SAP"], salary: 15, experienceLevel: 5, location: "Guwahati, Assam", jobType: "Full-time", position: 1, company: companies[1]._id, created_by: admin._id },
      { title: "Hospitality Manager", description: "Manage resort tech solutions", requirements: ["Communication", "Tech-savvy"], salary: 12, experienceLevel: 3, location: "Panaji, Goa", jobType: "Full-time", position: 1, company: companies[2]._id, created_by: admin._id },
      { title: "Plant Engineer", description: "Ensure industrial uptime", requirements: ["Mechanical Eng", "Safety"], salary: 18, experienceLevel: 4, location: "Ahmedabad, Gujarat", jobType: "Full-time", position: 2, company: companies[3]._id, created_by: admin._id },
      { title: "Ayurvedic Practitioner", description: "Provide holistic care", requirements: ["Ayurveda Degree"], salary: 20, experienceLevel: 5, location: "Kochi, Kerala", jobType: "Full-time", position: 3, company: companies[4]._id, created_by: admin._id },
      { title: "IoT Farming Specialist", description: "Deploy smart sensors", requirements: ["IoT", "Python"], salary: 25, experienceLevel: 3, location: "Chandigarh, Punjab", jobType: "Remote", position: 1, company: companies[5]._id, created_by: admin._id },
      { title: "Tourism Strategist", description: "Design cultural routes", requirements: ["History", "Marketing"], salary: 10, experienceLevel: 2, location: "Jaipur, Rajasthan", jobType: "Full-time", position: 2, company: companies[6]._id, created_by: admin._id },
      { title: "Automobile Designer", description: "Design next-gen EVs", requirements: ["SolidWorks", "UI/UX"], salary: 35, experienceLevel: 6, location: "Chennai, Tamil Nadu", jobType: "Full-time", position: 2, company: companies[7]._id, created_by: admin._id },
      { title: "FullStack Developer", description: "Build scalable web apps", requirements: ["Node.js", "React"], salary: 28, experienceLevel: 3, location: "Hyderabad, Telangana", jobType: "Full-time", position: 4, company: companies[0]._id, created_by: admin._id },
      { title: "Marketing Specialist", description: "Drive digital growth", requirements: ["SEO", "AdWords"], salary: 14, experienceLevel: 2, location: "Kolkata, West Bengal", jobType: "Full-time", position: 1, company: companies[8]._id, created_by: admin._id },
      { title: "Senior Consultant", description: "Strategic global planning", requirements: ["MBA", "Management"], salary: 50, experienceLevel: 8, location: "New Delhi, Delhi", jobType: "Full-time", position: 1, company: companies[9]._id, created_by: admin._id },
      { title: "Solar Engineer", description: "Renewable energy deployment", requirements: ["Solar Panels", "Electrical Eng"], salary: 12, experienceLevel: 2, location: "Leh, Ladakh", jobType: "Contract", position: 1, company: companies[10]._id, created_by: admin._id },
      { title: "Mining Surveyor", description: "Terrain mapping and safety", requirements: ["GIS", "Surveying"], salary: 16, experienceLevel: 4, location: "Bhubaneswar, Odisha", jobType: "Full-time", position: 1, company: companies[11]._id, created_by: admin._id },
      { title: "Skill Trainer", description: "Empower youth with tech skills", requirements: ["Teaching", "Coding"], salary: 7, experienceLevel: 1, location: "Patna, Bihar", jobType: "Part-time", position: 5, company: companies[12]._id, created_by: admin._id },
      { title: "Cold Chain Logistics", description: "Maintain supply chain for perishables", requirements: ["Cold Chain", "Operations"], salary: 11, experienceLevel: 3, location: "Indore, Madhya Pradesh", jobType: "Full-time", position: 2, company: companies[13]._id, created_by: admin._id },
      { title: "Content Writer", description: "Craft narratives for tours", requirements: ["English", "Creative Writing"], salary: 6, experienceLevel: 1, location: "Lucknow, Uttar Pradesh", jobType: "Remote", position: 2, company: companies[6]._id, created_by: admin._id },
      { title: "Organic Farm Lead", description: "Manage sustainable farm plots", requirements: ["Agri Science", "Sustainability"], salary: 9, experienceLevel: 4, location: "Gangtok, Sikkim", jobType: "Full-time", position: 1, company: companies[14]._id, created_by: admin._id },
      { title: "SDE - Logistics Tech", description: "Build real-time tracking systems", requirements: ["Golang", "Kafka"], salary: 30, experienceLevel: 3, location: "Gurugram, Haryana", jobType: "Full-time", position: 3, company: companies[3]._id, created_by: admin._id },
      { title: "Mountain Guide Manager", description: "Oversee trekking operations", requirements: ["Mountaineering Cert", "First Aid"], salary: 15, experienceLevel: 5, location: "Shimla, Himachal Pradesh", jobType: "Contract", position: 2, company: companies[2]._id, created_by: admin._id },
      { title: "Steel Mill Supervisor", description: "Optimize production efficiency", requirements: ["Metallurgy", "Management"], salary: 22, experienceLevel: 6, location: "Ranchi, Jharkhand", jobType: "Full-time", position: 1, company: companies[11]._id, created_by: admin._id },
      { title: "Eco-Resource Manager", description: "Protect local flora/fauna data", requirements: ["Environmental Sci", "Data Analysis"], salary: 13, experienceLevel: 3, location: "Dehradun, Uttarakhand", jobType: "Full-time", position: 1, company: companies[14]._id, created_by: admin._id },
      { title: "Financial Analyst", description: "Corporate wealth management", requirements: ["CFA", "Excel"], salary: 26, experienceLevel: 4, location: "Mumbai, Maharashtra", jobType: "Full-time", position: 1, company: companies[9]._id, created_by: admin._id },
      { title: "Backend Developer", description: "Microservices for retail", requirements: ["Java", "Spring Boot"], salary: 32, experienceLevel: 3, location: "Pune, Maharashtra", jobType: "Remote", position: 2, company: companies[0]._id, created_by: admin._id },
      { title: "App Developer", description: "Build mobile education apps", requirements: ["Flutter", "Firebase"], salary: 18, experienceLevel: 2, location: "Noida, Uttar Pradesh", jobType: "Full-time", position: 3, company: companies[12]._id, created_by: admin._id },
      { title: "Network Administrator", description: "Manage regional network ops", requirements: ["CCNA", "Security"], salary: 14, experienceLevel: 3, location: "Jammu, J&K", jobType: "Full-time", position: 1, company: companies[9]._id, created_by: admin._id },
      { title: "Agro-Scientist", description: "Research high-yield crops", requirements: ["Biology", "Agri PhD"], salary: 28, experienceLevel: 7, location: "Thiruvananthapuram, Kerala", jobType: "Full-time", position: 1, company: companies[13]._id, created_by: admin._id },
    ];

    await Job.insertMany(jobsData);
    console.log(`✅ Successfully seeded ${jobsData.length} premium jobs across various states!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ State Seeding Error:", error);
    process.exit(1);
  }
};

seedStatesJobs();
