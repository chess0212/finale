let xhr = new XMLHttpRequest;
let xhrAnswer = new XMLHttpRequest;
let xhrResponseSession = new XMLHttpRequest;
// let xhrres = new XMLHttpRequest;
let local = "http://127.0.0.1:8000";
// export const myVariable = session_id;

window.addEventListener('DOMContentLoaded', function () {

    let getform = document.getElementById('Question')
    let getbtn = document.getElementById('btn')
    let ques;
    let optionboxs;
    let idques;
    let session;
    let resUser = [];
    let ponseUser;
    let responseSessions;
    let responseId;
    let reponseType;
    let session_id;
    


    xhr.open('GET', `${local}/api/questions`);
    xhr.send();
    xhr.onload = function () {
        let responses = JSON.parse(xhr.response);

        console.log(responses);

        responses.forEach(response => {
            let divques = document.createElement('div')
            divques.setAttribute("class", "questions")
            getform.append(divques)
            idques = response.id
            ques = response
            let content = response.question_text
            let opt = response.options
            // console.log(opt)

            // console.log(divques);
            // console.log(ques);
            if (ques.question_type === "text") {
                let inputext = document.createElement('input')
                let para = document.createElement('p')
                para.innerHTML = ` Question ${idques}/20`
                let para2 = document.createElement('p')
                para2.innerHTML = `${content}`
                para.setAttribute("class","numquestion")
                para2.setAttribute("class" , "contente")
                inputext.setAttribute("name", "response_value");
                inputext.setAttribute("type", "text");
                inputext.setAttribute("maxlength", "255");
                inputext.setAttribute("cols", "30");
                // inputext.setAttribute("style", "height: 60px;");
                inputext.setAttribute("rows", "10");
                inputext.setAttribute("class", "text");
                inputext.setAttribute("data-questionId", idques);
                inputext.setAttribute("rows", "10")
                inputext.setAttribute("required", "required"); // Ajouter l'attribut required

                divques.append(para)
                divques.setAttribute("id","texti")
                divques.append(para2)
                divques.append(inputext)
                let questext = response
                let quescontent = response.quescontent
                console.log(ques.id)
                if (ques.question_type === 'text' && ques.id === 1) {
                    inputext.addEventListener('blur', function () {
                        let value = inputext.value.trim();
                        let isValidEmail = /\S+@\S+\.\S+/.test(value); // Utiliser une regex pour valider l'e-mail

                        if (!isValidEmail) {
                            // Afficher une alerte en cas d'adresse e-mail invalide
                            let errorElement = document.createElement('span');
                            errorElement.textContent = 'Veuillez entrer une adresse e-mail valide.';
                            errorElement.style.color = 'red';
                            divques.appendChild(errorElement);
                        }
                    });
                }


                // console.log(questext)
            }
            if (ques.question_type === "number") {
                let quesnum = response
                let para = document.createElement('p')
                para.innerHTML = ` Question ${idques}/20`
                let para2 = document.createElement('p')
                para2.innerHTML = `${content}`
                let inpunumber = document.createElement('input')
                para2.setAttribute("class" , "contente")
                para.setAttribute("class","numquestion")
                // divques.setAttribute("class","texti")
                inpunumber.setAttribute("type", "number", "min", "1", "max", "5")
                inpunumber.setAttribute("name", "response_value");
                inpunumber.setAttribute("data-questionId", idques);
                inpunumber.setAttribute("class", "number");
                divques.setAttribute("id","texti")

                inpunumber.addEventListener('blur', function () {
                    let value = inpunumber.value.trim();
                    let isValidNumber = /^[1-5]$/.test(value); // Utiliser une regex pour valider le nombre entre 1 et 5

                    if (!isValidNumber) {
                        let errorElement = document.createElement('span');
                        errorElement.textContent = 'Veuillez entrer un nombre entre 1 et 5.';
                        errorElement.style.color = 'red';
                        divques.appendChild(errorElement);
                    }
                });
                divques.append(para)
                divques.append(para2)
                divques.append(inpunumber)
                // console.log(quesnum)
            }
            if (ques.question_type === "radio") {
                let para = document.createElement('p')
                para.innerHTML = ` Question ${idques}/20`
                let para2 = document.createElement('p')
                para2.innerHTML = `${content}`
                divques.append(para)
                divques.append(para2)
                for (let i = 0; i < opt.length; i++) {
                    var checkbox = document.createElement('input');
                    var label = document.createElement('label')
                    label.innerHTML=`${opt[i]}`
                    checkbox.setAttribute("type", "radio");
                para.setAttribute("class","numquestion")
                para2.setAttribute("class" , "contente")
                    // checkbox.setAttribute("name", "response_value");
                    checkbox.setAttribute("class", "response_value");
                    checkbox.setAttribute("id", "labeoption");
                    checkbox.setAttribute("data-questionId", idques);
                    label.setAttribute("for",`${opt[i]}`)
                    label.setAttribute("id","labeoption")
                    checkbox.value = `${opt[i]}`;
                    checkbox.name = `option${idques}`;
                    divques.append(checkbox);
                    // checkbox.append(label)
                    // divques.appendChild(document.createTextNode(`${opt[i]}`));
                    divques.appendChild(label);
                    divques.appendChild(document.createElement('br'));
                }
                // console.log(opt.length);
                let quesbox = response
                optionboxs = response.options
                // console.log(optionboxs)
            }
        });

        getbtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Collecte des réponses
            let answers = [];

            // Récupérer les réponses des questions textuelles
            let textResponses = document.querySelectorAll('.questions input[type="text"]');
            textResponses.forEach(function (response) {
                let questionId = response.getAttribute('data-questionId');
                // console.log(questionId);
                let answer = response.value.trim();

                // Vérifier si la réponse est vide
                if (answer !== '') {
                    answers.push({
                        question_id: questionId,
                        response_value: answer
                    });
                }
            });

            // Récupérer les réponses des questions numériques
            let numberResponses = document.querySelectorAll('.questions input[type="number"]');
            numberResponses.forEach(function (response) {
                let questionId = response.getAttribute('data-questionId');
                let answer = response.value.trim();

                // Vérifier si la réponse est vide
                if (answer !== '') {
                    answers.push({
                        question_id: questionId,
                        response_value: answer
                    });
                }
            });

            // Récupérer les réponses des questions à choix multiple
            let checkboxResponses = document.querySelectorAll('.questions input[type="radio"]:checked');
            console.log(checkboxResponses);
            checkboxResponses.forEach(function (response) {
                let questionId = response.getAttribute('data-questionId');
                // console.log(questionId);
                    let answer = response.value;

                console.log(answer)

                // Vérifier si la réponse est vide
                if (answer !== '') {
                    answers.push({
                        question_id: questionId,
                        response_value: answer
                    });
                }
            });
            // Envoyer les réponses au serveur
            xhrAnswer.open('POST', `${local}/api/questions/responses`);
            xhrAnswer.setRequestHeader('Content-Type', 'application/json');
            xhrAnswer.send(JSON.stringify(answers));


            // console.log(answers)
            xhrAnswer.onload = function () {


                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhrAnswer.response);
                         session_id = response.session_id.session_id;
                         
                        // window.localStorage.setItem('session_id', `${response.session_id.session_id}`);
                        // session = localStorage.getItem('tokenName');
                        console.log(response); // Traitez la réponse du serveur comme souhaité
                        // window.location.href = '/HTML/reponseUser.html';// Récupérez l'URL de destination
                        var url = "/reponseUser.html?session_id=" + session_id;

                        // Créez le contenu de la modal avec le message et le lien
                        var message = "Votre formulaire a été soumis avec succès!";
                        var modalContent = `

    <div class="modal-body">
        <p class="message">${message}</p>
        <p><a id='lienuser' href="${url}">Voir vos réponses à traver ce lien merci ${url}</a></p>
    </div>  
`;

                        // Ajoutez la modal au DOM
                        var modalElement = $('<div class="modal fade" tabindex="-1" role="dialog"></div>');
                        modalElement.html(modalContent);
                        $('body').append(modalElement);


                        // Affichez la modal
                        // modalElement.modal('show');
                        let lienUser = document.getElementById("lienuser")
                        console.log(lienUser);
                      
                    } else {
                        console.error('Erreur lors de la requête :', xhr.status);
                    }
                }


       
            };
        });


    }


   // Get the video player element
   const videoElement = document.getElementById('video');

   // Function to loop the video
   function loopVideo() {
     if (videoElement.currentTime >= videoElement.duration) {
       videoElement.currentTime = 0;
     }
     requestAnimationFrame(loopVideo);
   }
 
   // Start looping the video when it's loaded
   videoElement.addEventListener('loadeddata', () => {
     loopVideo();
   });

})
