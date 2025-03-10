const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

const QuizQuestion = mongoose.model("QuizQuestion", quizSchema);
module.exports = QuizQuestion;
