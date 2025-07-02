const destinations = [
  { id: "imgBretagne", name: "bretagne", category: "bretagne" },
  { id: "imgCambodge", name: "Cambodge", category: "cambodge" },
  { id: "imgLofoten", name: "Lofoten", category: "lofoten" },
  { id: "imgReunion", name: "Reunion", category: "laReunion" },
  { id: "imgIslande", name: "Islande", category: "islande" },
  { id: "imgKenya", name: "Kenya", category: "kenya" },
  { id: "imgMaroc", name: "Maroc", category: "maroc" },
  { id: "imgCuba", name: "Cuba", category: "cuba" },
  { id: "imgthaillande", name: "Thaillande", category: "thaillande" },
  { id: "imgcapVert", name: "CapVert", category: "capVert" },
];
// pour voir la photo renomé la photo en "name" .jpg

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
