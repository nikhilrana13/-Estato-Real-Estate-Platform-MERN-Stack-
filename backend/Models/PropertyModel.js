import mongoose from "mongoose";


const AddressSchema = new mongoose.Schema({
  buildingName: { type: String, default: "" },
  locality: { type: String, required: true },
  city: { type: String, required: true },
});
const AdvancedDetailsSchema = new mongoose.Schema({
  ageOfProperty: { type: Number },
  balcony: { type: Number, min: 0, max: 5 },
  bathroom: { type: Number, min: 0, max: 5 },
  coveredParking: { type: Number, min: 0, max: 5 },
  floorNumber: { type: Number },
});

const ResidentialSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "Apartment",
      "Independent House",
      "Duplex",
      "Independent Floor",
      "Villa",
      "Penthouse",
      "Studio",
      "Plot",
      "Farmhouse",
      "Agricultural Land",
    ],
    required: true,
    default: "Apartment",
  },
  address: AddressSchema,
  bhk: { type: String, enum: ["1RK", "1BHK", "1.5BHK", "2BHK", "3+BHK"] },
  furnishType: { type: String, enum: ["fullyfurnished", "semifurnished", "unfurnished"] },
  flatAmenities: [
    {
      name: {
        type: String,
        enum: [
          "diningtable",
          "washingmachine",
          "cupboard",
          "sofa",
          "microwave",
          "stove",
          "fridge",
          "waterpurifier",
          "gaspipeline",
          "chimney",
          "modularkitchen",
          "fan",
          "light",
          "ac",
          "tv",
          "bed",
          "geyser",
        ],
      },
      quantity: { type: Number, default: 0 },
    },
  ],
  societyAmenities: [
    {
      type: String,
      enum: [
        "powerbackup",
        "swimmingpool",
        "gym",
        "lift",
        "intercom",
        "garden",
        "sports",
        "kidsArea",
        "cctv",
        "clubhouse",
        "gatedcommunity",
        "communityhall",
        "watersupply",
      ],
    },
  ],
  plotArea: { type: Number },
  plotAreaUnit: { type: String, enum: ["sq.ft", "sq.yd", "sq.mt"] },
  length: { type: Number },
  width: { type: Number },
  propertyPrice: { type: Number, required: true},
  constructionStatus: { type: String, enum: ["readytomove", "underconstruction"], default: "readytomove" },
  advancedDetails: AdvancedDetailsSchema,
});

const CommercialSchema = new mongoose.Schema({
  type: { type: String, enum: ["office", "retailshop", "showroom", "warehouse", "plot", "others"], required: true },
  address: {
    buildingName: { type: String, default: "" },
    locality: { type: String, required: true },
    city: { type: String, required: true },
  },
  plotArea: { type: Number },
  plotAreaUnit: { type: String, enum:["sq.ft", "sq.yd", "sq.mt"] },
  length: { type: Number },
  width: { type: Number },
  propertyPrice: { type: Number, required: true },
  constructionStatus: { type: String, enum: ["readytomove", "underconstruction"], default: "readytomove" },
  availableFrom: { type: Date },
  advancedDetails: {
    ageOfProperty: { type: Number },
    zoneType: { type: String, enum: ["Industrial", "Commercial", "Residential", "Others"] },
    locationHub: {
      type: String,
      enum: ["mall", "commercialproject", "markethighstreet", "others", "retailcomplexbuilding"],
    },
    ownership: { type: String, enum: ["freehold", "lease", "cooperativesociety", "powerofattorney"] },
    totalFloor: { type: Number },
    yourFloor: { type: Number },
  },
  roi: { type: Number },
  amenities: [
    {
      type: String,
      enum: ["waterstorage", "powerbackup", "internetconnectivity", "security", "cctv", "cafeteria"],
    },
  ],
});

const PropertySchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
     residential:ResidentialSchema,
     commercial:CommercialSchema,
     // Common fields
    status:{type:String,enum:["active","inactive"],default:"active"},
    lookingTo:{type:String,default:"Rent",enum:["Rent","Sell"],required:true},
    whoYouAre:{type:String,enum:["owner","dealer","broker"],required:true},
    images:[{type:String,default:""}],
    enquiries:[{type:mongoose.Schema.Types.ObjectId,ref:"Lead"}],
    propertydescription:{type:String,default:""}
},{timestamps:true})

const PropertyModel = mongoose.model("Property",PropertySchema)
export default PropertyModel