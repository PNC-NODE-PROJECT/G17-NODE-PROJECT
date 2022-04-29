const express = require('express');
const app = express();
let cors = require('cors');

const PORT =4000;
app.use(cors({origin:'*'})); 

app.use(express.json())
app.listen(PORT,()=>{
    console.log('listening on port '+ PORT)
})
app.use(express.static("public"));
// -----------------------------require route----------------------
const quizRouter = require('./routes/quizRoute.js')
app.use("/api",quizRouter);