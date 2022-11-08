function register(){
    
}

function startTest(){
    var startButton = document.getElementById("startTestBtn");
    startButton.style.display="none";
    //parse to json from json file //TODO
    questionEnumerator=document.getElementById("enumeration");
    question=document.getElementById("question");
    answear1=document.getElementById("answ1");
    answear2=document.getElementById("answ2");
    answear3=document.getElementById("answ3");
    nextQuestion();
}

function nextQuestion(){
    numberOfQuesion++;
    console.log(numberOfQuesion);
    questionEnumerator.innerHTML="Pytanie nr " + numberOfQuesion;
    question.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].question;           //"tutaj bedzie pytanie nr " + numberOfQuesion; //TODO
    answear1.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear1;             //"a) " + "tutaj odpowiedz a";
    answear2.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear2;             //"b) " + "tutaj odpowiedz b";
    answear3.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear3;             //"c) " + "tutaj odpowiedz c";  
}

function finishTest(){
    console.log(questionsAnswears.questionsAndAnswears[0].question);
    showProgress();
}

function showProgress(){
    stats.innerHTML=localStorage.numberOfPassedTests+"\\"+localStorage.numberOfMadeTests;
    if(localStorage.numberOfMadeTests!=0)
    {
        stats.innerHTML=score.innerHTML+"<br>"+localStorage.numberOfPassedTests/localStorage.numberOfMadeTests+"%";
    }
    
}

var questionEnumerator;
var question;
var answear1;
var answear2;
var answear3;
var numberOfQuesion=0;

var stats=document.getElementById("score");

console.log(stats);


if(window.localStorage){
    if(!localStorage.numberOfMadeTests)
    {
        localStorage.numberOfMadeTests=0;
        localStorage.numberOfPassedTests=0;
    }
    showProgress();
}

// var questionsAnswears={
//     "questionsAndAnswears":
//     [
//         {
//             "question":"pytanie testowe",
//             "answear1":"tutaj a",
//             "answear2":"tutaj b",
//             "acorrect":"tutaj c"
//         },
//         {
//             "question":"pytanie testowe",
//             "answear1":"tutaj a",
//             "answear2":"tutaj b",
//             "acorrect":"tutaj c"
//         }
//     ]
    
// };

// import questionsAnswears from './qa.json' assert{ type:'JSON'};

// let questionsAnswears = (await fetch("./qa.json")).json();

let questionsAnswears

async function gett(){
    questionsAnswears = await (await fetch("./qa.json")).json();
}

gett();



// var questionsAnswears;
// fetch("./qa.json")
// .then(async (response) => questionsAnswears = await response.json());


// setTimeout(() => {
//     console.log(questionsAnswears);    
// }, 1000);
// require('./qa.json');

// console.log(null == 0);
// console.log(null > 0);
// console.log(null >= 0);
