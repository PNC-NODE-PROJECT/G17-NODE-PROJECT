


// -----------------------input data------------------------
let update_question = document.querySelector('#questions');
let update_scores = document.querySelector('#scores');
let update_ansA = document.querySelector('#ansA');
let update_ansB = document.querySelector('#ansB');
let update_ansC =document.querySelector('#ansC');
let update_ansD = document.querySelector('#ansD');
let update_correctAnswers = document.querySelector('#correctAnswers');


const inputQuestion = document.querySelector('#question');
const inputAnswerA = document.querySelector('#answerA');
const inputAnswerB = document.querySelector("#answerB");
const inputAnswerC = document.querySelector("#answerC");
const inputAnswerD = document.querySelector("#answerD");
const inputScore = document.querySelector("#score");
const answerOfQuestion = document.querySelector("#correctAnswer");
const btnSubmit = document.getElementById("submit_button");

// -------------------create function and create element to html-------------------
function displayQuestion(questions) {

    let displayQuestion = document.querySelector(".displayQuestion");
    displayQuestion.remove();
    let NewdisplayQuestion = document.createElement("div");
    NewdisplayQuestion.className = "displayQuestion";
    let number = 0;
    for (let question of questions) {
        number += 1;
        console.log(number)

        let makeQuestion = document.createElement("div");
        makeQuestion.className = "makeQuestion";
        
        let removeQuestion = document.createElement("div");
        removeQuestion.className = "deleteQuestion";
        

        let titleQuestion = document.createElement("form");
        titleQuestion.className = "titleQuestion";
        titleQuestion.textContent = number + ". " + question.question;

        let score = document.createElement("span");
        score.textContent = "Score : "+ question.score;

        let imgRemove = document.createElement("img");
        imgRemove.src = "../image/remove.png";
        imgRemove.class = "delete";

        let editQuestions = document.createElement("img");
        editQuestions.src = "../image/edit.png";
        editQuestions.class = "edit";

        let span = document.createElement("div");
        span.className = "bgScore";
        span.append(score);
        span.append(imgRemove);
        span.append(editQuestions);
        span.id = question.id;
        removeQuestion.append(span);
        removeQuestion.append(titleQuestion);

        let radioAnswer = document.createElement("div");
        radioAnswer.className = "redioAnswer";
        let listOfAnswer = question.answer;

        let answer1 = document.createElement("input");
        answer1.type = "radio";
        answer1.id = "1";
        answer1.className = "answer";
        let labelAnswerA = document.createElement("label");
        labelAnswerA.textContent = listOfAnswer.a;

        let answer2 = document.createElement("input");
        answer2.type = "radio";
        answer2.id = "2";
        answer2.className = "answer";
        let labelAnswerB = document.createElement("label");
        labelAnswerB.textContent = listOfAnswer.b;

        let answer3 = document.createElement("input");
        answer3.type = "radio";
        answer3.id = "2";
        answer3.className = "answer";
        let labelAnswerC = document.createElement("label");
        labelAnswerC.textContent = listOfAnswer.c;

        let answer4 = document.createElement("input");
        answer4.type = "radio";
        answer4.id = "2";
        answer4.className = "answer";
        let labelAnswerD = document.createElement("label");
        labelAnswerD.textContent = listOfAnswer.d;

        radioAnswer.append(answer1);
        radioAnswer.append(labelAnswerA);
        radioAnswer.append(answer2);
        radioAnswer.append(labelAnswerB);
        radioAnswer.append(answer3);
        radioAnswer.append(labelAnswerC);
        radioAnswer.append(answer4);
        radioAnswer.append(labelAnswerD);

        makeQuestion.append(removeQuestion);
        makeQuestion.append(radioAnswer);
        NewdisplayQuestion.append(makeQuestion);
        console.log(NewdisplayQuestion);
        document.body.append(NewdisplayQuestion);
    }

}
// -------------------------------------function get data from backend----------------
function refreshDom() {
    axios.get("/api/getQuestions").then((res) => {
        let questions = res.data;
        displayQuestion(questions);
        console.log(questions);
        
    })
}

//  CREAE FUNCTION FOR HIDE AND SHOW ELEMENT
function hideElement (element){
    element.style.display = "none";
}

function showElement (element){
    element.style.display = "block";
}

function addQuestion(event) {
    event.preventDefault();
    let question = inputQuestion.value;
    let a = inputAnswerA.value;
    let b = inputAnswerB.value;
    let c = inputAnswerC.value;
    let d = inputAnswerD.value;
    let correctAnswer = answerOfQuestion.value;
    let score = inputScore.value;
    axios.post("/api/createQuestion", { question: question, answer: {a,  b, c, d },correctAnswer : correctAnswer,score:score }).then(()=>{

        location.reload();
        refreshDom();
    }
        );
    
}

function removeQuestion(event) {
    event.preventDefault();
    if (event.target.class === "delete") {
        let id = event.target.parentElement.id;
        console.log(id);
        axios.delete("/api/removeQuestions/" + id).then((res) => {
                console.log(res)
        })
            refreshDom();
        }
}

let questionsId =0;

function editQuestion(event) {
    event.preventDefault();

    if (event.target.class === "edit") {
        let id = event.target.parentElement.id;
      
        questionsId=id;
        showElement(dom_edit);
        hideElement(document.getElementsByClassName('addQuestion')[0]);
        getQuestionsById(id);
        // sp testing
            // axios.patch("/api/editQuestions",).then((res) => {
            //     console.log(res)
            // })
            // refreshDom();
        }
}
function getPatch() {
    let data = {};
    let answer = {};
    data.question = update_question.value;
    answer.a = update_ansA.value;
    answer.b = update_ansB.value;
    answer.c = update_ansC.value;
    answer.d = update_ansD.value;
    data.answer = answer;
    data.correctAnswer = update_correctAnswers.value;
    data.score = update_scores.value;
    data.id = questionsId;
    axios.patch("/api/editQuestions/"+questionsId, data).then((res) => {
        console.log(res)
        location.reload();
    })
}
// ----------------------------------sp testing update--------------------
function getQuestionsById(id){
    
    axios.get('/api/getOneQuestion/'+id).then((result) => {
        // console.log(result.data);
        let quest = result.data;
        update_question.value=quest.question;
        update_scores.value=quest.score;
        update_ansA.value=quest.answer.a;
        update_ansB.value=quest.answer.b;
        update_ansC.value=quest.answer.c;
        update_ansD.value=quest.answer.d;
        update_correctAnswers.value=quest.correctAnswer;
    }).catch((err) => {
        console.log(err);
    });
}

function updateAQuestion(e){
    e.preventDefault();
    let body={ question: update_question.value, answer: {a:update_ansA.value,  b:update_ansB.value, c:update_ansC.value, d:update_ansD.value },correctAnswer : update_correctAnswers.value,score:update_scores.value };
    axios.patch("/api/editQuestions/" + questionsId,body).then((res) => {
        console.log(res)
    })
    hideElement(dom_edit);
    showElement(document.getElementsByClassName('addQuestion')[0]);
    refreshDom();
}
// ------------------------------sp testing--------------------
refreshDom();

// sp testing
const dom_edit=document.querySelector('#editQuestion');
let btn_update=document.querySelector('#edit_button');
btn_update.addEventListener('click',getPatch);
hideElement(dom_edit);
// sp testing


document.body.addEventListener("click",editQuestion);
document.body.addEventListener("click", removeQuestion);
btnSubmit.addEventListener("click", addQuestion);
