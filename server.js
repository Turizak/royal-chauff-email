const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
    },
});

app.post('/send-email', async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, phone, service, message } = req.body;

        // Validate required fields
        if (!name || !email || !message || !service || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Configure email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}: ${service}`,
            html: `<p>${message}</p><p><strong>Contact Details</strong></p><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: <a href="tel:${phone}">${phone}</a></p><p>Service: ${service}</p>`
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            messageId: info.messageId,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});