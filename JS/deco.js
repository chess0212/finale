let xhrLogout = new XMLHttpRequest();
let localLogout = "http://127.0.0.1:8000";

window.addEventListener('DOMContentLoaded', function () {
  let logoutButton = document.getElementById('deco');
    usertoken = localStorage.getItem('tokenName');
    iduser = localStorage.getItem('iduser');

  logoutButton.addEventListener('click', function (e) {
    e.preventDefault();

    xhrLogout.open('get', `${localLogout}/api/logout/${iduser}/${usertoken}`);
    xhrLogout.setRequestHeader('Content-Type', 'application/json');
    xhrLogout.send();

    xhrLogout.onload = function () {
      if (xhrLogout.status === 200) {
        // Déconnexion réussie
        // Effectuer les actions nécessaires après la déconnexion
    window.localStorage.removeItem('tokenName');
        window.location.href = 'login.html'; // Rediriger vers la page de connexion
      } else {
        // Gérer les erreurs de déconnexion
        console.error('Erreur de déconnexion:', xhrLogout.responseText);
      }
    };
  });
});
