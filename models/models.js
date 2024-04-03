const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    profilePicture: {
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    level: { type: DataTypes.STRING }
});

module.exports = {
    User: User,
    Course: Course
}