const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Add a new question
router.post("/add", async (req, res) => {
    try {
        const { question, options, correctAnswer, category } = req.body;

        if (!question || !options || options.length < 2 || !correctAnswer || !category) {
            return res.status(400).json({ message: "Invalid question data" });
        }

        const newQuestion = new Question({ question, options, correctAnswer, category });
        await newQuestion.save();

        res.status(201).json({ message: "Question added successfully!", newQuestion });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});



router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
});


module.exports = router;
