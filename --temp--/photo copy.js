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

  if (currentCategory === "gouttes") {
    themeSelect.style.display = "block";
  } else {
    themeSelect.style.display = "none";
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
    let photos = [];
    let seenPhotos = new Set(); // Pour éviter les doublons

    if (category === "animaux") {
      // Parcourir toutes les catégories
      Object.entries(data).forEach(([categoryName, categoryPhotos]) => {
        if (Array.isArray(categoryPhotos)) {
          const animalPhotos = categoryPhotos
            .filter((photo) => {
              // Vérification stricte du mot-clé "Animal"
              const hasAnimalKeyword =
                photo.keywords &&
                photo.keywords.some(
                  (keyword) => keyword.toLowerCase().trim() === "animal"
                );

              // Vérifier si la photo n'a pas déjà été ajoutée
              const isDuplicate = seenPhotos.has(photo.fileName);
              if (hasAnimalKeyword && !isDuplicate) {
                seenPhotos.add(photo.fileName);
                return true;
              }
              return false;
            })
            .map((photo) => ({
              ...photo,
              sourceCategory: categoryName,
            }));

          photos = photos.concat(animalPhotos);
        }
      });

      console.log(
        "Photos trouvées:",
        photos.map((p) => `${p.sourceCategory}/${p.fileName}`)
      );
    } else {
      if (data[category] && Array.isArray(data[category])) {
        photos = data[category];
      }
    }

    // Reste du code existant pour l'affichage...
    // ...existing code...

    if (photos.length === 0) {
      galleryContainer.innerHTML = "<p>Aucune photo d'animal trouvée.</p>";
      return;
    }

    galleryContainer.innerHTML = "";
    imagesList = []; // Réinitialiser la liste des images pour le diaporama

    photos.forEach((photo) => {
      const photoContainer = document.createElement("div");
      photoContainer.classList.add("photo-container");

      const img = document.createElement("img");
      const imgPath = `img/${photo.sourceCategory || category}/${
        photo.fileName
      }`;
      img.src = imgPath;
      img.alt = photo.title || "Image";
      imagesList.push(img); // Ajouter l'image à la liste pour le diaporama

      img.addEventListener("click", () => {
        currentIndex = imagesList.indexOf(img);
        showZoom(img.src);
      });

      photoContainer.appendChild(img);

      if (photo.title) {
        const title = document.createElement("h3");
        title.textContent = photo.title;
        photoContainer.appendChild(title);
      }

      if (photo.description) {
        const description = document.createElement("p");
        description.textContent = photo.description;
        photoContainer.appendChild(description);
      }

      galleryContainer.appendChild(photoContainer);
    });
  } catch (error) {
    console.error("Erreur lors du chargement de la galerie :", error);
    galleryContainer.innerHTML =
      "<p>Une erreur s'est produite lors du chargement des images.</p>";
  }
}
// Fonction pour charger plus d'images au fur et à mesure que l'utilisateur fait défiler
function loadMoreImages() {
  const itemsToLoad = imagesList.slice(
    currentIndex,
    currentIndex + imagesPerPage
  );
  itemsToLoad.forEach((item) => {
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo-container");

    const img = document.createElement("img");
    img.src = `img/${currentCategory}/${item.fileName}`;
    img.alt = item.title || "Image";

    photoContainer.appendChild(img);

    if (item.title) {
      const title = document.createElement("h3");
      title.textContent = item.title;
      photoContainer.appendChild(title);
    }

    // if (item.description) {
    //   const description = document.createElement("p");
    //   description.textContent = item.description;
    //   photoContainer.appendChild(description);
    // }

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
    stopSlideshow(); // Arrête le diaporama lorsqu'on ferme le zoom
  }
});

zoomImg.addEventListener("click", () => {
  stopSlideshow(); // Arrête le diaporama en cliquant sur l'image zoomée
});

document.addEventListener("DOMContentLoaded", () => {
  setupZoomNavigation();
});
