import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./router/AuthRoute.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());

const allowedOrigins = [
  "https://authentication-app-70.vercel.app", // deployed frontend
  "http://localhost:5173" // local dev
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser tools like Postman
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you’re sending cookies
}));

// Routes
app.use("/api/auth", AuthRoute); // ❌ use "/" not "./"

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ DB connected");
  })
  .catch((err) => {
    console.error("❌ DB not connected", err.message);
  });

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
