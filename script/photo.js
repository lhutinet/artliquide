const jsonFilePath = "./json/photos.json";
const galleryContainer = document.getElementById("gallery-container");
let currentIndex = 0;
let imagesList = [];
const imagesPerPage = 20; // Nombre d'images à charger à chaque fois

// États des filtres
let currentCategory = getQueryParameter("category") || "gouttes";
let currentTheme = "";
let currentColor = "";

// Variable pour le diaporama
let slideshowInterval;
let isSlideshowRunning = false; // Indique si le diaporama est actif

// Fonction pour récupérer les paramètres de l'URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Fonction principale de chargement
document.addEventListener("DOMContentLoaded", () => {
  loadGallery(currentCategory);

  const themeSelect = document.getElementById("theme-Select");
  const themeSelectAnimaux = document.getElementById("theme-SelectAnimaux");

  if (currentCategory === "gouttes") {
    themeSelect.style.display = "block";
  } else {
    themeSelect.style.display = "none";
  }
  if (currentCategory === "animaux") {
    themeSelectAnimaux.style.display = "block";
  } else {
    themeSelectAnimaux.style.display = "none";
  }

  const filterNbButton = document.getElementById("filter-nb");
  const filterCouleurButton = document.getElementById("filter-couleur");
  const filterAllButton = document.getElementById("filter-all");

  if (filterNbButton) {
    filterNbButton.addEventListener("click", () => {
      currentColor = "nb";
      resetAndLoadGallery();
    });
  }

  if (filterCouleurButton) {
    filterCouleurButton.addEventListener("click", () => {
      currentColor = "Couleur";
      resetAndLoadGallery();
    });
  }

  if (filterAllButton) {
    filterAllButton.addEventListener("click", () => {
      currentColor = "";
      resetAndLoadGallery();
    });
  }

  themeSelect.addEventListener("change", () => {
    currentTheme = themeSelect.value;
    resetAndLoadGallery();
  });

  themeSelectAnimaux.addEventListener("change", () => {
    currentTheme = themeSelectAnimaux.value;
    resetAndLoadGallery();
  });

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      loadMoreImages();
    }
  });
});

function parseDate(dateString) {
  // Format de la date : "dd-MM-yyyy HH:mm"
  const [day, month, year, hour, minute] = dateString
    .match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/)
    .slice(1);
  return new Date(year, month - 1, day, hour, minute);
}

