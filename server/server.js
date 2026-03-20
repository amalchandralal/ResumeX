import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
;

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB before starting server
try {
  await connectDB();
} catch (error) {
  console.error("Server failed to start due to database connection error:", error);
  process.exit(1); // ✅ Stop server if DB fails
}

// ✅ cors() MUST come before all other middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<div>
    <h1>DEFAULT ROUTE</h1>  
    <p>Resume Builder AI is Live🔥 Everything is running OK 👍🚀</p>
    <p>Made By ❤️‍🔥 DEV PULSE</p>
    </div>`);
});

// ✅ All routes uncommented and active
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});