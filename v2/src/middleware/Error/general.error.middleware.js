//Errors we were unable to catch
export default function generalError	(err, req, res, next){
    console.error('Error:', err.message);
  
    res.status(500).json({
        success: false,
        error: 'Internal Server Error'
    });
}
