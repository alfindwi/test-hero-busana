import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import router from "./src/router";

dotenv.config();
const app = express();
const server = createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
