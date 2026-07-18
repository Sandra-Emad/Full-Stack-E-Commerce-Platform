import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;


const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "ecommerce_db",
  user: "postgres",
  password: "_Y58uevTFs9FN2w",
});


const adapter = new PrismaPg(pool);


const prisma = new PrismaClient({
  adapter,
});


export default prisma;