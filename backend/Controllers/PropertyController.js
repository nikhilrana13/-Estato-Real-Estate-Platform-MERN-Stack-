import cloudinary from "../Config/cloudinary.js";
import PropertyModel from "../Models/PropertyModel.js";
import UserModel from "../Models/UserModel.js";
import sharp from "sharp";
import { Response } from "../utils/Responsehandler.js";
import Lead from "../Models/LeadModel.js";
import { sendSellerDetailToViewer } from "../utils/EmailService.js";

export const AddProperty = async (req, res) => {
  try {
    const userId = req.user;
    let { lookingTo, whoYouAre, residential, commercial, propertydescription } =
      req.body;
    const files = req.files;
    // console.log("req body",req.body)
    //  console.log("files",files)

    // Safe JSON parse helper
    const safeParse = (data, fieldName) => {
      if (!data) return null;
      if (typeof data === "string") {
        try {
          return JSON.parse(data);
        } catch (err) {
          throw new Error(`Invalid JSON format in "${fieldName}"`);
        }
      }
      return data;
    };
    // Parse JSON fields safely
    residential = safeParse(residential, "residential");
    commercial = safeParse(commercial, "commercial");
    //  Validation: at least one property type (residential or commercial)
    if (!lookingTo || !whoYouAre || (!residential && !commercial)) {
      return Response(
        res,
        403,
        "All fields is required either residential or commercial property must be provided"
      );
    }
    // Prevent both residential and commercial together
    if (residential && commercial) {
      return Response(
        res,
        400,
        "You can only add one property type — either Residential or Commercial, not both"
      );
    }
    if (!files || files.length === 0) {
      return Response(res, 400, "At least one image is required");
    }
    // check user exists or not
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }
    // upload images to cloudinary
    let imagesurl = [];
    for (const file of files) {
      try {
        const optimizedImage = await sharp(file.buffer)
          .resize({ width: 500, height: 400 })
          .webp({ quality: 80 })
          .toBuffer();
        const imageBase64 = `data:image/webp;base64,${optimizedImage.toString(
          "base64"
        )}`;

        const cloudRes = await cloudinary.uploader.upload(imageBase64, {
          folder: "estato-website",
          resource_type: "image",
        });
        imagesurl.push(cloudRes.secure_url);
      } catch (error) {
        console.log("Cloudinary upload error", error);
        return Response(res, 500, "Image upload failed");
      }
    }

    //  Create property object
    const propertyData = {
      userId,
      whoYouAre,
      lookingTo,
      images: imagesurl,
      status: "active",
      propertydescription,
    };

    if (residential) propertyData.residential = residential;
    if (commercial) propertyData.commercial = commercial;

    // create property
    const property = await PropertyModel.create(propertyData);
    // user property id to user listings array
    user.mylistings.push(property._id);
    await user.save();
    return Response(res, 200, "Property added successfully", property);
  } catch (error) {
    console.log(error.response || error);
    console.log("failed to add property", error);
    return Response(res, 500, "Internal server error");
  }
};

