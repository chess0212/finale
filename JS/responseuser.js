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

    const currentURL = window.location.search;
    const urlParams = new URLSearchParams(currentURL);
    const sessionId = urlParams.get('session_id');
    
console.log(sessionId);
    
     
    xhrResponseSession.open('get',`${localsession}/api/response/user/${sessionId}`)
    xhrResponseSession.send()
    xhrResponseSession.onload=function () {
      
       responseSessions = JSON.parse(xhrResponseSession.response);
           console.log(responseSessions)

           responseSessions.forEach(responseSession => {
            ponseUser = responseSession.response_value
            responseId = responseSession.question_id
            reponseType= responseSession.question_type
           console.log(reponseType)
           resUser.push(ponseUser)
        });
        xhr.open('GET',`${local}/api/questions`);
        xhr.send();
        xhr.onload=function () {
            let responses = JSON.parse(xhr.response);
            
            // console.log(responses);
            
            responses.forEach(response => {
                let divques = document.createElement('div')
                divques.setAttribute("class" , "questions")
                getform.append(divques)
                idques = response.id
                ques = response
                let content = response.question_text
                let opt = response.options
                // console.log(opt)
                
                // console.log(divques);
                // console.log(ques);
                if (ques.question_type=== "text") {
                    let inputext = document.createElement('input')
                    let para = document.createElement('p')
                    para.innerHTML=` Question ${idques}/20`
                    let para2 = document.createElement('p')
                    para.setAttribute("class","numquestion")
                para2.setAttribute("class" , "contente")
                    para2.innerHTML=`${content}`
                    inputext.setAttribute("name","response_value");
                    inputext.setAttribute("type","text");
                    inputext.setAttribute("maxlength","255" );
                    inputext.setAttribute( "cols","30" );
                    inputext.setAttribute(  "style","height: 60px;" );
                    inputext.setAttribute(   "rows","10");
                   
                       inputext.setAttribute("class","text"); 
                       inputext.setAttribute("data-questionId",idques); 
                       inputext.setAttribute(  "rows","10")
                       divques.append(para)
                       divques.append(para2)
                       divques.append(inputext)
                       let questext = response
                       let quescontent = response.quescontent
       
                      inputext.value = responseSessions.find(responseSession=>responseSession.question_id === idques ).response_value
                   }
                   if (ques.question_type === "number") {
                       let quesnum = response
                       let para = document.createElement('p')
                       para.innerHTML=` Question ${idques}/20`
                       let para2 = document.createElement('p')
                       para.setAttribute("class","numquestion")
                para2.setAttribute("class" , "contente")
                       para2.innerHTML=`${content}`
                       let inpunumber = document.createElement('input')
                       inpunumber.setAttribute("type","number" ,"min","1" ,"max","5")
                       inpunumber.setAttribute("name","response_value"); 
                       inpunumber.setAttribute("data-questionId",idques); 
                       inpunumber.setAttribute("class", "number");
    
                       let questionResponse = resUser.find(responseSessions => responseSessions.question_id === idques);
                       if (questionResponse) {
                           inpunumber.value = questionResponse.response_value;
                       }
                       divques.append(para)
                       divques.append(para2)
                       divques.append(inpunumber)
                       inpunumber.value = responseSessions.find(responseSession=>responseSession.question_id === idques ).response_value

                   } 
                   if (ques.question_type === "radio") {
                    let para = document.createElement('p');
                    para.innerHTML = ` Question ${idques}/20`;
                
                    let para2 = document.createElement('p');
                    para2.innerHTML = `${content}`;
                    divques.append(para);
                    divques.append(para2);
                
                    for (let i = 0; i < opt.length; i++) {
                        var label = document.createElement('label');
                        var checkbox = document.createElement('input');
                        label.innerHTML = `${opt[i]}`;
                        checkbox.setAttribute("type", "radio");
                        checkbox.setAttribute("name", `option${idques}`);
                        checkbox.setAttribute("id", "labeoption");
                        checkbox.setAttribute("class", "response_value");
                        checkbox.setAttribute("data-questionId", idques);
                        para.setAttribute("class", "numquestion");
                        para2.setAttribute("class", "contente");
                        label.setAttribute("id", "labeoption");
                
                        checkbox.value = `${opt[i]}`;
                        let questionResponse = responseSessions.find(responseSession => responseSession.question_id === idques && responseSession.response_value === checkbox.value);
                        if (questionResponse) {
                            checkbox.checked = true;
                        }
                        divques.appendChild(checkbox);
                        divques.appendChild(label);
                        divques.appendChild(document.createElement('br'));
                    }
                }
               });
       
            
               
             
       
       
             
           }
        
        
       
    }
   
   

    
})
