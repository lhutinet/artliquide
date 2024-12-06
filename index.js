// const --- = document.querySelector("---");
// const --- = document.getElementById("---");
// window.addEventListener("---", () => {----});

// test
// window.addEventListener("click", (e) => {
//   console.log(e.target);
// });

// Chemin vers le fichier JSON
// const urlDossier = window.location.pathname.split(".")[0];
const jsonFilePath = "./json/photos.json";

// Sélectionner le conteneur de la galerie
const galleryContainer = document.getElementById("gallery-container");
let currentIndex = 0; // Index de l'image actuelle
let imagesList = []; // Liste des images dans la galerie

// Fonction pour charger les photos depuis le fichier JSON
// Fonction pour récupérer les paramètres de l'URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name); // Retourne la valeur du paramètre
}

// Fonction pour filtrer les images selon les mots-clés
// function filterGallery(category, filter) {
//   fetch(jsonFilePath)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Erreur de chargement du fichier JSON : ${response.status}`
//         );
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const images = data[category] || [];
//       galleryContainer.innerHTML = ""; // Réinitialise la galerie

//       const filteredImages = images.filter((item) =>
//         filter ? item.keywords.includes(filter) : true
//       );

//       filteredImages.forEach((item) => {
//         const photoContainer = document.createElement("div");
//         photoContainer.classList.add("photo-container");

//         const img = document.createElement("img");
//         img.src = `img/${category}/${item.fileName}`;
//         img.alt = item.title || "Image";
//         photoContainer.appendChild(img);

//         if (item.title) {
//           const title = document.createElement("h3");
//           title.textContent = item.title;
//           photoContainer.appendChild(title);
//         }

//         if (item.description) {
//           const description = document.createElement("p");
//           description.textContent = item.description;
//           photoContainer.appendChild(description);
//         }

//         galleryContainer.appendChild(photoContainer);
//       });
//     })
//     .catch((error) => {
//       console.error("Erreur lors du chargement de la galerie :", error);
//     });
// }

// Gestion des événements pour les boutons et le menu déroulant
document.addEventListener("DOMContentLoaded", () => {
  const category = getQueryParameter("category") || "photos";
  const gallery = document.querySelector(".gallery-container");

  //   document.querySelector("#filter-personnage").addEventListener("click", () => {
  //     filterGallery(category, "personne");
  //   });

  //   document.querySelector("#filter-montage").addEventListener("click", () => {
  //     filterGallery(category, "couleur");
  //   });

  //   document
  //     .querySelector("#location-filter")
  //     .addEventListener("change", (event) => {
  //       const filter = event.target.value; // Récupère la valeur sélectionnée
  //       filterGallery(category, filter);
  //     });

  // Charge toutes les images par défaut

  loadGallery(category);
});

// Détecter la catégorie depuis l'URL
// document.addEventListener("DOMContentLoaded", () => {
//   const category = getQueryParameter("category") || "photos"; // Par défaut "photos"
//   console.log("Catégorie détectée :", category);
//   loadGallery(category); // Charge la galerie pour cette catégorie
// });

async function loadGallery(category) {
  try {
    // Vider le conteneur avant d'ajouter de nouvelles images
    galleryContainer.innerHTML = "<p>Chargement des images...</p>";
    // Récupère le contenu du fichier JSON
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(
        `Erreur de chargement du fichier JSON : ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Contenu JSON :", data);

    // Vérifier si la catégorie existe dans le JSON
    if (data[category] && Array.isArray(data[category])) {
      galleryContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les images

      data[category].forEach((item) => {
        // Créez un conteneur pour chaque photo
        const photoContainer = document.createElement("div");
        photoContainer.classList.add("photo-container");

        // Créez l'image
        const img = document.createElement("img");
        img.src = `img/${category}/${item.fileName}`; // Assurez-vous que le chemin est correct
        img.alt = item.title || "Image";
        photoContainer.appendChild(img);

        // Ajoutez le titre (s'il existe)
        if (item.title) {
          const title = document.createElement("h3");
          title.textContent = item.title;
          photoContainer.appendChild(title);
        }

        // Ajoutez la description (s'il existe)
        if (item.description) {
          const description = document.createElement("p");
          description.textContent = item.description;
          photoContainer.appendChild(description);
        }

        // Ajoutez le conteneur de la photo à la galerie
        galleryContainer.appendChild(photoContainer);
      });
    } else {
      console.error(
        `La catégorie '${category}' n'existe pas ou ne contient pas de photos.`
      );
      galleryContainer.innerHTML = `<p>Aucune image disponible pour la catégorie '${category}'.</p>`;
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la galerie :", error);
    galleryContainer.innerHTML =
      "<p>Une erreur s'est produite lors du chargement des images.</p>";
  }
}

// Gestionnaire d'événements pour la navigation
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    const category = event.target.getAttribute("data-category"); // Récupère la catégorie
    console.log("Catégorie sélectionnée :", category);
    loadGallery(category); // Charge les images pour cette catégorie
  });
});

// Charger une catégorie par défaut au démarrage (optionnel)
loadGallery("photos");
//--------------zoom
const zoomContainer = document.getElementById("zoom-container");
const zoomImg = document.getElementById("zoom-img");

// Fonction pour afficher une image en zoom
function showZoom(src) {
  zoomImg.src = src; // Définit l'image source
  zoomContainer.style.display = "flex"; // Affiche le conteneur
}

// Gestionnaire d'événement pour zoomer une image au clic
document.addEventListener("click", (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.closest(".gallery-container")
  ) {
    const imgSrc = event.target.src; // Récupère la source de l'image cliquée
    showZoom(imgSrc);
  }
});

// Gestionnaire pour fermer le zoom
zoomContainer.addEventListener("click", (event) => {
  if (event.target === zoomContainer || event.target === zoomImg) {
    zoomContainer.style.display = "none"; // Masque le conteneur
  }
});
function showZoomWithNavigation(index) {
  if (index < 0 || index >= imagesList.length) {
    return; // Empêche de dépasser les limites
  }
  currentIndex = index; // Met à jour l'index actuel
  const imgSrc = imagesList[currentIndex].src; // Source de l'image
  zoomImg.src = imgSrc; // Met à jour l'image affichée
  zoomContainer.style.display = "flex"; // Affiche le zoom
}
function setupZoomNavigation() {
  // Bouton "Précédent"
  document.getElementById("prev-photo").addEventListener("click", () => {
    const prevIndex = currentIndex - 1;
    showZoomWithNavigation(prevIndex); // Affiche l'image précédente
  });

  // Bouton "Suivant"
  document.getElementById("next-photo").addEventListener("click", () => {
    const nextIndex = currentIndex + 1;
    showZoomWithNavigation(nextIndex); // Affiche l'image suivante
  });
}
document.addEventListener("click", (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.closest(".gallery-container")
  ) {
    // Récupère toutes les images affichées dans la galerie
    imagesList = Array.from(
      document.querySelectorAll(".gallery-container img")
    );

    // Détermine l'index de l'image cliquée
    currentIndex = imagesList.indexOf(event.target);

    // Affiche l'image cliquée dans le zoom
    showZoomWithNavigation(currentIndex);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  setupZoomNavigation();
});
