import mongoose from "mongoose";
import dns from "dns";

// Force Google DNS to resolve MongoDB Atlas SRV records reliably
// (Some ISPs block SRV lookups — this ensures consistent resolution locally and on AWS)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB Atlas...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,  // 10 seconds timeout
      socketTimeoutMS: 45000,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(`   Error: ${error.message}`);
    if (error.message.includes("bad auth") || error.message.includes("Authentication")) {
      console.error("   → Check your username/password in MONGO_URI (.env)");
    } else if (error.message.includes("ENOTFOUND") || error.message.includes("ETIMEDOUT") || error.message.includes("ECONNREFUSED")) {
      console.error("   → Network error. Check MongoDB Atlas IP Whitelist (add 0.0.0.0/0)");
      console.error("   → Also check if your firewall/ISP blocks outbound port 27017");
    }
    process.exit(1);
  }
};
export default connectDB;
