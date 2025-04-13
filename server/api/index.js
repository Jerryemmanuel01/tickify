import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import mongoose from "mongoose";
// import authRouter from "../routes/authRoutes.js";
// import taskRouter from "../routes/taskRoutes.js";
import serverless from 'serverless-http';

const app = express();
// app.use(cors());
// app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(process.env.DATABASE_URI)
//   .then(() => {
//     console.log("Database Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get('/api/hello', (req, res) => {
  res.json({ message: "If you see this, it's working!" });
});

// app.use("/api/auth", authRouter)
// app.use("/api/task", taskRouter)


export default serverless(app);
