
//not found errors
export default function notfoundError(req, res) {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.originalUrl
    });
}