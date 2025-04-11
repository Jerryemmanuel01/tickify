import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/", (req, res) => {
    res.send("getting the server okay");
  });

app.listen(process.env.PORT, () => {
  console.log("listening...");
});
