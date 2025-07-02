document.addEventListener("DOMContentLoaded", function () {
  const contents = document.querySelectorAll(".content");

  let isRunning = true; // L'état par défaut est "start"
  const dropIntervals = new Map(); // Pour gérer les intervalles pour chaque élément

  function createDrop(content) {
    const drop = document.createElement("div");
    drop.classList.add("drop");

    const wave = document.createElement("div");
    wave.classList.add("wave");

    const randomX = Math.random() * 100 - 50;
    const randomDelay = Math.random() * 2;
    const finalY = 500 + Math.random() * 100;

    drop.style.left = `${randomX}%`;
    wave.style.left = `${randomX}%`;
    drop.style.top = "-50px";

    drop.style.animation = `drip 2s cubic-bezier(1, 0, .91, .19) ${randomDelay}s infinite, fall ${
      randomDelay + 2
    }s forwards`;
    wave.style.animation = `ripple 2s ease-out ${randomDelay + 1.5}s infinite`;
    drop.style.setProperty("--finalY", `${finalY}px`);

    wave.style.top = `${finalY}px`;

    content.appendChild(drop);
    content.appendChild(wave);

    // Log pour vérifier la création des gouttes et des ondes
    // console.log(
    //   `Création d'une goutte à ${randomX}% avec délai ${randomDelay}s et finalY ${finalY}px`
    // );
    // console.log(
    //   `Création d'une onde à ${randomX}% avec délai ${randomDelay + 1.5}s`
    // );

    setTimeout(() => {
      drop.remove();
      wave.remove();
    }, 4000);
  }

  // Fonction pour démarrer les gouttes
  function startDrops() {
    contents.forEach((content) => {
      if (!dropIntervals.has(content)) {
        const interval = setInterval(() => createDrop(content), 500);
        dropIntervals.set(content, interval); // Associe un interval à cet élément
      }
    });
  }

  // Fonction pour arrêter et supprimer les gouttes
  function stopDrops() {
    contents.forEach((content) => {
      const interval = dropIntervals.get(content);
      if (interval) {
        clearInterval(interval); // Supprime l'intervalle associé
        dropIntervals.delete(content); // Retire l'entrée correspondante
      }
      // Supprime les gouttes et vagues existantes
      const drops = content.querySelectorAll(".drop");
      const waves = content.querySelectorAll(".wave");
      drops.forEach((drop) => drop.remove());
      waves.forEach((wave) => wave.remove());
    });
  }

  // Fonction toggle pour basculer entre démarrer et arrêter
  window.toggleBubbleMaker = function () {
    const toggleButton = document.getElementById("toggleBubbleMaker");
    if (isRunning) {
      stopDrops();
    } else {
      startDrops();
    }
    isRunning = !isRunning; // Inverse l'état
  };

  // Démarre les gouttes par défaut
  startDrops();
});
