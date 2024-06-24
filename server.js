// server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // You can change the port as needed

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '6680560684:AAE2Rz3k47PcTCrA6FtbzYeIKgDLuA5oAuc'; // Replace with your Telegram bot token
const CHAT_ID = '-1001933572524'; // Replace with your Telegram chat ID

app.post('/confirm', (req, res) => {
    const { Message, Name, Email, Phone, PageName } = req.body;

    // Process the form data and create the message
    const message = `Name: ${Name}\nEmail: ${Email}\nPhone: ${Phone}\nPage Name: ${PageName}\nMessage: ${Message}`;

    // Send the message to your Telegram bot
    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
    })
        .then(() => {
            console.log('Message sent to Telegram bot:', message);
            res.status(200).send('Message sent to Telegram bot');
        })
        .catch((error) => {
            console.error('Error sending message to Telegram bot:', error);
            res.status(500).send('Error sending message to Telegram bot');
        });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
