let xhrlogin = new XMLHttpRequest();
let localling = "http://127.0.0.1:8000";

window.addEventListener('DOMContentLoaded', function () {
  let loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let data = {
      email: email,
      password: password
    };

    xhrlogin.open('POST', `${localling}/api/login`);
    xhrlogin.setRequestHeader('Content-Type', 'application/json');
    xhrlogin.send(JSON.stringify(data));
  });

  xhrlogin.onload = function () {
    if (xhrlogin.status === 200) {
      let responselogin = JSON.parse(xhrlogin.responseText);
      window.localStorage.setItem('tokenName' ,`${responselogin.Token}`);
      window.localStorage.setItem('iduser' ,`${responselogin.id}`);

      console.log(responselogin);
      // Effectuez les actions appropriées après la connexion réussie
      // par exemple, redirigez l'utilisateur vers une autre page
      window.location.href = 'admin.html';
    } else {
      // Gérez les erreurs de connexion ici
      console.log('Erreur de connexion');
    }
  };
});
