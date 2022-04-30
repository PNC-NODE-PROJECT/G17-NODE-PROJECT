

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
    element.style.display = none;
}

function hideElement (element){
    element.style.display = block;
}

function addQuestion(event) {
    event.preventDefault();
    let question = inputQuestion.value;
    let a = inputAnswerA.value;
    let b = inputAnswerB.value;
    let c = inputAnswerC.value;
    let d = inputAnswerD.value;
    let score = inputScore.value;
    axios.post("/api/createQuestion", { question: question, answer: {a,  b, c, d },score:score }).then(refreshDom);
    
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

function editQuestion(event) {
    event.preventDefault();
    if (event.target.class === "edit") {
        let id = event.target.parentElement.id;
        console.log(id);
            axios.patch("/api/editQuestions/" + id).then((res) => {
                console.log(res)
            })
            refreshDom();
        }
}
refreshDom();
const inputQuestion = document.querySelector('#question');
const inputAnswerA = document.querySelector("#answerA​​​​​​​​");
const inputAnswerB = document.querySelector("#answerB");
const inputAnswerC = document.querySelector("#answerC");
const inputAnswerD = document.querySelector("#answerD");
const inputScore = document.querySelector("#score");
const btnSubmit = document.getElementById("submit_button")

document.body.addEventListener("click",editQuestion);
document.body.addEventListener("click", removeQuestion);
btnSubmit.addEventListener("click", addQuestion);
