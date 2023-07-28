window.addEventListener('DOMContentLoaded',function () {
    // auth.js

// Fonction pour vérifier si l'utilisateur est authentifié
function checkAuth() {
    //  localStorage.setItem('tokenName' , null); // Vérifiez l'état de connexion dans le stockage local
    const isLoggedIn = localStorage.getItem('tokenName'); // Vérifiez l'état de connexion dans le stockage local
    const currentPage = window.location.pathname;
  
    if (isLoggedIn === null ) {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      if (currentPage !== '/login.html') {
        window.location.href = 'login.html';
      }
      
    } else {
      // L'utilisateur est authentifié
      if (currentPage === '/login.html') {
        // Rediriger vers la page admin après la connexion réussie
        window.location.href = 'admin.html';
      }
    }
  }
  
  // Appeler la fonction de vérification d'authentification sur toutes les pages où vous souhaitez protéger l'accès
  checkAuth();
  
})
