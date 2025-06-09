const express = require('express');
const nodemailer = require('nodemailer');
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.post('/send-mail', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body);


    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sharjeelzaka78689@gmail.com',
            pass: 'uaxi gzhz ewjn zwcw'
        }
    });

    const mailOptions = {
        from: 'sharjeelzaka78689@gmail.com', // Always use your authenticated email here
        to: 'sharjeelzaka78689@gmail.com',
        replyTo: email, // This allows you to reply directly to the user's email
        subject: subject,
        text: `You have a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email.' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully.' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
