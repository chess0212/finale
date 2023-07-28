xhrSonde = new XMLHttpRequest();
localSonde = "http://127.0.0.1:8000";

window.addEventListener('DOMContentLoaded', function () {
  usertoken = localStorage.getItem('tokenName');
  xhrSonde.open('get', `${localSonde}/api/session/${usertoken}`);
  xhrSonde.send();
  xhrSonde.onload = function (e) {
    e.preventDefault();
    let responseSondes = JSON.parse(xhrSonde.response);
    console.log(responseSondes);

    let tables = {}; // Objet pour organiser les réponses par session_id

    responseSondes.data.forEach(session => {
      const session_id = session.session_id;
      const responses = session.responses;

      if (!tables[session_id]) {
        tables[session_id] = []; // Créer un tableau pour stocker les réponses de cette session_id
      }

      responses.forEach(element => {
        const questext = element.question_text;
        const response = element.response_value;
        const idQuestion = element.question_id;

        tables[session_id].push({
          question_text: questext,
          response_value: response,
          question_id: idQuestion
        });
      });
    });

    console.log(tables); // Afficher les réponses organisées par session_id
    displayTables(tables);
  }
});
const itemsPerPage = 20; // Nombre d'éléments à afficher par page
let currentPage = 1;
let tables; // Déclaration de la variable tables à l'échelle globale

function displayTables(tablesData) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Vider le conteneur avant d'afficher les nouvelles tables

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sessionIds = Object.keys(tablesData);
  for (let i = startIndex; i < endIndex && i < sessionIds.length; i++) {
    const session_id = sessionIds[i];
    const table = createTable(session_id, tablesData[session_id]);
    tableContainer.appendChild(table);
  }

  tables = tablesData; // Affecter les données à la variable tables

  createPaginationButtons(Math.ceil(sessionIds.length / itemsPerPage));
}

// Reste du code inchangé...

function createPaginationButtons(totalPages) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Vider le conteneur avant de créer les nouveaux boutons de pagination

  const previousButton = document.createElement('button');
  previousButton.textContent = 'Précédent';
  previousButton.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      displayTables(tables);
    }
  });
  paginationContainer.appendChild(previousButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', function () {
      currentPage = i;
      displayTables(tables);
    });
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Suivant';
  nextButton.addEventListener('click', function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayTables(tables);
    }
  });
  paginationContainer.appendChild(nextButton);
}
function createTable(session_id, responses) {
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');



  table.appendChild(headerRow);

  const thQuestionText = document.createElement('th');
  thQuestionText.textContent = 'Question Text';
  const thResponseValue = document.createElement('th');
  thResponseValue.textContent = 'Response Value';
  const thQuestionId = document.createElement('th');
  thQuestionId.textContent = 'Question ';

  headerRow.appendChild(thQuestionText);
  headerRow.appendChild(thResponseValue);
  headerRow.appendChild(thQuestionId);

  responses.forEach(response => {
    const row = document.createElement('tr');

    const tdQuestionText = document.createElement('td');
    tdQuestionText.textContent = response.question_text;
    row.appendChild(tdQuestionText);

    const tdResponseValue = document.createElement('td');
    tdResponseValue.textContent = response.response_value;
    row.appendChild(tdResponseValue);

    const tdQuestionId = document.createElement('td');
    tdQuestionId.textContent = response.question_id;
    row.appendChild(tdQuestionId);

    table.appendChild(row);
  });

  return table;
}
