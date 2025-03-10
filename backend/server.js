const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");

const app = express();


const corsOptions = {
    origin: "http://127.0.0.1:5500",  
    methods: ["GET", "POST"],
    credentials: true
};
app.use(cors(corsOptions));  

// Middleware
app.use(express.json()); 


app.use("/api/questions", questionRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
