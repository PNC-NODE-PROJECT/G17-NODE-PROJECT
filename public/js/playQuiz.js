// get data ---------------------

var data =[];
var historyAnser = [];
axios.get('/api/getQuestions').then(response => {
    data = response.data;
    getData(data);
})

// CREATE ELEMENT FOR DISPLAYQUIZ
function getData(data) {
    for (let index = 0; index < data.length; index++) {


        let container = document.createElement('div');
        container.className = document.querySelector('.quiz-container');
        let quiz_header = document.createElement('div');
        quiz_header.className =document.querySelector('quiz-header');
        let question = document.createElement('h2');
        question.className = document.querySelector('question');
        // appendChild---------------
        question.appendChild(quiz_header);
        quiz_header.appendChild(container);
    }
}


const quiz= document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
var allQuestionScore = 0;
let currentQuiz = 0
let score = 0



loadQuiz()
// CREATE FUNCTION FOR DISPLAYQUIZ
function loadQuiz() {
    deselectAnswers()
    axios.get('/api/getQuestions').then(response => {
        data = response.data
        let currentQuizData = data[currentQuiz]
        questionEl.textContent = "Question : "+ currentQuizData.question 
        a_text.textContent = 'a, ' + currentQuizData.answer.a
        b_text.textContent = 'b, ' + currentQuizData.answer.b
        c_text.textContent = 'c, ' + currentQuizData.answer.c
        d_text.textContent = 'd, ' + currentQuizData.answer.d
    })
    
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    axios.get('/api/getQuestions').then(response => {
        data = response.data;
        const answer = getSelected()
        allQuestionScore+=parseInt(data[currentQuiz].score)
        if(answer) {
           if(answer === data[currentQuiz].correctAnswer) {
               score+= parseInt(data[currentQuiz].score)
           }
    
           let newObj = {};
           newObj.correct_answer = data[currentQuiz].correctAnswer;
           console.log(data[currentQuiz].correctAnswer);
           newObj.user_answer = answer;
           historyAnser.push(newObj);
           currentQuiz++
    
           if(currentQuiz < data.length) {
               loadQuiz()
           } else {
               console.log(historyAnser);
               let user_answer = "";
               let trueAnswer = "";
               for(let i = 0; i < historyAnser.length; i++){
                   if(i<historyAnser.length - 1){
                       user_answer += historyAnser[i].user_answer + ",";
                       trueAnswer += data[i].correctAnswer + ",";
                   }else{
                    user_answer += historyAnser[i].user_answer;
                    trueAnswer += data[i].correctAnswer;
                   }
               }
               quiz.innerHTML = `
               <h2>You answered ${parseInt(score)}/${parseInt(allQuestionScore)} scores</h2>
               <p>list of what you have answer ${user_answer} and the answer of each question are ${trueAnswer}</p>
               <button onclick="location.reload()">Reload</button>
               `
           }
        }
    })
})

function showFirstPage(){
    document.querySelector('.container').style.display="block";
    document.querySelector('.container').style.display="flex";
    document.querySelector('.container').style.justifyContent="space-around";
    document.querySelector('.navbar').style.display="none";
    document.body.style.backgroundImage ="url('https://cdn.pixabay.com/photo/2022/03/15/08/23/school-supplies-7069761_1280.jpg')";

}
