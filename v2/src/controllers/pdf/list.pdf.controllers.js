import Pdf from "../../models/pdf.models.js";

/**
 * Get all courses with formatted output
 * @route GET /api/courses
 * @returns {Array} List of courses with all PDF details
 */
const listAllCourses = async (req, res) => {
  try {
    // Fetch all PDFs from database
    const pdfs = await Pdf.find({ "system_info.deleted": false }); // Only fetch non-deleted PDFs
    
    // Format the data according to the required structure
    const formattedCourses = pdfs.map(pdf => {
      // Extract likes count from impressions.likes array
      const likesCount = pdf.impressions?.likes?.length || 0;
      
      // Extract dislikes count from impressions.dislikes array
      const dislikesCount = pdf.impressions?.dislikes?.length || 0;
      
      // Extract views count from impressions.views array
      const viewsCount = pdf.impressions?.views?.length || 0;
      
      // Format comments to match the required structure
      const formattedComments = pdf.impressions?.comments?.map(comment => ({
        username: comment.user,
        text: comment.text,
        date: comment.date ? comment.date.toLocaleString() : new Date().toLocaleString()
      })) || [];
      
      // Return the formatted object
      return {
        title: pdf.info?.title || "Untitled",
        id: pdf.info?.id || "Untitled",
        course: pdf.info?.course || "Uncategorized",
        author: pdf.info?.author || "Unknown Author",
        pages: pdf.info?.pages || 0,
        size: pdf.info?.size || "0mb",
        cost: pdf.system_info?.cost || 0,
        likes: likesCount,
        dislikes: dislikesCount,
        views: viewsCount,
        comments: formattedComments
      };
    });
    
    // Send the formatted response
    res.status(200).json({
      success: true,
      count: formattedCourses.length,
      data: formattedCourses
    });
    
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message
    });
  }
};

/**
 * Get all unique courses (just course names)
 * @route GET /api/courses/unique
 */
export const getUniqueCourses = async (req, res) => {
  try {
    // Use distinct to get unique course names
    const uniqueCourses = await Pdf.distinct("info.course", { 
      "system_info.deleted": false,
      "info.course": { $ne: null, $ne: "" } // Exclude null/empty courses
    });
    
    // Filter out any null/undefined values and sort
    const filteredCourses = uniqueCourses
      .filter(course => course && course.trim() !== "")
      .sort((a, b) => a.localeCompare(b));
    
    res.status(200).json({
      success: true,
      count: filteredCourses.length,
      data: filteredCourses
    });
    
  } catch (error) {
    console.error("Error fetching unique courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch unique courses",
      error: error.message
    });
  }
};

/**
 * Get courses filtered by course name
 * @route GET /api/courses/:courseName
 */
export const getCoursesByName = async (req, res) => {
  try {
    const { courseName } = req.params;
    
    // Decode URL parameter if needed
    const decodedCourseName = decodeURIComponent(courseName);
    
    // Find PDFs with the specified course name
    const pdfs = await Pdf.find({ 
      "info.course": decodedCourseName,
      "system_info.deleted": false 
    });
    
    // Format the data (same formatting as above)
    const formattedCourses = pdfs.map(pdf => {
      const likesCount = pdf.impressions?.likes?.length || 0;
      const dislikesCount = pdf.impressions?.dislikes?.length || 0;
      const viewsCount = pdf.impressions?.views?.length || 0;
      
      const formattedComments = pdf.impressions?.comments?.map(comment => ({
        username: comment.user,
        text: comment.text,
        date: comment.date ? comment.date.toLocaleString() : new Date().toLocaleString()
      })) || [];
      
      return {
        title: pdf.info?.title || "Untitled",
        course: pdf.info?.course || "Uncategorized",
        author: pdf.info?.author || "Unknown Author",
        pages: pdf.info?.pages || 0,
        size: pdf.info?.size || "0mb",
        cost: pdf.system_info?.cost || 0,
        likes: likesCount,
        dislikes: dislikesCount,
        views: viewsCount,
        comments: formattedComments
      };
    });
    
    res.status(200).json({
      success: true,
      course: decodedCourseName,
      count: formattedCourses.length,
      data: formattedCourses
    });
    
  } catch (error) {
    console.error("Error fetching courses by name:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message
    });
  }
};

/**
 * Get course statistics (aggregated data)
 * @route GET /api/courses/stats
 */
export const getCourseStats = async (req, res) => {
  try {
    const stats = await Pdf.aggregate([
      { $match: { "system_info.deleted": false } },
      { $group: {
        _id: "$info.course",
        count: { $sum: 1 },
        totalPages: { $sum: "$info.pages" },
        averageLikes: { $avg: { $size: { $ifNull: ["$impressions.likes", []] } } },
        totalViews: { $sum: { $size: { $ifNull: ["$impressions.views", []] } } },
        totalComments: { $sum: { $size: { $ifNull: ["$impressions.comments", []] } } }
      }},
      { $sort: { count: -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error("Error fetching course stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course statistics",
      error: error.message
    });
  }
};



export default listAllCourses;
