// Mostrar el contenido al hacer clic en el sobre
const sobre = document.getElementById("sobre");
const pantallaInicial = document.getElementById("pantalla-inicial");
const contenidoPrincipal = document.getElementById("contenido-principal");
const bodyElement = document.body;

function abrirInvitacion() {
  pantallaInicial.style.display = "none";
  contenidoPrincipal.classList.add("visible-content");
  bodyElement.classList.add("content-visible"); // Para gestionar el overflow en body
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave arriba
}

sobre.addEventListener("click", abrirInvitacion);

// Permitir abrir con la tecla Enter si el sobre tiene foco (accesibilidad)
sobre.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    abrirInvitacion();
  }
});


// Revelar secciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Opcional: Dejar de observar una vez que es visible para mejorar rendimiento
      // observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 // Ajustado para que se revele un poco antes
});

document.querySelectorAll('.reveal').forEach(sec => observer.observe(sec));

// Cuenta regresiva
const weddingDate = new Date("2026-06-27T12:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const countdownContainer = document.querySelector(".countdown-circle");
  if (!countdownContainer) return; // Salir si el contenedor no existe

  if (diff <= 0) {
    if (countdownContainer.innerHTML !== "<h3>¡Ya es el gran día!</h3>") {
      countdownContainer.innerHTML = "<h3>¡Ya es el gran día!</h3>";
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
  if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
  if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
  if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Iniciar la cuenta regresiva solo si los elementos existen
if (document.getElementById("days")) {
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Llamada inicial
}


// Función para copiar IBAN
function copiarIBAN() {
  const ibanTextElement = document.getElementById("ibanText");
  const mensajeElement = document.getElementById("copiadoMensaje");

  if (!ibanTextElement || !mensajeElement) {
    console.error("Elementos para copiar IBAN no encontrados.");
    return;
  }

  const ibanText = ibanTextElement.innerText;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(ibanText).then(() => {
      mensajeElement.style.display = 'inline'; // Muestra el mensaje
      setTimeout(() => {
        mensajeElement.style.display = 'none'; // Oculta después de 2 segundos
      }, 2500);
    }).catch(err => {
      console.error('Error al copiar el IBAN: ', err);
      alert('No se pudo copiar el IBAN. Por favor, cópialo manualmente.'); // Fallback
    });
  } else {
    // Fallback para navegadores antiguos (raro hoy en día)
    const textArea = document.createElement("textarea");
    textArea.value = ibanText;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      mensajeElement.style.display = 'inline';
      setTimeout(() => {
        mensajeElement.style.display = 'none';
      }, 2500);
    } catch (err) {
      console.error('Fallback: Error al copiar el IBAN', err);
      alert('No se pudo copiar el IBAN. Por favor, cópialo manualmente.');
    }
    document.body.removeChild(textArea);
  }
}
 window.onscroll = function() {
    const scrollBar = document.getElementById("scrollBar");
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollBar.style.width = scrollPercent + "%";
  };
setInterval(updateCountdown, 1000);
updateCountdown();


