// import initializeDatabase from "./db/db.js"; // Renamed import to avoid conflicts
import dotenv from "dotenv";
import { app } from "./app.js";
import sequelize from "./db/index.js"; // Correct Sequelize import

// Configuration setup
dotenv.config({
  path: "./.env",
});

// Method to start the server
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Authenticate Sequelize
    console.log("Database connected!");

    await sequelize.sync(); // Sync models to the database
    console.log("Models synchronized!");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Call the function to start the server
startServer();

app.get("/", function (req, res) {
  res.send("Hello World");
});
