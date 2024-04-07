const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const loggingMiddleware = require('./middleware/loggingMiddleware');

const app = express();

// Middleware
app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000; // Using PORT environment variable or defaulting to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
