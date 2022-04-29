// fake data 
let data =[
    {
        question:"What does CSS stand for?",
        a: "Cascading Style Sheets",
        b: "Cascading Simple Sheets",
        c:"Central Style Sheets",
        correct:"a",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markdown Language",
        b: "Hyperloop Machine Language",
        c: "Hypertext Markup Language",
        correct:"c",
    },
    {
        question: "What does URL stand for?",
        a: "Place to search something",
        b: "Uniform Resource Locator.",
        c: "rearch tool",
        correct:"b",
    },
];

function getData() {
    axios.get('http://localhost:3000/api/getQuestions').then(response => {
    let getData = response.data;
    refreshDom(getData);
});
}


<<<<<<< HEAD:public/questions/script.js
=======

function refreshDom(getData) {
    for (let index = 0; index < getData.length; index++) {
        let container = document.createElement('div');
        container.className = document.querySelector('.quiz-container');
        let quiz_header = document.createElement('div');
        quiz_header.className =document.querySelector('quiz-header');
        let question = document.createElement('h2');
        question.className = document.querySelector('question');


        // appendChild---------------
        question.appendChild(quiz-header);
        quiz_header.appendChild(container);
    }
};

const quizData = []
axios.get('http://localhost:3000/api/getQuestions').then(response => {
    let quizData = response.data;
    console.log(quizData);
});

>>>>>>> dd929b0ca3aa0fa60c499742467f0a6f5fa7e082:front_end/questions/script.js
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const submitBtn = document.getElementById('submit')

function displayQuestion(quizData) {
    for(let question of quizData){
        
    }
}

function refreshDom(){
    axios.get('/api/getQuestions').then(response => {
        quizData = response.data;
        displayQuestion(quizData)
        console.log(quizData);
    });
}


let currentQuiz = 0
let score = 0

<<<<<<< HEAD:public/questions/script.js
// loadQuiz()
=======
// let getData = getdataFromback()

// function getdataFromback(){
//     axios.get("/",(req,res) =>{
//         let date = res.data;
//     })
// }


loadQuiz()
>>>>>>> dd929b0ca3aa0fa60c499742467f0a6f5fa7e082:front_end/questions/script.js


// function loadQuiz() {

<<<<<<< HEAD:public/questions/script.js
//     deselectAnswers()
    
//     // const currentQuizData = quizData[currentQuiz]

//     questionEl.innerText = currentQuizData.question
//     a_text.innerText = currentQuizData.a
//     b_text.innerText = currentQuizData.b
//     c_text.innerText = currentQuizData.c
//     d_text.innerText = currentQuizData.d
// }
=======
    const currentQuizData = data[currentQuiz]

    questionEl.textContent = currentQuizData.question
    console.log(currentQuizData);
    a_text.textContent = currentQuizData.a
    b_text.textContent = currentQuizData.b
    c_text.textContent = currentQuizData.c
    
}
>>>>>>> dd929b0ca3aa0fa60c499742467f0a6f5fa7e082:front_end/questions/script.js

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
    const answer = getSelected()
    if(answer) {
       if(answer === data[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < data.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${data.length} questions correctly</h2>
           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})

