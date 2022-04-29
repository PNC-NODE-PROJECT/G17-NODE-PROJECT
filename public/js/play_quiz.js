
// hide show button

// let con=document.querySelector('.container')
// console.log(con);
// con.style.display = 'none';

// fack data 
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

let quizApp = document.querySelector('.quizApp');
let question = document.querySelector('.question');
let answer = document.querySelectorAll('.answer');
let text_a = document.querySelector('#text_a');
let text_b = document.querySelector('#text_b');
let text_c = document.querySelector('#text_c');
let btnSubmit = document.querySelector('.submit');

let quizData = 0;
let score = 0;

playQuiz();

function playQuiz() {

    selectAnswer();

    let currentData = data(quizData)
    question.innerText = currentData.question;
    text_a.innerText = currentData.a;
    text_b.innerText = currentData.b;
    text_c.innerText = currentData.c;

}

function playQuiz() {
    answer.forEach(answer => answer.checked = false);
}

function selected () {
    let answer;
    answer.forEach(answer => {
        if (answer.checked) {
            answer = answer.id
        }
    }) 
    return answer;
};

btnSubmit.addEventListener('click', () => {
    let answer = selected();
    if(answer) {
        if(answer === data[quizData].correct) {
            score++
        }
        quizData++

        if(quizData < data.length) {
            playQuiz()
        }else {

        }
    }
})
