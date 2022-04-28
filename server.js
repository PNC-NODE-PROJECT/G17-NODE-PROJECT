const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000
app.use(express.urlencoded({extended:true}))


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


