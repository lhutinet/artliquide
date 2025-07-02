const containerPhoto = document.querySelector(".containerPhoto");
const button = document.querySelector("button");
const inputRes = document.getElementById("inputRes");
const nbImage = document.getElementById("nombreimage");
const indice = document.getElementById("indice");
const infoRes = document.getElementById("infoRes");
const resuScore = document.getElementById("resuScore");

let score = 0;
let imgData = [];
let currentPhoto = null; // Photo actuelle
let attempts = 0; // Nombre de tentatives
const nbQ = 10; // Nombre total d'images/questions
let currentImageCount = 0; // Compteur des images affichées

// Fonction pour mélanger un tableau
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Fonction pour récupérer et supprimer une photo aléatoire
const getRandomPhoto = () => {
  const randomIndex = Math.floor(Math.random() * imgData.fiches.length);
  return imgData.fiches.splice(randomIndex, 1)[0]; // Supprime et retourne l'élément
};

// Fonction pour afficher le score final et modifier l'interface
const displayFinalScore = () => {
  containerPhoto.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; 
                              font-size: 2rem; color: #fff; background-color: #000; height: 100%; 
                              text-align: center;"> 
                              🎉 Jeu terminé ! Votre score final est de ${score} / ${nbQ} 🎉 
                              </div>`;
  containerPhoto.style.background = "none"; // Supprime l'arrière-plan

  // Cacher les éléments inutiles
  inputRes.style.display = "none";
  infoRes.style.display = "none";
  indice.style.display = "none";
  resuScore.style.display = "none";

  // Modifier le bouton pour redémarrer le jeu
  button.textContent = "Recommencer";
  button.disabled = false; // Réactiver le bouton si désactivé
};

// Fonction pour réinitialiser le jeu
const resetGame = () => {
  score = 0;
  attempts = 0;
  currentImageCount = 0;

  // Réinitialiser les éléments de l'interface
  inputRes.style.display = "block";
  infoRes.style.display = "block";
  indice.style.display = "block";
  resuScore.style.display = "block";

  inputRes.value = ""; // Réinitialiser l'input
  resuScore.innerHTML = `Mon score est de ${score} / ${nbQ}`;
  nbImage.innerHTML = "";
  indice.innerHTML = "";
  infoRes.innerHTML = "";

  button.textContent = "Je valide";

  // Recharger les données et relancer le jeu
  fetchcImg();
};

// Fonction pour mettre à jour l'image
const updateImage = () => {
  if (currentImageCount < nbQ) {
    currentPhoto = getRandomPhoto(); // Récupère une nouvelle photo
    containerPhoto.style.background = `url(./img/mystere/${currentPhoto.image}) center/cover`;
    containerPhoto.innerHTML = ""; // Supprime le texte éventuel
    nbImage.innerHTML = `Image ${currentImageCount + 1}/${nbQ}`;
    currentImageCount++;
  } else {
    displayFinalScore(); // Affiche le score final
  }
};

// Fonction principale du jeu
const startGame = () => {
  attempts = 0;
  score = 0;
  currentImageCount = 0;
  resuScore.innerHTML = `Score: ${score} / ${nbQ}`;

  // Mélange les fiches avant de commencer
  shuffleArray(imgData.fiches);

  // Charger la première image
  updateImage();
};

// Gestionnaire d'événements pour le bouton
button.addEventListener("click", (e) => {
  e.preventDefault();

  if (button.textContent === "Recommencer") {
    resetGame(); // Relancer le jeu si le bouton est sur "Recommencer"
    return;
  }

  const userInput = inputRes.value.toLowerCase(); // Phrase saisie par l'utilisateur
  const correctAnswer = currentPhoto?.reponse.toLowerCase(); // Réponse correcte

  if (!currentPhoto) return; // Ne rien faire si plus d'images

  indice.innerHTML = "Indice: ";

  // Vérifier si la réponse correcte est contenue dans la phrase
  if (userInput.includes(correctAnswer)) {
    infoRes.innerHTML = "Bonne réponse !";
    score++;
    attempts = 0; // Réinitialiser les tentatives
    resuScore.innerHTML = `Score : ${score} / ${nbQ}`;
    updateImage(); // Charger une nouvelle image
  } else {
    attempts++;
    if (attempts === 1) {
      indice.innerHTML = "Indice 1 : " + currentPhoto.indice1;
      infoRes.innerHTML = `Tentative incorrecte`;
    } else if (attempts === 2) {
      indice.innerHTML = "Indice 2 : " + currentPhoto.indice2;
      infoRes.innerHTML = "Attention, dernière tentative pour cette image.";
    } else if (attempts >= 3) {
      attempts = 0; // Réinitialiser les tentatives
      infoRes.innerHTML = "";
      updateImage(); // Charger une nouvelle image
    }
  }

  // Réinitialiser l'input pour une nouvelle saisie
  inputRes.value = "";
});

// Fonction pour récupérer les données depuis mystere.json
const fetchcImg = async () => {
  try {
    const res = await fetch("./json/mystere.json");
    imgData = await res.json();
    console.log("Images chargées :", imgData);

    startGame(); // Lance le jeu une fois les données chargées
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
};

// Lance le chargement des données à la fin du chargement de la page
window.addEventListener("load", fetchcImg);
