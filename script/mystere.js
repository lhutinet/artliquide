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
console.log(infoRes);

let score = 0;
let imgData = [];

// Fonction pour récupérer les données depuis data.json
const fetchcImg = async () => {
  try {
    const res = await fetch("./json/data.json");
    imgData = await res.json();
    console.log("Images chargées :", imgData);
    console.log(imgData);
    console.log(imgData.fiches[0].reponse);

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
  button.addEventListener("click", () => {
    indice.innerHTML = " indice: ";
    if (i >= nbQ) {
      indice.innerHTML = "Toutes les images ont été proposées.";
      return; // Arrête le traitement si toutes les images ont été affichées
      console.log(score);
    }

    if (inputRes.value === imgData.fiches[i].reponse) {
      infoRes.innerHTML = "Bonne réponse !";

      score++;
      i++; // Passe à l'image suivante
      attempts = 0; // Réinitialise les tentatives pour la nouvelle image
      resuScore.innerHTML = `Mon score est de ${score} / ${nbQ}`;
      // console.log(score);
    } else {
      attempts++;
      if (attempts === 1) {
        indice.innerHTML = "indice" + " 1 : " + imgData.fiches[i].indice1;
        infoRes.innerHTML = `Tentative incorrecte`;
      } else if (attempts === 2) {
        indice.innerHTML = "indice " + " 2 : " + imgData.fiches[i].indice2;
        infoRes.innerHTML = "Attention dernière tentative pour cette image.";
      } else if (attempts >= 3) {
        i++; // Passe à l'image suivante après 3 tentatives
        attempts = 0; // Réinitialise les tentatives pour la nouvelle image
        // console.log(score);
        infoRes.innerHTML = "";
        resuScore.innerHTML = `Mon score est de ${score} / ${nbQ}`;
      }
    }

    // Passe à l'image suivante ou termine si toutes les images ont été proposées
    if (i < nbQ) {
      updateImage(); // Affiche la prochaine image
    } else {
      // infoRes.innerHTML = "Toutes les images ont été proposées.";
    }

    // Réinitialise l'input pour permettre une nouvelle saisie
    inputRes.value = "";
  });
};

// Lance le chargement des données à la fin du chargement de la page
window.addEventListener("load", fetchcImg);
