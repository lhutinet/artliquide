const destinations = [
  { id: "imgCambodge", name: "Cambodge", category: "cambodge" },
  { id: "imgCuba", name: "Cuba", category: "cuba" },
  { id: "imgMaroc", name: "Maroc", category: "maroc" },
  { id: "imgKenya", name: "Kenya", category: "kenya" },
  { id: "imgIslande", name: "Islande", category: "islande" },
  { id: "imgReunion", name: "Reunion", category: "laReunion" },
  { id: "imgLofoten", name: "Lofoten", category: "lofoten" },
  { id: "imgBretagne", name: "Bretagne", category: "bretagne" },
  { id: "imgBretagne2", name: "Bretagne2", category: "bretagne2" },
];

const photoContainer = document.getElementById("photoContainer");

destinations.forEach((destination) => {
  const containerPhoto = document.createElement("div");
  containerPhoto.className = "containerPhoto";

  const imgDiv = document.createElement("div");
  imgDiv.id = destination.id;

  // Construire dynamiquement le chemin de l'image
  const backgroundUrl = `./img/${destination.category}/${destination.category}.jpg`;
  // Appliquer le style de fond dynamique
  imgDiv.style.background = `url(${backgroundUrl}) center/cover`;
  imgDiv.style.minWidth = "100%";
  imgDiv.style.height = "100%";
  imgDiv.style.boxShadow = "21px 16px 45px 5px rgba(0, 0, 0, 0.52)";

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
