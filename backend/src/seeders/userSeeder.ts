import User from "../models/User";
import bcrypt from "bcryptjs";


const users = [
   {
      name: "Super Admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      role: "admin",
      isVerified: true
   },
   {
      name: "Padam Employer",
      email: "employer@gmail.com",
      password: "Employer@123",
      role: "employer",
      isVerified: true
   },
   {
      name: "Padam Jobseeker",
      email: "jobseeker@gmail.com",
      password: "Jobseeker@123",
      role: "jobseeker",
      isVerified: true
   }
];

export const seedUsers = async () => {
   try {
      await User.deleteMany({});

      const hashedUsers = await Promise.all(
         users.map(async(user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10)
         }))
      );

      await User.insertMany(hashedUsers);
      console.log("Users seeded successfully!");
   } catch (err) {
      console.error("Seeder error:", err);
      throw err;
   }
};