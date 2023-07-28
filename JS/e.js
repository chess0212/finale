let xhrResponseSession = new XMLHttpRequest;
let localsession = "http://127.0.0.1:8000";


let xhr = new XMLHttpRequest;
let xhrAnswer = new XMLHttpRequest;
let local = "http://127.0.0.1:8000";
window.addEventListener('DOMContentLoaded',function () {
    
    let getform = document.getElementById('Question')
    let getbtn = document.getElementById('btn')
    let ques;
    let optionboxs;
    let idques;
    let session;
    let resUser = [];
    let ponseUser;
    let responseSessions;
    let responseId ;
    let reponseType ;
    let question

    const currentURL = window.location.search;
    const urlParams = new URLSearchParams(currentURL);
    const sessionId = urlParams.get('session_id');
    
console.log(sessionId);
    
     
    xhrResponseSession.open('get',`${localsession}/api/response/user/${sessionId}`)
    xhrResponseSession.send()
    xhrResponseSession.onload = function() {
        responseSessions = JSON.parse(xhrResponseSession.response);
        responseSessions.sort((a, b) => a.question_id - b.question_id);

        responseSessions.forEach(responseSession => {
            ponseUser = responseSession.response_value;
            responseId = responseSession.question_id;
            reponseType = responseSession.question_type;
            question = responseSession.question_text;
    
            // Créer un div pour chaque question
            let questionDiv = document.createElement('div');
            questionDiv.setAttribute('class', 'question-block');
    
            // Créer un élément pour afficher le texte de la question
            let questionText = document.createElement('p');
            questionText.innerHTML = `Question ${responseId}: ${question}`;
            questionDiv.appendChild(questionText);
    
            // Créer un élément pour afficher la réponse de l'utilisateur
            let userResponse = document.createElement('p');
            userResponse.innerHTML = `Réponse: ${ponseUser}`;
            questionDiv.appendChild(userResponse);
    
            // Ajouter le bloc de question au formulaire
            getform.appendChild(questionDiv);
        });
    };
   

    
})
