"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const User_1 = require("./entities/User");
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Initialize TypeORM
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected successfully");
    // Get all users
    app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const users = yield userRepository.find();
        res.json(users);
    }));
    // Add a new user
    app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, address, phoneNumber } = req.body;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = userRepository.create({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
        });
        const result = yield userRepository.save(user);
        res.json(result);
    }));
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
    .catch((error) => console.log("Error connecting to the database", error));
