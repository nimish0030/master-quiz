const Question = require('../models/Question'); 

const addQuestion = async (req, res) => {
    try {
        const { question, options, correctAnswer, category } = req.body;


        if (!question || !options || !correctAnswer || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newQuestion = new Question({ question, options, correctAnswer, category });
        await newQuestion.save(); 

        res.status(201).json({ message: "Question added successfully", question: newQuestion });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { addQuestion };
