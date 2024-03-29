async function getJSON(){
    questionsAnswears = await (await fetch("./qa.json")).json();
}

$( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
    });
});

$( function() {
    $( '#pws' ).tooltip();
});

function startTest(){
    dialogBox.innerHTML = "Aby zdać test musisz prawidłowo odpowiedzieć na 7 z 10 pytań.<br>Powodzenia!!!";
    dialogBox.title = "Wymogi";
    $( "#dialog" ).dialog( "open" );
    startButton.style.display="none";
    test.style.display="block";
    questionEnumerator=document.getElementById("enumeration");
    question=document.getElementById("question");
    answear1=document.getElementById("answ1");
    answear2=document.getElementById("answ2");
    answear3=document.getElementById("answ3");
    setNextQuestion();
}

function checkQuestion(){
    let correct = questionsAnswears.questionsAndAnswears[sessionStorage.numberOfQuesion-1].correct;
    let choosen = document.querySelector('input[name="answ"]:checked');
    if(correct == choosen.value)
    {
        sessionStorage.numerOfCorrectAnswears++;
    }
    choosen.checked=false;
}

function setNextQuestion(){
        sessionStorage.numberOfQuesion++;
        foundMistake = false;
        let numberOfQuesion=sessionStorage.numberOfQuesion;
        questionEnumerator.innerHTML="Pytanie nr " + numberOfQuesion;
        answear1.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear1;
        answear2.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear2;
        question.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].question;
        answear3.innerHTML=questionsAnswears.questionsAndAnswears[numberOfQuesion-1].answear3;
}

function nextQuestion(){
    if(sessionStorage.numberOfQuesion<10)
    {
        checkQuestion();
        setNextQuestion();
    }
    else
    {
        finishTest();
    }
    if(document.getElementById("mistake"))
    {
        document.getElementById("mistake").remove();
    }
}

function finishTest(){
    checkQuestion();
    localStorage.numberOfMadeTests++;
    dialogBox.title="Wyniki Testu";
    if(sessionStorage.numerOfCorrectAnswears>=7)
    {
        localStorage.numberOfPassedTests++;
        dialogBox.innerHTML = "Brawo!!!<br>Test zdany. Twój wynik to:<br>"+sessionStorage.numerOfCorrectAnswears+"/"+sessionStorage.numberOfQuesion;
    }
    else
    {
        dialogBox.innerHTML = "Niestety, tym razem się nie udało.<br>Twój wynik to:<br>"+sessionStorage.numerOfCorrectAnswears+"/"+sessionStorage.numberOfQuesion;
    }
    $( "#dialog" ).dialog( "open" );
    sessionStorage.numberOfQuesion=0;
    sessionStorage.numerOfCorrectAnswears=0;
    test.style.display="none";
    startButton.style.display="block";
    showProgress();
    if(document.getElementById("mistake"))
    {
        document.getElementById("mistake").remove();
    }
}

function showProgress(){
    stats.innerHTML=localStorage.numberOfPassedTests+"\\"+localStorage.numberOfMadeTests;
    if(localStorage.numberOfMadeTests!=0)
    {
        stats.innerHTML=score.innerHTML+"<br>"+ localStorage.numberOfPassedTests/localStorage.numberOfMadeTests*100+"%";
    }
}

function mistake(){
    if(!foundMistake)
    {
        let para=document.createElement("p");
        para.setAttribute("id","mistake");
        let text = document.createTextNode("Aby zgłosić błąd, musisz być zalogowany.");
        para.appendChild(text);
        let element = document.getElementById("testWindow");
        element.append(para);
        foundMistake = true;
    }
}

let questionsAnswears;
let questionEnumerator;
let question;
let answear1;
let answear2;
let answear3;
let foundMistake=false;

let stats=document.getElementById("score");
let test=document.getElementById("test");
let startButton = document.getElementById("startTestBtn");
let dialogBox=document.getElementById("dialogBoxText");

document.getElementById("noscript").style.visibility = "visible";

getJSON()

if(window.localStorage){
    if(!localStorage.numberOfMadeTests)
    {
        localStorage.numberOfMadeTests=0;
        localStorage.numberOfPassedTests=0;
    }
    showProgress();
}

if(window.sessionStorage)
{
    if(!sessionStorage.numberOfQuesion)
    {
        sessionStorage.numberOfQuesion=0;
        sessionStorage.numerOfCorrectAnswears=0;
    }
}
