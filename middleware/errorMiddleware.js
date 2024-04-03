const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error status and message
    let statusCode = 500;
    let message = 'Internal server error';

    // Custom error handling based on error type
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
        message = err.message;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
        message = 'Unauthorized access';
    }

    // Send error response
    res.status(statusCode).json({ error: message });
};

module.exports = errorMiddleware;
