let xhrQuestion = new XMLHttpRequest;
let localQuestion = "http://127.0.0.1:8000"

window.addEventListener('DOMContentLoaded',function () {
    let idques
    let table = document.getElementById('table');
    // let tdContente = document.getElementById('tdContente');
    // let tdType = document.getElementById('tdType');
    xhrQuestion.open('GET', `${localQuestion}/api/questions`);
    xhrQuestion.send();
    xhrQuestion.onload=function () {

       let responseQues = JSON.parse(xhrQuestion.response)
       console.log(responseQues);
         
       responseQues.forEach(responseQue => {
        let trTable = document.createElement('tr')
        table.append(trTable)
       
        idques = responseQue.id
        let content = responseQue.question_text
        let type = responseQue.question_type
        console.log(type)

        // console.log(trTable);
        // console.log(ques);
        if (responseQue.question_type === "text" || responseQue.question_type === "number") {
            let tdId = document.createElement('td')
            let tdContente = document.createElement('td')
            let tdType = document.createElement('td')
            tdId.innerText = `question ${idques} `;
            tdContente.innerHTML=`${content}`
            tdType.innerHTML=`${type}`
            trTable.append(tdId)
            trTable.append(tdContente)
            trTable.append(tdType)
        
        }
        if ( responseQue.question_type === "radio") {
            let tdId = document.createElement('td')
            let tdContente = document.createElement('td')
            let tdType = document.createElement('td')
            tdId.innerText = `question ${idques} `;
            tdContente.innerHTML=`${content}`
            tdType.innerHTML=`${type}`
            trTable.append(tdId)
            trTable.append(tdContente)
            trTable.append(tdType)
        
        }
      
    });

    }

    
})