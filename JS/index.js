let xhr = new XMLHttpRequest;
let xhrAnswer = new XMLHttpRequest;
let xhrResponseSession = new XMLHttpRequest;
let local = "http://127.0.0.1:8000";

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
                    checkbox.setAttribute("class", "response_value");
                    checkbox.setAttribute("id", "labeoption");
                    checkbox.setAttribute("data-questionId", idques);
                    label.setAttribute("for",`${opt[i]}`)
                    label.setAttribute("id","labeoption")
                    checkbox.value = `${opt[i]}`;
                    checkbox.name = `option${idques}`;
                    divques.append(checkbox);
                    divques.appendChild(label);
                    divques.appendChild(document.createElement('br'));
                }
                let quesbox = response
                optionboxs = response.options
            }
        });

        getbtn.addEventListener('click', function (e) {
            e.preventDefault();
        
            // Vérifier si le formulaire est valide
            let isFormValid = true;
        
            // Collecte des réponses
            let answers = [];
        
            // Récupérer les réponses des questions textuelles
            let textResponses = document.querySelectorAll('.questions input[type="text"]');
            textResponses.forEach(function (response) {
                let questionId = response.getAttribute('data-questionId');
                let answer = response.value.trim();
        
                // Vérifier si la réponse est vide
                if (answer !== '') {
                    answers.push({
                        question_id: questionId,
                        response_value: answer
                    });
                } else {
                    // Marquer le formulaire comme invalide si un champ est vide
                    isFormValid = false;
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
                } else {
                    // Marquer le formulaire comme invalide si un champ est vide
                    isFormValid = false;
                }
            });
        
            // Récupérer les réponses des questions à choix multiple
            let checkboxResponses = document.querySelectorAll('.questions input[type="radio"]:checked');
            checkboxResponses.forEach(function (response) {
                let questionId = response.getAttribute('data-questionId');
                let answer = response.value;
        
                // Vérifier si la réponse est vide
                if (answer !== '') {
                    answers.push({
                        question_id: questionId,
                        response_value: answer
                    });
                } else {
                    // Marquer le formulaire comme invalide si un champ est vide
                    isFormValid = false;
                }
            });
        
            // Si le formulaire est valide, envoyer les réponses au serveur
            if (isFormValid) {
                xhrAnswer.open('POST', `${local}/api/questions/responses`);
                xhrAnswer.setRequestHeader('Content-Type', 'application/json');
                xhrAnswer.send(JSON.stringify(answers));
        
                xhrAnswer.onload = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            let response = JSON.parse(xhrAnswer.response);
                         session_id = response.session_id.session_id;
                         
                        console.log(response); // Traitez la réponse du serveur comme souhaité
                        var url = "/reponseUser.html?session_id=" + session_id;

                        // Créez le contenu de la modal avec le message et le lien
                        var message = "Votre formulaire a été soumis avec succès!";
                        var modalContent = `

    <div class="modal-body">
        <p class="message">${message}</p>
        <p><a id='lienuser' href="${url}">Voir vos réponses à traver ce lien merci ${url}</a></p>
    </div>  
`;

                        var modalElement = $('<div class="modal fade" tabindex="-1" role="dialog"></div>');
                        modalElement.html(modalContent);
                        $('body').append(modalElement);


                        
                        let lienUser = document.getElementById("lienuser")
                        console.log(lienUser);
                        } else {
                            console.error('Erreur lors de la requête :', xhr.status);
                        }
                    }
                };
            } else {
                // Afficher un message d'erreur indiquant que le formulaire est invalide
                alert('Le formulaire est incomplet. Veuillez remplir tous les champs avant de soumettre.');
            }
        });
        


    }


   const videoElement = document.getElementById('video');

   function loopVideo() {
     if (videoElement.currentTime >= videoElement.duration) {
       videoElement.currentTime = 0;
     }
     requestAnimationFrame(loopVideo);
   }
 
   videoElement.addEventListener('loadeddata', () => {
     loopVideo();
   });

})
