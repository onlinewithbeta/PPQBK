import findUser from "../functions/users/find.users.functions.js";

export default async function apikeyMiddleware(req, res, next) {
 try {
  const APIKEY = getApiKey(req.headers);

  if (!APIKEY) {
   return res.status(404).json({
    error: "API key required",
    code: "MISSING_API_KEY"
   });
  }

  // Verify API key and find user
  const user = await findUser.byAccessToken(APIKEY);

  if (!user) {
   console.log("User not found");
   throw new Error("Invalid API key Or Expired APIKEY. Please login.");
  }
  // Attach user to request
  req.user = user;
  next();
 } catch (error) {
  console.error("API key middleware error:", error);
  return res.status(404).json({
   success: false,
   message: error.message || "Server busy. Please try again later"
  });
 }
}

function getApiKey(headers) {
 // Check all common API key header formats
 const possibleKeys = [
  headers.apikey,
  headers.APIKEY,
  headers["x-api-key"],
  headers["X-API-Key"],
  headers["api-key"],
  headers["API-Key"],
  headers.authorization,
  headers.Authorization
 ];
 let apiKey = possibleKeys.find(key => key && key.trim() !== "");

 if (!apiKey) {
  return null;
 }

 // Clean the API key
 apiKey = apiKey.trim();

 // Extract from Bearer token
 if (apiKey.startsWith("Bearer ")) {
  return apiKey.substring(7).trim();
 }

 // Extract from Token token
 if (apiKey.startsWith("Token ")) {
  return apiKey.substring(6).trim();
 }

 // Extract from Basic auth
 if (apiKey.startsWith("Basic ")) {
  return apiKey.substring(6).trim();
 }
 return apiKey;
}
