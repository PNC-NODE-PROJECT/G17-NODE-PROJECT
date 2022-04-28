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


module.exports.getAllQuestions=getAllQuestions;
