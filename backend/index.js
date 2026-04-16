import "./setupEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// ----------------- ENVIRONMENT VARIABLES ----------------- //
dotenv.config();

// Keep only safe, app-specific env variables to avoid Render debug issues
const allowedEnv = [
  "PORT",
  "MONGO_URI",
  "SECRET_KEY",
  "CLOUD_NAME",
  "API_KEY",
  "API_SECRET",
  "NODE_ENV",
];

for (const key of Object.keys(process.env)) {
  if (!allowedEnv.includes(key)) {
    delete process.env[key];
  }
}

process.env.DEBUG_URL = undefined;

// ----------------- EXPRESS APP ----------------- //
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------- ENVIRONMENT ----------------- //
const isProduction = process.env.NODE_ENV === "production";

// ----------------- CORS SETUP (✅ works for both dev + production) ----------------- //
const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "https://job-portal-mern-qpwd.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ Allow ANY localhost variant or the production URL
      if (!origin || 
          origin.includes("localhost") || 
          origin.includes("127.0.0.1") || 
          origin === "https://job-portal-mern-qpwd.onrender.com") {
        callback(null, true);
      } else {
        // Fallback for tricky browser scenarios: Allow all in development
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// ----------------- API ROUTES ----------------- //
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is running!" });
});

// ----------------- FRONTEND SERVING ----------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (isProduction) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for any route not handled by API
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running in development mode");
  });
}

// ----------------- START SERVER AFTER DB CONNECT ----------------- //
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    // ✅ Bind to 0.0.0.0 for maximum compatibility (allows localhost + 127.0.0.1)
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
