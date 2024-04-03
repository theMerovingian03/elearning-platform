const { Course } = require('../models/models');

const courseController = {
    // Controller function to create a new course
    createCourse: async (req, res) => {
        try {
            const { title, description, category, level } = req.body;

            // Create the course
            const newCourse = await Course.create({
                title: title,
                description: description,
                category: category,
                level: level
            });

            res.status(201).json({ message: 'Course created successfully', course: newCourse });
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function to update an existing course
    updateCourse: async (req, res) => {
        try {
            const courseId = req.params.id;
            const { title, description, category, level } = req.body;

            // Find the course by ID
            const course = await Course.findByPk(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            // Update the course attributes
            course.title = title;
            course.description = description;
            course.category = category;
            course.level = level;

            // Save the updated course
            await course.save();

            res.status(200).json({ message: 'Course updated successfully', course: course });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function to delete a course
    deleteCourse: async (req, res) => {
        try {
            const courseId = req.params.id;

            // Find the course by ID
            const course = await Course.findByPk(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            // Delete the course
            await course.destroy();

            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function to get details of a specific course
    getCourseDetails: async (req, res) => {
        try {
            const courseId = req.params.id;

            // Find the course by ID
            const course = await Course.findByPk(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            res.status(200).json({ course: course });
        } catch (error) {
            console.error('Error fetching course details:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Controller function to get a list of all courses
    getAllCourses: async (req, res) => {
        try {
            // Fetch all courses
            const courses = await Course.findAll();

            res.status(200).json({ courses: courses });
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = courseController;
