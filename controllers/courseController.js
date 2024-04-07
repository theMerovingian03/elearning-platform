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

    // Controller function to get a list of all courses with filters and pagination
    getCourses: async (req, res) => {
        try {
            // Extract filtering and pagination options from query parameters
            const { category, level, popularity, page = 1, limit = 10 } = req.query;

            // Construct options object based on provided parameters
            const options = {};
            if (category) {
                options.category = category;
            }
            if (level) {
                options.level = level;
            }
            if (popularity) {
                options.popularity = popularity;
            }

            // Calculate offset and limit for pagination
            const offset = (page - 1) * limit;

            // Fetch paginated courses based on filtering options
            const courses = await Course.findAndCountAll({
                where: options,
                limit: parseInt(limit),
                offset: offset
            });

            // Calculate total number of pages
            const totalPages = Math.ceil(courses.count / limit);

            res.status(200).json({
                totalCourses: courses.count,
                totalPages: totalPages,
                currentPage: parseInt(page),
                courses: courses.rows
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = courseController;
