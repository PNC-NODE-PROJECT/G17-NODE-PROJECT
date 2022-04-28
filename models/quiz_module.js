const fs = require("fs");
const PATH = "./data/questionQuiz.json";

const { v4: uuidv4 } = require("uuid");
function load(){
    return JSON.parse(fs.readFileSync(PATH))
}

function save(data){
    fs.writeFileSync(PATH,JSON.stringify(data));
}

function getAllQuestions(){
    return load();
}

function createNewQuestion(question){
    let questions = load();
    let newQuestion={"id":uuidv4(),"question":question.question,"answer":question.answer,"correctAnswer":question.correctAnswer,"completed":false}
    questions.push(newQuestion);
    save(questions);
}




module.exports.getAllQuestions=getAllQuestions;
module.exports.createNewQuestion=createNewQuestion;
