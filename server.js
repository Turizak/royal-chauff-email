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
    const { name, email, phone, service, message } = req.body;
    console.log('Received data:', name, email, phone, service, message);

    // try {
    //     // Extract data from request body
    //     const { to, subject, message } = req.body;

    //     // Validate required fields
    //     if (!to || !subject || !message) {
    //         return res.status(400).json({ error: 'Missing required fields' });
    //     }

    //     // Configure email options
    //     const mailOptions = {
    //         from: process.env.EMAIL_USER,
    //         to,
    //         subject,
    //         text: message,
    //         // You can also use HTML content
    //         // html: '<p>Your HTML message here</p>'
    //     };

    //     // Send the email
    //     const info = await transporter.sendMail(mailOptions);

    //     res.status(200).json({
    //         success: true,
    //         messageId: info.messageId,
    //         message: 'Email sent successfully'
    //     });

    // } catch (error) {
    //     console.error('Error sending email:', error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'Failed to send email',
    //         error: error.message
    //     });
    // }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});