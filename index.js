const express = require('express')
const Router = express();
const { GoogleGenerativeAI } = require("@google/generative-ai")
require('dotenv').config()
const APIKEY = process.env.KEY;
const genAI = new GoogleGenerativeAI(APIKEY);


Router.set("view engine", "ejs");
Router.use(express.json());
Router.use(express.urlencoded({ extended: true }));

Router.get("/", (req, res) => {
    res.render("index");
});

Router.post("/chat", async (req, res) => {
    try {
        const { question } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const prompt = question;
        if (prompt) {
            const result = await model.generateContent(prompt);
            const mainResult = result.response.text();
            res.render("chat", { mainResult, prompt });
        } else {
            res.render("index", { mainResult, prompt });
        }
    } catch (error) {
        res.send(error.message);
    }
});

Router.listen("8000");










