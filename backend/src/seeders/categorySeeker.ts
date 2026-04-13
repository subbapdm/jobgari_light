import Category from "../models/Category";

const categories = [
   { name: "Information Technology" },
   { name: "Health and Care" },
   { name: "Education and Training" },
   { name: "Finance and Accounting" },
   { name: "Marketing and Sales" },
   { name: "Customer Services" }
];

export const seedCategories = async () => {
   try {
      await Category.deleteMany({});

      const categoriesWithSlugs = categories.map((cat) => ({
         ...cat,
         slug: cat.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
      }));

      await Category.insertMany(categoriesWithSlugs);
      console.log("Categories seeded successfully!");
   } catch (err) {
      console.error("Category Seeder error:", err);
      throw err;
   }
};