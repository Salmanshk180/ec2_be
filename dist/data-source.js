"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "salman180",
    database: "ec2",
    synchronize: true, // Automatically creates tables, use only for development
    logging: true,
    entities: [User_1.User],
});
