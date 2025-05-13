// Mostrar el contenido al hacer clic en el sobre
const sobre = document.getElementById("sobre");
const pantallaInicial = document.getElementById("pantalla-inicial");
const contenidoPrincipal = document.getElementById("contenido-principal");

sobre.addEventListener("click", () => {
  pantallaInicial.style.display = "none";
  contenidoPrincipal.classList.remove("oculto");
  window.scrollTo({ top: 0 });
});

// Revelar secciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll('.reveal').forEach(sec => observer.observe(sec));

// Cuenta regresiva en formato tabla
const countdownEl = document.getElementById("countdown");
const countdownLabels = document.getElementById("countdown-labels");
const weddingDate = new Date("2026-06-27T12:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown-circle").innerHTML = "<h3>¡Ya es el gran día!</h3>";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}


setInterval(updateCountdown, 1000);
updateCountdown();


