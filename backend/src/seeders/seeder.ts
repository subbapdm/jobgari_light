import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/connectDB";

import { seedUsers } from "./userSeeder";
import { seedCategories } from "./categorySeeker";
import { seedLocations } from "./locationSeeder";

const runSeeders = async () => {
   try {
      await connectDB();

      // Run all seeders
      await seedUsers();
      await seedCategories();
      await seedLocations();

      console.log("All data seeded successfully!");

      process.exit(0);
   } catch (err) {
      console.error("Master Seeder failed:", err);
      process.exit(1);
   }
};

runSeeders();