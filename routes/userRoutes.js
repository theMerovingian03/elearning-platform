const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route for user registration
router.post('/register', UserController.registerUser);

// Route for user login
router.post('/login', UserController.loginUser);

// Route for fetching user profile
router.get('/:userId/profile', UserController.getUserProfile);

// Route for updating user profile
router.put('/:userId/profile', UserController.updateUserProfile);

// Route for enrolling in a course
router.post('/:userId/enroll/:courseId', UserController.enrollCourse);

// Route for viewing enrolled courses
router.get('/:userId/enrolled-courses', UserController.getEnrolledCourses);

// Route for sending password reset email
router.post('/forgot-password', UserController.sendPasswordResetEmail);

// Route for sending course enrollment notification email
router.post('/:userId/enroll/:courseId', UserController.enrollCourse, UserController.sendEnrollmentNotificationEmail);

module.exports = router;
