const express = require("express");
const router = express.Router();


const questionModel = require('../models/quiz_module');



router.get('/getQuestions',(req,res)=>{
    let getAllQuestions = questionModel.getAllQuestions();
    res.send(getAllQuestions);
})

router.post('/createQuestion',(req,res)=>{

    let question = req.body;
    questionModel.createNewQuestion(question);
    res.send("created successfully")
})

router.delete('/removeQuestions/:id',(req,res)=>{

    let id = req.params.id;
    questionModel.deleteQuestion(id);
    res.send("deleted successfully")
})

router.patch('/editQuestions',(req,res)=>{
    let newInfo = req.body;
    let updated= questionModel.updateQuestion(newInfo);
    let message ={};
    if(updated){
    message = {message:"update successful"};
    }else{
        message = {message:"date invalid"};

    }
    res.send(message);
})

module.exports = router;