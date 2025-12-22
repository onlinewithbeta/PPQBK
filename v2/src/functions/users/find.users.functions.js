import mongoose from "mongoose";
import User from "../../models/users.models.js";

const findUser = {
  /**
   * Find user by MongoDB ObjectId
   * @param {string|mongoose.Types.ObjectId} id - User's MongoDB ObjectId
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If id is invalid or database operation fails
   */
  byId: async function (id) {
    try {
      // Validate id is provided
      if (!id) {
        throw new Error("User ID is required");
      }

      // Convert string id to ObjectId if needed
      const objectId = typeof id === "string" ? new mongoose.Types.ObjectId(id) : id;

      // Find user by _id
      const user = await User.findById(objectId);

      // Return null if user not found (not an error - just not found)
      if (!user) {
        console.log(`User with ID ${id} not found`);
        return null;
      }

      console.log(`User found by ID: ${id}`);
      return user;
    } catch (error) {
      // Handle specific Mongoose errors
      if (error instanceof mongoose.Error.CastError) {
        console.error(`Invalid user ID format: ${id}`);
        throw new Error(`Invalid user ID format: ${id}`);
      }

      console.error(`Error finding user by ID ${id}:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by access token (case-insensitive partial match in sensitive.accessToken.value)
   * @param {string} accessToken - User's access token to search for
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byAccessToken: async function (accessToken) {
    try {
      console.log(`Searching for user with access token: ${accessToken ? "provided" : "not provided"}`);

      // Validate accessToken is provided
      if (!accessToken || typeof accessToken !== "string") {
        throw new Error("Valid access token string is required");
      }

      // Trim whitespace from token
      const token = accessToken.trim();

      // Use regex for case-insensitive partial matching
      // You might want exact matching instead: { "sensetive.accessToken.value": token }
      const user = await User.findOne({
        "sensetive.accessToken.value": { $regex: new RegExp(token, "i") }
      });

      // Log result
      if (user) {
        console.log(`User found by access token (partial match): ${user.username || user.gmail}`);
      } else {
        console.log("No user found with the provided access token");
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by access token:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by Gmail (exact match, case-insensitive)
   * @param {string} gmail - User's Gmail address
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byGmail: async function (gmail) {
    try {
      console.log(`Searching for user with gmail: ${gmail}`);

      // Validate gmail is provided
      if (!gmail || typeof gmail !== "string") {
        throw new Error("Valid gmail string is required");
      }

      // Trim and lowercase for case-insensitive search
      const email = gmail.trim().toLowerCase();

      // Find user by exact email match
      const user = await User.findOne({ 
        gmail: { $regex: new RegExp(`^${email}$`, "i") }
      });

      // Alternative: if you want exact match without regex:
      // const user = await User.findOne({ gmail: email });

      // Log result
      if (user) {
        console.log(`User found by gmail: ${user.username || user.gmail}`);
      } else {
        console.log(`No user found with gmail: ${email}`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by gmail ${gmail}:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by any property (exact match)
   * @param {string} prop - Property name to search by (supports nested paths with dot notation)
   * @param {any} value - Value to match
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails or invalid parameters
   */
  byProperty: async function (prop, value) {
    try {
      console.log(`Searching for user with property ${prop} = ${value}`);

      // Validate parameters
      if (!prop || typeof prop !== "string") {
        throw new Error("Property name must be a valid string");
      }

      if (value === undefined || value === null) {
        throw new Error("Value must be provided");
      }

      // Build query object with the property
      const query = {};
      query[prop] = value;

      // Find user by the specified property
      const user = await User.findOne(query);

      // Log result
      if (user) {
        console.log(`User found by ${prop}: ${user.username || user.gmail || user._id}`);
      } else {
        console.log(`No user found with ${prop} = ${value}`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by property ${prop}:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by multiple properties (exact match for all)
   * @param {Object} queryObject - Object containing key-value pairs to match
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byMultipleProperties: async function (queryObject) {
    try {
      console.log(`Searching for user with properties:`, queryObject);

      // Validate queryObject
      if (!queryObject || typeof queryObject !== "object" || Object.keys(queryObject).length === 0) {
        throw new Error("Query object must be a non-empty object");
      }

      // Find user matching all properties
      const user = await User.findOne(queryObject);

      // Log result
      if (user) {
        console.log(`User found with multiple properties: ${user.username || user.gmail || user._id}`);
      } else {
        console.log("No user found matching all specified properties");
      }

      return user;
    } catch (error) {
      console.error("Error finding user by multiple properties:", error.message);
      throw error;
    }
  },

  /**
   * Find user by username (exact match, case-insensitive)
   * @param {string} username - Username to search for
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byUsername: async function (username) {
    try {
      console.log(`Searching for user with username: ${username}`);

      if (!username || typeof username !== "string") {
        throw new Error("Valid username string is required");
      }

      const user = await User.findOne({
        username: { $regex: new RegExp(`^${username.trim()}$`, "i") }
      });

      if (user) {
        console.log(`User found by username: ${user.username}`);
      } else {
        console.log(`No user found with username: ${username}`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by username ${username}:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by phone number (exact match)
   * @param {string} phone - Phone number to search for
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byPhone: async function (phone) {
    try {
      console.log(`Searching for user with phone: ${phone}`);

      if (!phone || typeof phone !== "string") {
        throw new Error("Valid phone string is required");
      }

      // Remove any non-digit characters for consistency
      const cleanPhone = phone.replace(/\D/g, "");
      
      const user = await User.findOne({ phone: cleanPhone });

      if (user) {
        console.log(`User found by phone: ${user.username || user.gmail}`);
      } else {
        console.log(`No user found with phone: ${cleanPhone}`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by phone ${phone}:`, error.message);
      throw error;
    }
  },

  /**
   * Find user by matriculation number (case-insensitive)
   * @param {string} matno - Matriculation number
   * @returns {Promise<Object|null>} User document or null if not found
   * @throws {Error} If database operation fails
   */
  byMatricNumber: async function (matno) {
    try {
      console.log(`Searching for user with matric number: ${matno}`);

      if (!matno || typeof matno !== "string") {
        throw new Error("Valid matriculation number string is required");
      }

      const user = await User.findOne({
        "studentInfo.matno": { $regex: new RegExp(`^${matno.trim()}$`, "i") }
      });

      if (user) {
        console.log(`User found by matric number: ${user.username || user.gmail}`);
      } else {
        console.log(`No user found with matric number: ${matno}`);
      }

      return user;
    } catch (error) {
      console.error(`Error finding user by matric number ${matno}:`, error.message);
      throw error;
    }
  },

  /**
   * Find all users with pagination support
   * @param {Object} options - Pagination and filtering options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Number of users per page (default: 10)
   * @param {Object} options.filter - Additional filter criteria
   * @returns {Promise<Object>} Object containing users array and pagination info
   * @throws {Error} If database operation fails
   */
  getAll: async function (options = {}) {
    try {
      const { page = 1, limit = 10, filter = {} } = options;
      const skip = (page - 1) * limit;

      console.log(`Fetching users - Page: ${page}, Limit: ${limit}`);

      // Get total count for pagination info
      const total = await User.countDocuments(filter);
      
      // Find users with pagination
      const users = await User.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sort by newest first

      return {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error("Error fetching all users:", error.message);
      throw error;
    }
  }
};

export default findUser;