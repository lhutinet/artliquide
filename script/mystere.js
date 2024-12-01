// const --- = document.querySelector("---");
// const --- = document.getElementById("---");
// window.addEventListener("---", () => {----});

// test
// window.addEventListener("click", (e) => {
//   console.log(e.target);
// });
// partie a supprimée

// je charge une photo----ok

//reponse dans l'input

// verification resultat
//  si bon
//--> score +1
//--> je charge une photo ( retour debut)
//si erreur
//--> 2em possibilite
//  si bon
//--> score +1
//--> je charge une photo ( retour debut)
//--3em possibilité
//  si bon
//--> score +1
//--> je charge une photo ( retour debut)

const containerPhoto = document.querySelector(".containerPhoto");
const button = document.querySelector("button");
const inputRes = document.getElementById("inputRes");
const nbImage = document.getElementById("nombreimage");
const indice = document.getElementById("indice");
const infoRes = document.getElementById("infoRes");

let score = 0;
let imgData = [];

// Fonction pour récupérer les données depuis mystere.json
const fetchcImg = async () => {
  try {
    const res = await fetch("./json/mystere.json");
    imgData = await res.json();
    console.log("Images chargées :", imgData);
    // console.log(imgData);
    // console.log(imgData.fiches[0].reponse);

    startGame(); // Lance le jeu une fois les données chargées
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
};

// Fonction principale du jeu
const startGame = () => {
  let nbQ = imgData.fiches.length; // Nombre total d'images/questions
  let i = 0; // Index de l'image actuelle
  let attempts = 0; // Compteur pour les tentatives

  // Fonction pour mettre à jour l'image
  const updateImage = () => {
    if (i < nbQ) {
      containerPhoto.style.background =
        "url(./img/mystere/" + imgData.fiches[i].image + ") center/cover";
      nbImage.innerHTML = `Image ${i + 1}/${nbQ} .`;
    }
  };

  updateImage(); // Affiche la première image au lancement du jeu

  // Événement pour le bouton
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const userInput = inputRes.value.toLowerCase(); // Phrase saisie par l'utilisateur
    const correctAnswer = imgData.fiches[i].reponse.toLowerCase(); // Réponse correcte

    indice.innerHTML = "Indice: ";

    // Vérifier si la réponse correcte est contenue dans la phrase
    if (userInput.includes(correctAnswer)) {
      infoRes.innerHTML = "Bonne réponse !";
      score++;
      i++; // Passer à l'image suivante
      attempts = 0; // Réinitialiser les tentatives
      resuScore.innerHTML = `Mon score est de ${score} / ${nbQ}`;
    } else {
      attempts++;
      if (attempts === 1) {
        indice.innerHTML = "Indice 1 : " + imgData.fiches[i].indice1;
        infoRes.innerHTML = `Tentative incorrecte`;
      } else if (attempts === 2) {
        indice.innerHTML = "Indice 2 : " + imgData.fiches[i].indice2;
        infoRes.innerHTML = "Attention, dernière tentative pour cette image.";
      } else if (attempts >= 3) {
        i++; // Passer à l'image suivante après 3 tentatives
        attempts = 0; // Réinitialiser les tentatives
        infoRes.innerHTML = "";
        resuScore.innerHTML = `Mon score est de ${score} / ${nbQ}`;
      }
    }

    // Passer à l'image suivante si toutes les questions sont complétées
    if (i < nbQ) {
      updateImage();
    } else {
      indice.innerHTML = "Toutes les images ont été proposées.";
    }

    // Réinitialiser l'input pour une nouvelle saisie
    inputRes.value = "";
  });
};

// Lance le chargement des données à la fin du chargement de la page
window.addEventListener("load", fetchcImg);
