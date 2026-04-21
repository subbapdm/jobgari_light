import Company from "../models/Company";
import User from "../models/User";

export const seedCompanies = async () => {
   try {
      await Company.deleteMany({});

      const employer = await User.findOne({ role: "employer" }) || await User.findOne();

      const companiesWithRefs = [
         { user: employer?._id, name: "Laratech Solutions" },
         { user: employer?._id, name: "Google Inc." },
         { user: employer?._id, name: "Meta" },
         { user: employer?._id, name: "Naukri" },
         { user: employer?._id, name: "Internshala" }
      ]

      await Company.insertMany(companiesWithRefs);
      
      console.log("Companies seeded successfully!");
   } catch (err) {
      console.error("Company Seeder error:", err);
      throw err;
   }
};
