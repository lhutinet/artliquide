let bubbleInterval = setInterval(bubbleMaker, 500);
let isRunning = true;

function bubbleMaker() {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  const size = Math.random() * 50 + 20 + "px";

  bubble.style.height = size;
  bubble.style.width = size;
  bubble.style.top = Math.random() * 850 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";
  const plusMinus = Math.random() > 0.2 ? 1 : -1;

  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  setTimeout(() => {
    bubble.remove();
  }, 6000);
}

function toggleBubbleMaker() {
  if (isRunning) {
    clearInterval(bubbleInterval);
    isRunning = false;
    removeBubbles();
  } else {
    bubbleInterval = setInterval(bubbleMaker, 500);
    isRunning = true;
  }
}

function removeBubbles() {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble) => {
    bubble.remove();
  });
}

document.getElementById("toggleButton");
