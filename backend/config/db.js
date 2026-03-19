const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Pick MONGODB_URI first, fallback to MONGO_URI
    let mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "❌ MongoDB URI is not defined in environment variables (MONGODB_URI or MONGO_URI)."
      );
    }

    // Remove surrounding quotes and whitespace (handles Render secrets)
    mongoUri = mongoUri.replace(/^["']|["']$/g, '').trim();

    // ✅ Mask password ONLY for logging
    const safeUri = mongoUri.replace(/:(.*?)@/, ":****@");
    console.log("Using MongoDB URI:", safeUri);

    // ✅ Connect using the real URI
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`🧠 Connected DB name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
