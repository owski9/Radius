const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const path = require('path');  // Add this line to require the 'path' module
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chatbot endpoint
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a site help assistant for my web proxy https://radiusowski.site. Make sure that the user is able to use the site fully and is directed to a solution if a problem occurs. also, if the user has received an error while using radius, tell them to send a screenshot of the error to radiushelpmail@gmail.com. The purpose of radius is to keep your browsing secure. Radius configures sites to allow users to unblock any website, even in school. To search the web enter anything into the search box on the home page. In the top left corner of the site, you should see three lines. If you click on that icon, a menu will open up. There, you'll find options like the Games page, Apps page, and Settings page." },
            { role: "user", content: userMessage }
        ],
    });

    res.json({ response: response.data.choices[0].message.content });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
