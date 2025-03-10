const express = require("express");
const { getAllQuestions, saveQuestions } = require("../controllers/quizController");

const router = express.Router();
router.get("/questions", getAllQuestions);
router.post("/save", saveQuestions);

module.exports = router;
