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

app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
}));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
