let lastShakeTime = 0;

function tossCoin() {
  const result = Math.random() < 0.5 ? "Pile" : "Face";
  const coin = document.getElementById("coin");
  coin.textContent = result;
  coin.style.backgroundColor = result === "Pile" ? "#007bff" : "#ff4444"; // bleu / rouge
  coin.style.transform = "scale(1.2)";
  setTimeout(() => {
    coin.style.transform = "scale(1)";
  }, 300);
}

// Détection de secousse
let lastX, lastY, lastZ;

window.addEventListener("devicemotion", function (event) {
  const acc = event.accelerationIncludingGravity;
  if (!acc) return;

  const x = acc.x;
  const y = acc.y;
  const z = acc.z;

  if (typeof lastX !== "undefined") {
    const deltaX = Math.abs(x - lastX);
    const deltaY = Math.abs(y - lastY);
    const deltaZ = Math.abs(z - lastZ);

    const shakeThreshold = 15; // Sensibilité

    if ((deltaX + deltaY + deltaZ) > shakeThreshold) {
      const now = Date.now();
      if (now - lastShakeTime > 1000) { // anti-spam
        tossCoin();
        lastShakeTime = now;
      }
    }
  }

  lastX = x;
  lastY = y;
  lastZ = z;
});
