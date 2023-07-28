let xhrres = new XMLHttpRequest;
let localres = "http://127.0.0.1:8000";


// Redirection vers la page admin après une connexion réussie
const loginForm = document.getElementById('connexion');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Effectuez les actions de connexion appropriées

    // Après une connexion réussie, définissez l'état de connexion dans le stockage local
    localStorage.setItem('isLoggedIn', true);

    // Rediriger vers la page admin
    window.location.href = 'admin.html';
  });
}



window.addEventListener('DOMContentLoaded',function () {
    let responseValue;
    let idquestion
    let countOculus = 0
    let countRift = 0
    let countHtc = 0
    let countWindows = 0
    let countValve = 0
    let countStream =0
    let countOcculusStore =0
    let countVive =0
    let countWindowsStore =0
    let countTv = 0
    let countFilm = 0
    let countWork = 0
    let countGame = 0
    let countGameTeam = 0
    let qualitéImage;
    let Confort;
    let connexionReseaux;
    let qualiteGraphique;
    let qualiteAudio;
    usertoken = localStorage.getItem('tokenName');

xhrres.open('get',`${localres}/api/response/${usertoken}`);
xhrres.send();
xhrres.onload=function () {

    responseSondages= JSON.parse(xhrres.response);
    responseSondages.forEach(element => {
        responseValue = element.response_value
        idquestion = element.question_id

        
        if (idquestion===6 && responseValue === "Oculus Quest" ) {
            countOculus ++
        }
        if (idquestion===6 && responseValue === "Oculus Rift/s" ) {
            countRift ++
        }
        if (idquestion===6 && responseValue === "HTC Vive" ) {
            countHtc ++
        }
        if (idquestion===6 && responseValue === "Windows Mixed Reality" ) {
            countWindows ++
        }
        if (idquestion===6 && responseValue === "Valve index" ) {
            countValve ++
        }


        if (idquestion===7 && responseValue === "SteamVR" ) {
            countStream ++
        }
        if (idquestion===7 && responseValue === "Occulus store" ) {
            countOcculusStore ++
        }
        if (idquestion===7 && responseValue === "Viveport" ) {
            countVive ++
        }
        if (idquestion===7 && responseValue === "Windows store" ) {
            countWindowsStore ++
        }


        if (idquestion===10 && responseValue === "regarder la TV en direct" ) {
            countTv ++
        }
        if (idquestion===10 && responseValue === "regarder des films" ) {
            countFilm ++
        }
        if (idquestion===10 && responseValue === "travailler" ) {
            countWork ++
        }
        if (idquestion===10 && responseValue === "jouer en solo" ) {
            countGame ++
        }
        if (idquestion===10 && responseValue === "jouer en équipe" ) {
            countGameTeam ++
        }

        if (idquestion===11 ) {
            qualitéImage = responseValue
        }
        if (idquestion=== 12 ) {
          Confort=  responseValue

        }
        if (idquestion=== 13) {
           connexionReseaux = responseValue

        }
        if (idquestion=== 14 ) {
           qualiteGraphique = responseValue

        }
        if (idquestion=== 15) {
          qualiteAudio =  responseValue
        }

    });
    
    console.log(countOculus);
    new Chart(document.getElementById('myChart2'),{
        type: 'pie',
        data: {
          labels: ["SteamVR", "Occulus store", "Viveport", "Windows store"],
          datasets: [{
            backgroundColor: ["#e63946", "#254BDD",
              "#ffbe0b", "#1d3557"
            ],
            data: [countStream, countOcculusStore, countVive, countWindowsStore]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Pie Chart for admin panel'
          },
          responsive: true
        }
        
      });
      new Chart(document.getElementById('myChart3'),{
        type: 'pie',
        data: {
          labels: ["regarder la TV en direct", "regarder des films", "travailler", "jouer en solo","jouer en équipe"],
          datasets: [{
            backgroundColor: ["#e63946", "#254BDD",
              "#ffbe0b", "#1d3557", "#326998"
            ],
            data: [countTv, countFilm, countWork, countGame, countGameTeam]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Pie Chart for admin panel'
          },
          responsive: true
        }
        
      });
    new Chart(document.getElementById('myChart'), {
        type: 'pie',
        data: {
          labels: ["Oculus Quest", "Oculus Rift/s", "HTC Vive", "Windows Mixed Reality", "Valve index"],
          datasets: [{
            backgroundColor: ["#e63946", "#254BDD",
              "#ffbe0b", "#1d3557", "#326998"
            ],
            data: [countOculus, countRift, countHtc, countWindows, countValve]
          }]
        },
        options: {
          title: {
            display: true,
            text: 'Pie Chart for admin panel'
          },
          responsive: true
        }
        
      });
   
      var marksCanvas = document.getElementById("marksChart");

      var marksData = {
        labels: [" qualité de l’image", " confort d’utilisation", " la connexion réseau", "à la qualité des graphismes 3D", "à la qualité audio",],
        datasets: [{
          label: "BigScrenn",
          backgroundColor: "rgba(200,0,0,0.2)",
          data: [qualitéImage, Confort, connexionReseaux, qualiteGraphique,qualiteAudio]
        },]
      };
      
      var radarChart = new Chart(marksCanvas, {
        type: 'radar',
        data: marksData
      });
}

})