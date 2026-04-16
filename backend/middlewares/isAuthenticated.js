import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ✅ Use fallback to match login controller even if DOTENV fails
const SECRET_KEY = process.env.SECRET_KEY || "job_portal_secret_key_12345";

const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers?.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    // console.log("🔍 Cookies Received:", req.cookies);
    // console.log("🔍 Token Extracted:", token ? "YES (hidden)" : "NO");

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
        success: false,
      });
    }

    // ✅ Verify token using the same Secret Key
    const decoded = jwt.verify(token, SECRET_KEY);

    // ✅ Attach user ID (and maybe role/email if needed later)
    req.id = decoded.userId;
    // req.role = decoded.role; // optional if you ever store it in token

    next();
  } catch (error) {
    console.error("❌ JWT Authentication Error:", error.message);

    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Invalid or expired authentication token",
      success: false,
    });
  }
};

export default isAuthenticated;
