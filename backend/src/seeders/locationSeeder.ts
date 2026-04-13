import Location from "../models/Location";

const locations = [
   { state: "California", city: "San Francisco" },
   { state: "New York", city: "New York City" },
   { state: "Texas", city: "Austin" },
   { state: "Washington", city: "Seattle" },
   { state: "Florida", city: "Miami" },
   { state: "Illinois", city: "Chicago" },
];

export const seedLocations = async () => {
   try {
      await Location.deleteMany({});

      await Location.insertMany(locations);
      console.log("Locations seeded successfully!");
   } catch (err) {
      console.error("Location Seeder error:", err);
      throw err;
   }
};
