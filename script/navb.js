// Injecte dynamiquement le contenu de nav.html
async function loadNavbar() {
  try {
    const response = await fetch("./nav.html"); // Assurez-vous que le chemin est correct
    if (!response.ok) {
      throw new Error(
        `Erreur de chargement de la navigation : ${response.status}`
      );
    }
    const navbarContent = await response.text();
    document.getElementById("navbar").innerHTML = navbarContent;

    // Réattache les gestionnaires d'événements après l'injection
    setupNavigationEvents();
  } catch (error) {
    console.error("Erreur lors du chargement de la navigation :", error);
  }
}

// Fonction pour configurer les gestionnaires d'événements sur la navigation
function setupNavigationEvents() {
  document.querySelectorAll("nav a[data-category]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Empêche le comportement par défaut
      const category = event.target.getAttribute("data-category"); // Récupère la catégorie
      console.log("Catégorie sélectionnée :", category);

      // Redirige vers la page avec la catégorie en query string
      window.location.href = `./photos.html?category=${category}`;
    });
  });
}

function toggleMenu() {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}
// toggleMenu();
// Charger la navigation avant la galerie
loadNavbar();
