
require("dotenv").config();
const express = require('express');
let cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.listen(PORT,()=>{
    console.log('listening on port http://localhost:'+ PORT )
})
app.use(cors({origin:'*'})); 
app.use(express.static("public"));

// REQUEIRE ROUTES
const quizRouter = require('./routes/quizRoute.js')
app.use("/api",quizRouter);