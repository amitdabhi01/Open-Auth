import express from "express";
import ConnectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res, next) => {
  next(new HttpError("requested routes not found"));
});

app.use((error, req, res, next) => {
  if (req.headerSent) {
    next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "Internal Server Error" });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await ConnectDB();

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

export default app;
