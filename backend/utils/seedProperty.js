import mongoose from "mongoose";
import dotenv from "dotenv";
import PropertyModel from "../Models/PropertyModel.js";
import path from "path";
import { fileURLToPath } from "url";

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


const seedProperties = async () => {
    await connectDB()
    const userId = "69035e4c998cb2269637ed39"
  try {
    const residentialProperties = [
      {
        userId:userId,
        whoYouAre: "owner",
        lookingTo: "Rent",
        propertydescription:
          "A 2BHK semi-furnished flat in Sector 45 Chandigarh, great location for families.",
        residential: {
          type: "Apartment",
          address: {
            buildingName: "Green Valley Heights",
            locality: "Sector 45",
            city: "Chandigarh",
          },
          bhk: "2BHK",
          furnishType: "semifurnished",
          flatAmenities: [
            { name: "sofa", quantity: 1 },
            { name: "bed", quantity: 2 },
            { name: "fan", quantity: 4 },
          ],
          societyAmenities: ["Lift", "CCTV", "WaterSupply"],
          plotArea: 1200,
          plotAreaUnit: "sq.ft.",
          propertyPrice: 23000,
          constructionStatus: "readytomove",
          advancedDetails: {
            ageOfProperty: 3,
            balcony: 2,
            bathroom: 2,
            coveredParking: 1,
            floorNumber: 3,
          },
        },
        images: [
          "https://www.rentvala.in/wp-content/uploads/2023/02/1D-1170x720.jpg",
          "https://5.imimg.com/data5/AR/BB/MY-40585855/2bhk-flate-in-zirakpur-500x500.jpg",
        ],
      },
      {
        userId: userId,
        whoYouAre: "owner",
        lookingTo: "Sell",
        propertydescription:
          "3BHK fully furnished villa available in Zirakpur, Chandigarh outskirts.",
        residential: {
          type: "Villa",
          address: {
            buildingName: "Palm Residency",
            locality: "Zirakpur",
            city: "Chandigarh",
          },
          bhk: "3+BHK",
          furnishType: "fullyfurnished",
          flatAmenities: [
            { name: "ac", quantity: 3 },
            { name: "bed", quantity: 3 },
            { name: "tv", quantity: 2 },
          ],
          societyAmenities: ["Gym", "Powerbackup", "Clubhouse"],
          plotArea: 2500,
          plotAreaUnit: "sq.ft.",
          propertyPrice: 8500000,
          constructionStatus: "readytomove",
          advancedDetails: {
            ageOfProperty: 2,
            balcony: 2,
            bathroom: 3,
            coveredParking: 2,
            floorNumber: 1,
          },
        },
        images: [
             "https://www.rentvala.in/wp-content/uploads/2023/02/1D-1170x720.jpg",
          "https://5.imimg.com/data5/AR/BB/MY-40585855/2bhk-flate-in-zirakpur-500x500.jpg",
        ],
      },
    ];

    const commercialProperties = [
      {
        userId:userId,
        whoYouAre: "owner",
        lookingTo: "Rent",
        propertydescription:
          "Office space for rent in Elante Tower, perfect for startups.",
        commercial: {
          type: "office",
          address: {
            buildingName: "Elante Tower",
            locality: "Industrial Area Phase 1",
            propertyName: "Elante Business Tower",
            city: "Chandigarh",
          },
          builtUpArea: 850,
          areaUnit: "sq.ft.",
          propertyPrice: 55000,
          constructionStatus: "readytomove",
          advancedDetails: {
            ageOfProperty: 5,
            zoneType: "Commercial",
            totalFloor: 10,
            yourFloor: 4,
          },
          amenities: ["powerbackup", "internetconnectivity", "cctv"],
        },
        images: [
               "https://www.rentvala.in/wp-content/uploads/2023/02/1D-1170x720.jpg",
          "https://5.imimg.com/data5/AR/BB/MY-40585855/2bhk-flate-in-zirakpur-500x500.jpg",
        ]
      },
      {
        userId: userId,
        whoYouAre: "owner",
        lookingTo: "Sell",
        propertydescription:
          "Showroom available for sale on Madhya Marg, prime location with heavy footfall.",
        commercial: {
          type: "showroom",
          address: {
            buildingName: "Tricity Plaza",
            locality: "Madhya Marg",
            propertyName: "Tricity Showroom Block",
            city: "Chandigarh",
          },
          plotArea: 1500,
          plotAreaUnit: "sq.ft.",
          propertyPrice: 30000000,
          constructionStatus: "readytomove",
          advancedDetails: {
            ageOfProperty: 8,
            zoneType: "Commercial",
            ownership: "freehold",
          },
          amenities: ["powerbackup", "security", "cctv"],
        },
        images: [   "https://www.rentvala.in/wp-content/uploads/2023/02/1D-1170x720.jpg",
          "https://5.imimg.com/data5/AR/BB/MY-40585855/2bhk-flate-in-zirakpur-500x500.jpg",],
      },
      {
        userId: userId,
        whoYouAre: "owner",
        lookingTo: "Rent",
        propertydescription:
          "Warehouse for rent near Zirakpur highway with large storage area.",
        commercial: {
          type: "warehouse",
          address: {
            buildingName: "Zirakpur Storage Hub",
            locality: "Zirakpur Highway",
            propertyName: "Storage Zone 12",
            city: "Chandigarh",
          },
          plotArea: 8000,
          plotAreaUnit: "sq.ft.",
          propertyPrice: 90000,
          constructionStatus: "readytomove",
          advancedDetails: {
            ageOfProperty: 4,
            zoneType: "Industrial",
          },
          amenities: ["waterstorage", "powerbackup", "security"],
        },
        images: ["https://www.rentvala.in/wp-content/uploads/2023/02/1D-1170x720.jpg",
          "https://5.imimg.com/data5/AR/BB/MY-40585855/2bhk-flate-in-zirakpur-500x500.jpg"]
      },
    ];

    const allProps = [...residentialProperties, ...commercialProperties];

    await PropertyModel.insertMany(allProps);
    console.log(` Successfully seeded ${allProps.length} properties`);

    process.exit(0);
  } catch (error) {
    console.log(" Seeding failed:", error);
    process.exit(1);
  }
};

seedProperties();
