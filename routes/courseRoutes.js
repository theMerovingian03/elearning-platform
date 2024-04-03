// courseRoutes.js

const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// Route for creating a new course
router.post('/', authMiddleware, CourseController.createCourse);

// Route for updating a course
router.put('/:id', authMiddleware, CourseController.updateCourse);

// Route for deleting a course
router.delete('/:id', authMiddleware, CourseController.deleteCourse);




module.exports = router;
