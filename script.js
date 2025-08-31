// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

  // Elementos del DOM
  const sobre = document.getElementById("sobre");
  const pantallaInicial = document.getElementById("pantalla-inicial");
  const contenidoPrincipal = document.getElementById("contenido-principal");
  const bodyElement = document.body;
  const scrollBar = document.getElementById("scrollBar"); // Para la barra de progreso
  const countdownContainer = document.querySelector(".countdown-circle"); // Cachear para la cuenta regresiva
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const ibanTextElement = document.getElementById("ibanText");
  const mensajeElement = document.getElementById("copiadoMensaje");


  // --- ABRIR INVITACIÓN ---
  function abrirInvitacion() {
    if (pantallaInicial) {
      // Usar una clase para ocultar es más mantenible que style.display
      pantallaInicial.classList.add("hidden");
    }
    if (contenidoPrincipal) {
      contenidoPrincipal.classList.add("visible-content");
    }
    bodyElement.classList.add("content-visible"); // Para gestionar el overflow en body
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave arriba
  }

  if (sobre) {
    sobre.addEventListener("click", abrirInvitacion);
    // Permitir abrir con la tecla Enter si el sobre tiene foco (accesibilidad)
    sobre.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        abrirInvitacion();
      }
    });
  }


  // --- REVELAR SECCIONES AL HACER SCROLL ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Dejar de observar una vez que es visible para mejorar rendimiento
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3, // Ajustado ligeramente para que se revele un poco antes (0.5 es bueno también)
    rootMargin: "0px 0px -50px 0px" // Empieza a cargar un poco antes de que entre completamente en viewport
  });

  document.querySelectorAll('.reveal').forEach(sec => {
    if (sec) observer.observe(sec);
  });


  // --- CUENTA REGRESIVA ---
  const weddingDate = new Date("2026-06-27T12:00:00");

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (!countdownContainer) return; // Salir si el contenedor no existe (ya cacheado)

    if (diff <= 0) {
      // Solo actualiza si el contenido es diferente para evitar re-renderizados innecesarios
      if (countdownContainer.innerHTML !== "<h3>¡Ya es el gran día!</h3>") {
        countdownContainer.innerHTML = "<h3>¡Ya es el gran día!</h3>";
      }
      // Detener el intervalo una vez que la fecha ha pasado
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
  }

  let countdownInterval;
  // Iniciar la cuenta regresiva solo si los elementos existen
  if (daysEl && hoursEl && minutesEl && secondsEl && countdownContainer) {
    countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial
  }


  // --- FUNCIÓN PARA COPIAR IBAN ---
  // Asegúrate de que la función esté en el ámbito global si se llama desde onclick en HTML
  // o adjunta el listener desde JS. Para este caso, onclick es simple.
  window.copiarIBAN = function() { // Exponer al scope global para el onclick HTML
    if (!ibanTextElement || !mensajeElement) {
      console.error("Elementos para copiar IBAN no encontrados.");
      return;
    }

    const ibanText = ibanTextElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ibanText).then(() => {
        mensajeElement.style.display = 'inline';
        setTimeout(() => {
          mensajeElement.style.display = 'none';
        }, 2500);
      }).catch(err => {
        console.error('Error al copiar el IBAN: ', err);
        alert('No se pudo copiar el IBAN. Por favor, cópialo manually.');
      });
    } else {
      // Fallback para navegadores antiguos
      const textArea = document.createElement("textarea");
      textArea.value = ibanText;
      // Estilos para asegurar que no sea visible y no cause reflow
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';

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


  // --- BARRA DE PROGRESO DEL SCROLL ---
  let scrollTimeout;
  function handleScroll() {
    // Usar requestAnimationFrame para optimizar el rendimiento del scroll
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      if (scrollBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // Asegurarse de que scrollHeight sea mayor que clientHeight para evitar división por cero
        const scrollHeight = Math.max(document.documentElement.scrollHeight - document.documentElement.clientHeight, 1);
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = scrollPercent + "%";
      }
    });
  }

  // Escuchar el evento scroll en 'main' si es el contenedor con scroll,
  // o en 'window' si el scroll es del body/document.
  // Dado que 'main' tiene 'overflow-y: scroll', el listener debería estar en 'main'.
  // Sin embargo, si 'main' no llena toda la altura inicialmente o si el scroll snap interfiere,
  // 'window' podría ser más fiable. Prueba con 'main' primero.
  const scrollableElement = document.getElementById('contenido-principal'); // o window
  if (scrollableElement) {
    scrollableElement.addEventListener('scroll', handleScroll, { passive: true });
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true }); // Fallback
  }
 document.querySelectorAll('.scroll-icon').forEach(flecha => {
      flecha.addEventListener('click', () => {
        const seccion = flecha.closest('section');
        const siguiente = seccion.nextElementSibling;
        if (siguiente) {
          siguiente.scrollIntoView({ behavior: 'smooth', block: 'start'  });
        }
      });
    });
}); // Fin de DOMContentLoaded

