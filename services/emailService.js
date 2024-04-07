import { Resend } from 'resend';
require('dotenv').config();

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);
const server_email = process.nextTick.SERVER_EMAIL;

// Function to send registration confirmation email
function sendRegistrationConfirmationEmail(email) {
    resend.emails.send({
        from: server_email,
        to: email,
        subject: 'Registration Confirmation',
        html: '<p>Thank you for registering!</p>'
    }).then(() => {
        console.log('Registration confirmation email sent successfully');
    }).catch((error) => {
        console.error('Error sending registration confirmation email:', error);
    });
}

// Function to send password reset email
function sendPasswordResetEmail(email, resetToken) {
    resend.emails.send({
        from: server_email,
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="http://yourwebsite.com/reset-password/${resetToken}">here</a> to reset your password.</p>`
    }).then(() => {
        console.log('Password reset email sent successfully');
    }).catch((error) => {
        console.error('Error sending password reset email:', error);
    });
}

// Function to send course enrollment notification email
function sendEnrollmentNotificationEmail(email, courseName) {
    resend.emails.send({
        from: server_email,
        to: email,
        subject: 'Course Enrollment Notification',
        html: `<p>You have been enrolled in the course "${courseName}".</p>`
    }).then(() => {
        console.log('Enrollment notification email sent successfully');
    }).catch((error) => {
        console.error('Error sending enrollment notification email:', error);
    });
}

// Export email sending functions
module.exports = {
    sendRegistrationConfirmationEmail,
    sendPasswordResetEmail,
    sendEnrollmentNotificationEmail
};
