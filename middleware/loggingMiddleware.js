const fs = require('fs');

// Create a stream to log information to a file
const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

// Logging middleware function
function loggingMiddleware(req, res, next) {
    // Log request method, URL, and timestamp
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
    console.log(log);

    // Write the log to the access log file
    accessLogStream.write(log + '\n');

    // Continue to the next middleware
    next();
}

module.exports = loggingMiddleware;
