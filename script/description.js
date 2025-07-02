document.addEventListener("DOMContentLoaded", function () {
  const jsonFilePath = "./json/description.json";

  // Fonction pour récupérer les données JSON
  async function fetchData() {
    try {
      const response = await fetch(jsonFilePath);
      if (!response.ok) {
        throw new Error(
          `Erreur de chargement du fichier JSON : ${response.status}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      return null;
    }
  }

  // Fonction pour mettre à jour le contenu des balises
  async function updateContent(category) {
    const data = await fetchData();
    if (data && data[category]) {
      document.querySelector("h1").textContent = data[category][0].h1;
      document.querySelector(".presentation").innerHTML =
        data[category][0].presentation;
    } else {
      console.error("Category not found in data");
    }
  }

  // Gestionnaire d'événements pour les boutons de catégorie
  const categories = ["photos", "gouttes", "bretagne"];
  categories.forEach((category) => {
    const button = document.getElementById(category);
    if (button) {
      button.addEventListener("click", function () {
        updateContent(category);
      });
    }
  });

  // Mettre à jour le contenu initial basé sur la catégorie dans l'URL
  const initialCategory = getQueryParameter("category") || "gouttes";
  updateContent(initialCategory);

  // Fonction pour récupérer les paramètres de l'URL
  function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
});

function toggleText() {
  const container = document.querySelector(".collapsible-container");
  const button = document.querySelector(".read-more-button");

  if (container.classList.contains("expanded")) {
    container.classList.remove("expanded");
    button.textContent = "Lire plus";
  } else {
    container.classList.add("expanded");
    button.textContent = "Lire moins";
  }
}
