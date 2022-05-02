const fs = require("fs");
const PATH = "./data/questionQuiz.json";

const { v4: uuidv4 } = require("uuid");
function getListOfQuestions(){
    return JSON.parse(fs.readFileSync(PATH))
}

function uploadQuestion(data){
    fs.writeFileSync(PATH,JSON.stringify(data));
}

function getAllQuestions(){
    return getListOfQuestions();
}

function createNewQuestion(question){
    let questions = getListOfQuestions();
    let newQuestion={"id":uuidv4(),"question":question.question,"answer":question.answer,"correctAnswer":question.correctAnswer,"score":question.score,"completed":false}
    questions.push(newQuestion);
    uploadQuestion(questions);
}


function deleteQuestion(id){
    let questions = getListOfQuestions();
    let index = questions.findIndex(question=>question.id===id);
    questions.splice(index,1);
    uploadQuestion(questions)
}

function updateQuestion(newInfo){
    let questions = getListOfQuestions();
    let id =newInfo.id;
    let isValid = false;
    let index = questions.findIndex(question=>question.id===id);
    if(index>=0){
        let question = questions[index];
        question.question=newInfo.question;
        question.answer.a=newInfo.answer.a;
        question.answer.b=newInfo.answer.b;
        question.answer.c=newInfo.answer.c;
        question.answer.d=newInfo.answer.d;
        question.correctAnswer=newInfo.correctAnswer;
        question.score = newInfo.score;
        question.completed = true;
        isValid =true;
        uploadQuestion(questions);
        return 'upload success'
    }else{
        index =-1;
    }
    return isValid;
}

// function get questions ----------------------------------------------------
function getOneQuestion(id){
    console.log(id);
    
    let allQuestion = getAllQuestions();
    for(let i = 0; i < allQuestion.length; i++){
        if(allQuestion[i].id === id){
            return allQuestion[i];
        }
    }
    return 'Not found this id'
}

module.exports.getAllQuestions=getAllQuestions;
module.exports.createNewQuestion=createNewQuestion;
module.exports.deleteQuestion = deleteQuestion;
module.exports.updateQuestion = updateQuestion;
module.exports.getOneQuestion = getOneQuestion;