import mongoose from "mongoose";
import PropertyModel from "../Models/PropertyModel.js"
import UserModel from "../Models/UserModel.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
// Path fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Failed to connect DB:", err);
    process.exit(1);
  }
};

const descriptions = [
  "This well-maintained property is located in a prime and peaceful neighborhood, offering excellent connectivity to schools, hospitals, shopping centers, and public transport. The layout is thoughtfully designed to maximize space, natural light, and ventilation, making it ideal for comfortable long-term living.",

  "A spacious and modern property situated in a well-developed locality. The property offers a perfect balance of comfort and convenience with nearby markets, parks, and business hubs. Built with quality materials, it ensures durability and a premium lifestyle experience.",

  "This premium property is located in a highly desirable area with excellent road connectivity and surrounding infrastructure. It is ideal for families or professionals seeking a peaceful environment while staying close to the city’s key locations.",

  "A thoughtfully planned property offering functional design and a welcoming ambiance. The location provides easy access to daily necessities, making it suitable for both residential and investment purposes.",

  "An excellent opportunity to own a property in a prime location. The space is well-ventilated, properly maintained, and surrounded by essential social and commercial amenities, ensuring a convenient lifestyle."
];

const cities = [
  { city: "Delhi", locality: "Dwarka" },
  { city: "Noida", locality: "Sector 62" },
  { city: "Gurgaon", locality: "Sector 57" },
  { city: "Bangalore", locality: "Whitefield" },
  { city: "Chandigarh", locality: "Sector 35" }
];

const residentialTypes = [
  "Apartment",
  "Independent House",
  "Villa",
  "Independent Floor",
  "Penthouse"
];

const commercialTypes = [
  "office",
  "retailshop",
  "showroom",
  "warehouse"
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedProperties = async () => {
      connectDB()
      const userId = "693d3270196f513c0ed8a88e"

  try {
   
    const properties = [];
    for (let i = 0; i < 40; i++) {
      const location = randomFrom(cities);
      const isResidential = Math.random() > 0.4;

      properties.push({
        userId: userId,
        lookingTo: Math.random() > 0.5 ? "Rent" : "Sell",
        whoYouAre: randomFrom(["owner", "dealer", "broker"]),
        status: "active",
        images: ["https://housing-images.n7net.in/4f2250e8/56042f91227d543d54cda432a8b50681/v0/medium/s_gambhir_skyline_apartment-sewak_park-delhi-s_gambhir_buildtech_private_limited.jpeg","https://images.nobroker.in/images/8a9ff88389925d5a018995c26569600a/8a9ff88389925d5a018995c26569600a_842470_805476_medium.jpg","https://bhavishyanirman.com/uploads/custom-images/property-thumb-2023-09-29-05-39-26-4150.jpg","https://dynamic.realestateindia.com/prop_images/1499993/911319_1-350x350.jpg"],
        propertydescription: randomFrom(descriptions),

        residential: isResidential
          ? {
              type: randomFrom(residentialTypes),
              address: {
                buildingName: "Green Heights",
                locality: location.locality,
                city: location.city,
              },
              bhk: randomFrom(["1BHK", "2BHK", "3+BHK"]),
              furnishType: randomFrom([
                "fullyfurnished",
                "semifurnished",
                "unfurnished",
              ]),
              flatAmenities: [
                { name: "fan", quantity: 3 },
                { name: "light", quantity: 6 },
                { name: "bed", quantity: 2 },
              ],
              societyAmenities: ["lift", "cctv", "powerbackup", "gym"],
              plotArea: Math.floor(Math.random() * 500) + 500,
              plotAreaUnit: "sq.ft",
              propertyPrice: Math.floor(Math.random() * 9000000) + 3000000,
              constructionStatus: randomFrom([
                "readytomove",
                "underconstruction",
              ]),
              advancedDetails: {
                ageOfProperty: Math.floor(Math.random() * 10),
                balcony: 2,
                bathroom: 2,
                coveredParking: 1,
                floorNumber: Math.floor(Math.random() * 10),
              },
            }
          : undefined,

        commercial: !isResidential
          ? {
              type: randomFrom(commercialTypes),
              address: {
                buildingName: "Business Park",
                locality: location.locality,
                city: location.city,
              },
              plotArea: Math.floor(Math.random() * 800) + 700,
              plotAreaUnit: "sq.ft",
              propertyPrice: Math.floor(Math.random() * 15000000) + 5000000,
              constructionStatus: randomFrom([
                "readytomove",
                "underconstruction",
              ]),
              advancedDetails: {
                ageOfProperty: Math.floor(Math.random() * 12),
                zoneType: "Commercial",
                ownership: "freehold",
                totalFloor: 10,
                yourFloor: 3,
              },

              amenities: ["powerbackup", "security", "cctv"],
            }
          : undefined,
      });
    }

    await PropertyModel.insertMany(properties);
    console.log("40 properties seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedProperties();
