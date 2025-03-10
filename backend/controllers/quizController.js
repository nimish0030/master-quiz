const Question = require("../models/Question");


exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch questions", error });
    }
};

exports.saveQuestions = async (req, res) => {
    try {
        const newQuestions = await Question.insertMany(req.body);
        res.status(201).json({ message: "Questions added successfully!", data: newQuestions });
    } catch (error) {
        res.status(500).json({ message: "Error adding questions", error });
    }
};
