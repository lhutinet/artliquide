const destinations = [
  { id: "imgBretagne", name: "Chute Silencieuse", category: "chute" },
  { id: "imgCambodge", name: "Écho Céleste", category: "echo" },
  { id: "imgLofoten", name: "Harmonie Fugace", category: "harmonie" },
  { id: "imgReunion", name: "Lumière Intérieure", category: "lumiere" },
  { id: "imgIslande", name: "Ombre Lumineuse", category: "ombre" },
  { id: "imgKenya", name: "Onde Pure", category: "onde" },
  { id: "imgMaroc", name: "Rêve Éthéré", category: "reve" },
  { id: "imgCuba", name: "Sérénité Liquide", category: "serenite" },
  { id: "imgthaillande", name: "Souffle Divin", category: "souffle" },
  { id: "imgcapVert", name: "Voile Sacré", category: "voile" },
];

const photoContainer = document.getElementById("photoContainer");

destinations.forEach((destination) => {
  const containerPhoto = document.createElement("div");
  containerPhoto.className = "containerPhoto";

  const imgDiv = document.createElement("div");
  imgDiv.id = destination.id;
  imgDiv.classList = "imgText";

  // Construire dynamiquement le chemin de l'image
  const backgroundUrl = `./img/${destination.category}/${destination.category}.jpg`;
  // Appliquer le style de fond dynamique
  imgDiv.style.background = `url(${backgroundUrl}) center/cover`;
  imgDiv.style.minWidth = "100%";
  imgDiv.style.height = "100%";
  imgDiv.style.boxShadow = "21px 16px 45px 5px rgba(0, 0, 0, 0.52)";
  imgDiv.style.borderRadius = "10px";
  imgDiv.style.borderTop = "1px solid rgb(134, 231, 248)";
  imgDiv.style.borderLeft = "1px solid rgb(134, 231, 248)";

  const imgLink = document.createElement("a");
  imgLink.target = "_parent";
  imgLink.rel = "noopener noreferrer";
  imgLink.title = destination.name;
  imgLink.className = "imgIndex";
  imgLink.href = `./photos.html?category=${destination.category}`;

  const titleLink = document.createElement("a");
  titleLink.className = "titrePhoto";
  titleLink.href = `./photos.html?category=${destination.category}`;
  titleLink.textContent = destination.name;

  imgDiv.appendChild(imgLink);
  containerPhoto.appendChild(imgDiv);
  containerPhoto.appendChild(titleLink);
  photoContainer.appendChild(containerPhoto);
});
