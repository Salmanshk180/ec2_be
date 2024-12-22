import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize TypeORM
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    // Get all users
    app.get("/users", async (req, res) => {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.json(users);
    });

    // Add a new user
    app.post("/users", async (req, res) => {
      const { firstName, lastName, email, address, phoneNumber } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create({
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
      });
      const result = await userRepository.save(user);
      res.json(result);
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Error connecting to the database", error));
