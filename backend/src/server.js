import dotenv from "dotenv";

import app from "./app.js";

import connectMongoDB from "./config/mongodb.js";

import prisma from "./config/prisma.js";


// Load environment variables

dotenv.config();



const PORT = process.env.PORT || 3000;



const startServer = async () => {
  try {


    // Test PostgreSQL connection using Prisma

    await prisma.$connect();

    console.log("✅ PostgreSQL Connected Successfully");



    // Connect MongoDB

    await connectMongoDB();



    // Start Express Server

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });



  } catch (error) {

    console.error(
      "❌ Server startup failed:",
      error.message
    );


    process.exit(1);

  }
};



startServer();