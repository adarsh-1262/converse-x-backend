import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

//Allow specific origins
const corsOptions = {
  origin:'https://conversex.netlify.app',
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
