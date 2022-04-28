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
    let newQuestion={"id":uuidv4(),"question":question.question,"answer":question.answer,"correctAnswer":question.correctAnswer,"completed":false}
    questions.push(newQuestion);
    uploadQuestion(questions);
}




module.exports.getAllQuestions=getAllQuestions;
module.exports.createNewQuestion=createNewQuestion;
