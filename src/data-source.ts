import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "salman180",
  database: "ec2",
  synchronize: true, // Automatically creates tables, use only for development
  logging: true,
  entities: [User],
});