export const FindPropertys = async (req, res) => {
  try {
    const {
      city,
      locality,
      propertytype,
      bhk,
      furnishType,
      Amenities,
      sortby,
      page = 1,
      limit = 20,
      constructionStatus,
      ageOfProperty,
      minPrice,
      maxPrice,
      type,
      lookingto,
    } = req.query;
    // console.log("req query", req.query);
    // convert page & limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    let filter = {};
    filter[`${type}`] = { $exists: true }; // ensure only that type exists (commercial or residential)
    // console.log("FINAL FILTER:", JSON.stringify(filter, null, 2));

    let orConditions = [];
    // filter property based on type or looking to
    let normalizedLookingTo = lookingto;
    if (lookingto) {
      const lt = lookingto.toLowerCase();

      if (lt === "buy") {
        normalizedLookingTo = "Sell";
      } else if (lt === "rent") {
        normalizedLookingTo = "Rent";
      } else if (lt === "sell") {
        normalizedLookingTo = "Sell";
      }
    }
    if (type && normalizedLookingTo) {
      filter.lookingTo = normalizedLookingTo;
    }
//     console.log("RAW QUERY:", req.query);
// console.log("FINAL FILTER:", filter);
    // city filter
    if (city) {
      filter[`${type}.address.city`] = { $regex: new RegExp(`^${city.trim()}`, "i") };
    }
    // console.log("CITY FROM QUERY:", city);
    // construction  filter
    if (constructionStatus) {
      filter[`${type}.constructionStatus`] = {
        $regex: new RegExp(constructionStatus, "i"),
      };
    }
    // ageofproperty  filter
    if (ageOfProperty) {
      filter[`${type}.advancedDetails.ageOfProperty`] = {
        $lte: Number(ageOfProperty),
      };
    }
    //prorpertyprice  filter
    // if (propertyPrice) {
    //   filter[`${type}.propertyPrice`] = { $lte: Number(propertyPrice) };
    // }
    if (minPrice || maxPrice) {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
      filter[`${type}.propertyPrice`] = { $gte: min, $lte: max };
    }
    // locality filter
    if (locality) {
      filter[`${type}.address.locality`] = {
        $regex: new RegExp(locality, "i"),
      };
    }
    // for filter multiple properytype
    if (propertytype) {
      const propertytypes = propertytype
        .split(",")
        .map((p) => p.trim().toLowerCase());
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: propertytypes.map((p) => ({
            [`${type}.type`]: { $regex: new RegExp(p, "i") },
          })),
        },
      ];
    }
    // for filter multiple bhks
    if (bhk && type === "residential") {
      const bhks = bhk.split(",").map((b) => b.trim());
      orConditions.push(
        ...bhks.map((b) => ({
          "residential.bhk": { $regex: new RegExp(b, "i") },
        }))
      );
    }
    // for filter furnishtype
    if (furnishType && type === "residential") {
      const furnishes = furnishType.split(",").map((f) => f.trim());
      orConditions.push(
        ...furnishes.map((f) => ({
          "residential.furnishType": { $regex: new RegExp(f, "i") },
        }))
      );
    }
    // for flat multiple amenties
    if (Amenities && type === "residential") {
      const flats = Amenities.split(",").map((a) => a.trim()).filter(Boolean);
      orConditions.push(
        ...flats.map((a) => ({
          "residential.societyAmenities": { $regex: new RegExp(a, "i") },
        }))
         );
    }
  // console.log("Amenities from frontend:", Amenities);
    // Commercial amenities
    if (Amenities && type === "commercial") {
      const comms = Amenities.split(",").map((a) => a.trim());
      filter.$and = [
        ...(filter.$and || []),
        {
          $or: comms.map((a) => ({
            "commercial.amenities": { $regex: new RegExp(a, "i") },
          })),
        },
      ];
    }
    // merge OR conditions safely (AND logic)
    if (orConditions.length > 0) {
      filter.$and = [...(filter.$and || []), { $or: orConditions }];
    }
    // Create query with filter
    const query = PropertyModel.find(filter);

    // Add sorting if provided
    if (sortby?.toLowerCase() === "lowtohigh") {
      query.sort({ [`${type}.propertyPrice`]: 1 });
    } else if (sortby?.toLowerCase() === "hightolow") {
      query.sort({ [`${type}.propertyPrice`]: -1 });
    }

    // Add pagination
    query.skip(skip).limit(limitNumber);

    // Add population
    query.populate("userId", "username phoneNumber phoneSuffix profilepic");

    // Execute query
    const properties = await query;
    const totalproperty = await PropertyModel.countDocuments(filter);
    const totalPages = Math.ceil(totalproperty / limitNumber);
    // console.log("properties", properties);
    return Response(res, 200, "Properties found", {
      properties,
      pagination: {
        totalPages,
        totalproperty,
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
   

  } catch (error) {
    console.log("failed to get properties", error);
    return Response(res, 500, "Internal Server error");
  }
};
export const EachPropertyDetails = async (req, res) => {
  try {
    const propertyId = req.params.id;
    // check property exists or not
    const property = await PropertyModel.findById(propertyId).populate("userId","username phonesuffix phoneNumber email profilepic")
    if (!property) {
      return Response(res, 404, "property not found");
    }
    return Response(res, 200, "Property details found", property);
  } catch (error) {
    console.log("failed to get property details", error);
    return Response(res, 500, "Internal Server error");
  }
};

export const EachUserListings = async (req, res) => {
  try {
    const userId = req.user;
    // parse page safely ensure at least 1
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const user = await UserModel.findById(userId);
    if (!user) {
      // user not found -> 404
      return Response(res, 404, "User not found");
    }
    let mylistings;
    try {
      mylistings = await PropertyModel.find({ userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (err) {
      console.error("Failed to fetch listings", err);
      return Response(res, 500, "Failed to fetch user listings");
    }

    let total;
    try {
      total = await PropertyModel.countDocuments({ userId });
    } catch (err) {
      console.error(
        "Failed to count listings, falling back to listings length",
        err
      );
      total = Array.isArray(mylistings) ? mylistings.length : 0;
    }

    const totalPages = Math.ceil(total / limit);

    // Return 200 with an empty array if no listings are present
    if (!mylistings || mylistings.length === 0) {
      return Response(res, 200, "No listings found", {
        mylistings: [],
        pagination: { total, currentPage: page, totalPages },
      });
    }
    return Response(res, 200, "Listings found", {
      mylistings,
      pagination: { total, currentPage: page, totalPages },
    });
  } catch (error) {
    console.log("failed to found user listings", error);
    return Response(res, 500, "Internal Server error");
  }
};

export const UpdateProPertyDetails = async (req, res) => {
  try {
    const userId = req.user;
    let {
      lookingTo,
      residential,
      commercial,
      propertydescription,
      deletedImages,
    } = req.body;
    // Get uploaded files (ensure it's an array)
    const files = Array.isArray(req.files)
      ? req.files
      : req.files
      ? [req.files]
      : [];
    // console.log("req body",req.body)
    //  console.log("files",files)

    // Safe JSON parse helper
    const safeParse = (data, fieldName) => {
      if (!data) return null;
      if (typeof data === "string") {
        try {
          return JSON.parse(data);
        } catch (err) {
          throw new Error(`Invalid JSON format in "${fieldName}"`);
        }
      }
      return data;
    };
    // Parse JSON fields safely
    residential = safeParse(residential, "residential");
    commercial = safeParse(commercial, "commercial");

    // check user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 403, "User not found");
    }

    // find the property to update
    const propertyId = req.params.id;
    if (!propertyId) {
      return Response(res, 400, "Property id is required");
    }

    const property = await PropertyModel.findById(propertyId);
    if (!property) {
      return Response(res, 404, "Property not found");
    }

    // ensure user is updating only his own property
    if (property.userId.toString() !== userId) {
      return Response(
        res,
        403,
        "You are not authorized to update this property"
      );
    }
    // deleted images list (coming from FE as JSON/string)
    if (typeof deletedImages === "string") {
      deletedImages = JSON.parse(deletedImages);
    }
    // start with existing property images
    let imagesurl = Array.isArray(property.images) ? [...property.images] : [];
    // remove deleted images (if any)
    if (deletedImages && deletedImages.length > 0) {
      imagesurl = imagesurl.filter((img) => !deletedImages.includes(img));
    }
    // upload any new files to cloudinary and append to imagesurl
    for (const file of files) {
      try {
        const optimizedImage = await sharp(file.buffer)
          .resize({ width: 500, height: 400 })
          .webp({ quality: 80 })
          .toBuffer();
        const imageBase64 = `data:image/webp;base64,${optimizedImage.toString(
          "base64"
        )}`;

        const cloudRes = await cloudinary.uploader.upload(imageBase64, {
          folder: "estato-website",
          resource_type: "image",
        });
        imagesurl.push(cloudRes.secure_url);
      } catch (error) {
        console.log("Cloudinary upload error", error);
        return Response(res, 500, "Image upload failed");
      }
    }

    // apply updates to the property
    if (lookingTo !== undefined) property.lookingTo = lookingTo;
    if (propertydescription !== undefined)
      property.propertydescription = propertydescription;
    if (residential !== undefined) property.residential = residential;
    if (commercial !== undefined) property.commercial = commercial;
    property.images = imagesurl;

    await property.save();
    return Response(res, 200, "Property updated successfully", property);
  } catch (error) {
    console.log(error.response || error);
    console.log("failed to Update property", error);
    return Response(res, 500, "Internal server error");
  }
};

export const DeleteProperty = async (req, res) => {
  try {
    const userId = req.user;
    const propertyId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    const property = await PropertyModel.findById(propertyId);
    if (!property) {
      return Response(res, 404, "Property not found");
    }
    if (property.userId.toString() !== userId) {
      return Response(
        res,
        403,
        "You are not authorized to delete the property"
      );
    }
    await PropertyModel.findByIdAndDelete(propertyId);
    user.mylistings.pull(propertyId);
    await user.save();
    return Response(res, 200, "Property deleted successfully");
  } catch (error) {
    console.log("failed to delete property", error);
    return Response(res, 500, "Internal server error");
  }
};

export const AddleadtoProperty = async (req, res) => {
  try {
    let viewerId = req.user;
    let { name, email, phonenumber, propertyId } = req.body;
    // console.log("req body",req.body)
    const user = await UserModel.findById(viewerId);
    if (!user) {
      return Response(res, 404, "User not found");
    }

    if (!name || !email || !phonenumber || !propertyId) {
      return Response(res, 400, "All fields is required");
    }

    const property = await PropertyModel.findById(propertyId).populate(
      "userId",
      "username phoneNumber email phonesuffix profilepic"
    );
    // console.log("property",property)
    if (!property) {
      return Response(res, 404, "Property not found");
    }

    const existingLead = await Lead.findOne({
      propertyId,
      "viewerDetail.userId": viewerId,
    });

    if (existingLead) {
      return Response(
        res,
        400,
        "You have already enquired about this property"
      );
    }

    const lead = await Lead.create({
      sellerId: property.userId,
      propertyId: property._id,
      viewerDetail: {
        userId: viewerId,
        name: name,
        email: email,
        phonenumber: phonenumber,
      },
    });

    property.enquiries.push(lead._id);
    // send email to viewer with seller details — don't fail if mail errors
    try {
      const sellerObj = {
        name: property.userId.username || property.userId.name || "Seller",
        email: property.userId.email || "",
        phone: property.userId.phoneNumber || property.userId.phone || "",
      };
      await sendSellerDetailToViewer(email, name, sellerObj, property);
    } catch (mailErr) {
      console.error("Failed to send seller-detail email to viewer:", mailErr);
    }
    await property.save();
    return Response(res, 200, "Check your email to get sellar contact details");
  } catch (error) {
    console.log("failed to add lead", error);
    return Response(res, 500, "Internal server error");
  }
};

export const EachUserPropertyLeads = async (req, res) => {
  try {
    const userId = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // Find all leads where this user is the seller
    const leads = await Lead.find({ sellerId: userId })
      .populate(
        "propertyId",
        "residential commercial propertydescription images"
      )
      .populate("viewerDetail.userId", "name email phonenumber");
    // console.log("leads",leads)
    if (!leads || leads.length === 0) {
      return Response(res, 200, "No Enquires found", []);
    }
    return Response(res, 200, "Leads found", leads);
  } catch (error) {
    console.log("failed to get leads", error);
    return Response(res, 500, "Internal server error");
  }
};
export const AddtoWishlestAndremove = async (req, res) => {
  try {
    const userId = req.user;
    const propertyId = req.params.id;
    // console.log("property id",propertyId)

    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    const property = await PropertyModel.findById(propertyId);
    if (!property) {
      return Response(res, 404, "Property not found");
    }

    // Check if property is already in wishlist
    const isInWishlist = user.mywishlists.some(
      (id) => id.toString() === propertyId
    );

    if (!isInWishlist) {
      // Add to wishlist if not present
      user.mywishlists.push(property._id);
      await user.save();
      return Response(res, 200, "Added to wishlist",{propertyId:propertyId});
    } else {
      // Remove from wishlist if present
      user.mywishlists = user.mywishlists.filter(
        (id) => id.toString() !== propertyId
      );
      await user.save();
      return Response(res, 200, "Removed from wishlist",{propertyId:propertyId});
    }
  } catch (error) {
    console.log("failed to add or remove wishlist", error);
    return Response(res, 500, "Internal server error");
  }
};

export const EachUserWishlest = async (req, res) => {
  try {
    const userId = req.user;
    // console.log("userId",userId)
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // Populate wishlist properties with their details
    await user.populate({
      path: "mywishlists",
      populate: {
        path: "userId",
        select: "username phoneNumber phoneSuffix",
      },
    });

    if (user.mywishlists.length === 0) {
      return Response(res, 200, "No wishlists found", []);
    }
    return Response(res, 200, "Wishlists found", user.mywishlists);
  } catch (error) {
    console.log("failed to get wishlists", error);
    return Response(res, 500, "Internal server error");
  }
};