async function loadGallery(category) {
  try {
    galleryContainer.innerHTML = "<p>Chargement des images...</p>";
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(
        `Erreur de chargement du fichier JSON : ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Contenu JSON :", data);

    let imagesToDisplay = [];

    if (category === "animaux") {
      // Recherche dans toutes les catégories pour trouver les images avec le mot-clé "Animal"
      for (const cat in data) {
        if (Array.isArray(data[cat])) {
          const filteredImages = data[cat].filter((item) => {
            const keywords =
              item.keywords && item.keywords.length > 0
                ? item.keywords[0].split(",")
                : [];
            if (
              keywords.some(
                (keyword) => keyword.trim().toLowerCase() === "animal"
              )
            ) {
              item.category = cat; // Ajout de la propriété category
              return true;
            }
            return false;
          });
          imagesToDisplay.push(...filteredImages);
        }
      }
    } else {
      // Utiliser la catégorie sélectionnée
      imagesToDisplay = data[category] || [];
      imagesToDisplay.forEach((item) => (item.category = category)); // Ajout de la catégorie sélectionnée
    }

    if (imagesToDisplay.length > 0) {
      galleryContainer.innerHTML = "";
      imagesList = imagesToDisplay
        .filter((item) => {
          const keywords =
            item.keywords && item.keywords.length > 0
              ? item.keywords[0].split(",")
              : [];
          return (
            (!currentTheme ||
              keywords.some(
                (keyword) =>
                  keyword.trim().toLowerCase() === currentTheme.toLowerCase()
              )) &&
            (!currentColor ||
              keywords.some(
                (keyword) =>
                  keyword.trim().toLowerCase() === currentColor.toLowerCase()
              ))
          );
        })
        .sort((a, b) => {
          if (a.dateCreation && b.dateCreation) {
            return parseDate(a.dateCreation) - parseDate(b.dateCreation); // Trie par date de création
          } else if (a.dateCreation) {
            return -1; // a avant b si b n'a pas de date de création
          } else if (b.dateCreation) {
            return 1; // b avant a si a n'a pas de date de création
          } else {
            return 0; // Conserve l'ordre d'origine si aucune date de création
          }
        });

      currentIndex = 0; // Réinitialise l'index pour charger de nouvelles images
      loadMoreImages(category);
    } else {
      console.error(`Aucune image trouvée pour la catégorie '${category}'.`);
      galleryContainer.innerHTML = `<p>Aucune image disponible pour la catégorie '${category}'.</p>`;
    }
  } catch (error) {
    console.error("Erreur lors du chargement de la galerie :", error);
    galleryContainer.innerHTML =
      "<p>Une erreur s'est produite lors du chargement des images.</p>";
  }
}

// Fonction pour charger plus d'images au fur et à mesure que l'utilisateur fait défiler
function loadMoreImages(category) {
  const itemsToLoad = imagesList.slice(
    currentIndex,
    currentIndex + imagesPerPage
  );
  itemsToLoad.forEach((item) => {
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo-container");

    const img = document.createElement("img");

    // Utiliser la catégorie d'origine de chaque image pour construire le chemin
    const originalCategory = item.category || "animaux";
    img.src = `img/${originalCategory}/${item.fileName}`;
    img.alt = item.title || "Image";

    console.log("Chemin de l'image : ", img.src); // Vérifiez le chemin complet de l'image

    img.onerror = () => {
      console.error("Erreur de chargement de l'image : ", img.src); // Détecter les erreurs de chargement
    };

    photoContainer.appendChild(img);

    if (item.title) {
      const title = document.createElement("h3");
      title.textContent = item.title;
      photoContainer.appendChild(title);
    }

    galleryContainer.appendChild(photoContainer);
  });
  currentIndex += imagesPerPage;
}

// Fonction pour réinitialiser et charger la galerie en fonction des filtres actuels
function resetAndLoadGallery() {
  galleryContainer.innerHTML = "";
  currentIndex = 0;
  loadGallery(currentCategory);
}

// Fonctionnalité de zoom
const zoomContainer = document.getElementById("zoom-container");
const zoomImg = document.getElementById("zoom-img");

document.addEventListener("click", (event) => {
  if (
    event.target.tagName === "IMG" &&
    event.target.closest(".gallery-container")
  ) {
    imagesList = Array.from(
      document.querySelectorAll(".gallery-container img")
    );
    currentIndex = imagesList.indexOf(event.target);
    showZoomWithNavigation(currentIndex);
    startSlideshow(); // Démarre le diaporama après un clic sur une image
  }
});

function showZoom(src) {
  zoomImg.src = src;
  zoomContainer.style.display = "flex";
}

function showZoomWithNavigation(index) {
  if (index < 0 || index >= imagesList.length) {
    return;
  }
  currentIndex = index;
  const imgSrc = imagesList[currentIndex].src;
  showZoom(imgSrc);
}

function startSlideshow() {
  if (!isSlideshowRunning) {
    isSlideshowRunning = true;
    slideshowInterval = setInterval(() => {
      showZoomWithNavigation(currentIndex + 1); // Passe à l'image suivante
    }, 3000); // 5 secondes
  }
}

function showZoom(src) {
  zoomImg.src = src;
  zoomContainer.style.display = "flex";
}

function stopSlideshow() {
  isSlideshowRunning = false;
  clearInterval(slideshowInterval); // Arrête le diaporama
}

function setupZoomNavigation() {
  document.getElementById("prev-photo").addEventListener("click", () => {
    stopSlideshow(); // Arrête le diaporama quand on clique sur "Previous"
    showZoomWithNavigation(currentIndex - 1);
  });

  document.getElementById("next-photo").addEventListener("click", () => {
    stopSlideshow(); // Arrête le diaporama quand on clique sur "Next"
    showZoomWithNavigation(currentIndex + 1);
  });
}

zoomContainer.addEventListener("click", (event) => {
  if (event.target === zoomContainer || event.target === zoomImg) {
    zoomContainer.style.display = "none";
    stopSlideshow(); // Arrête le diaporama lorsqu'on ferme le
    //
    loadMoreImages();
    currentIndex = 0;
  }
});

zoomImg.addEventListener("click", () => {
  stopSlideshow(); // Arrête le diaporama en cliquant sur l'image zoomée
  currentIndex = 0;
  loadMoreImages();
});

document.addEventListener("DOMContentLoaded", () => {
  setupZoomNavigation();
});
