const express = require('express');
const app = express();
let cors = require('cors');


const PORT = process.env.PORT || 3000
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:'*'})); 

app.use(express.json())
app.listen(PORT,()=>{
    console.log('listening on port '+ PORT)
})

const questionModel = require('./models/quiz_module');
app.use(express.static("public"));


app.get('/api/getQuestions',(req,res)=>{
    let getAllQuestions = questionModel.getAllQuestions();
    res.send(getAllQuestions);
})

app.post('/api/createQuestions',(req,res)=>{

    let question = req.body;
    questionModel.createNewQuestion(question);
    res.send("created successfully")
})

