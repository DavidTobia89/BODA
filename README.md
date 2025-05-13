# Invitación de Boda - David & Mónica

Esta es una página web interactiva diseñada como invitación para la boda de David y Mónica. Presenta un diseño elegante y moderno, con animaciones sutiles y toda la información relevante para los invitados.

## Características Principales

*   **Pantalla de Bienvenida Interactiva:** Un sobre animado que, al hacer clic, revela el contenido de la invitación.
*   **Diseño "Single Page":** Toda la información se presenta en una sola página con secciones que se desplazan verticalmente.
*   **Scroll Snapping:** Las secciones se ajustan a la vista al hacer scroll, proporcionando una experiencia de navegación fluida.
*   **Animaciones de Entrada:** Las secciones aparecen con una suave animación a medida que el usuario se desplaza.
*   **Información Detallada:**
    *   Nombres de los novios y fecha/hora del evento.
    *   Detalles de la Ceremonia (lugar, hora, mapa integrado).
    *   Detalles del Banquete (lugar, mapa, enlace a la web del hotel).
    *   Formulario de Confirmación de Asistencia (enlace a Google Forms).
    *   Sugerencias sobre Fiestas locales en Burgos.
    *   Información de Contacto (botones directos a WhatsApp de David y Mónica).
    *   Sección de Regalo con número de cuenta y botón para copiar el IBAN fácilmente.
    *   Cuenta Regresiva hasta el día de la boda.
*   **Diseño Responsivo:** Adaptado para una correcta visualización en diferentes tamaños de pantalla (escritorio, tablet, móvil).
*   **Fuentes Personalizadas:** Uso de Google Fonts (`Great Vibes`, `Lato`, `Montserrat`) para una estética cuidada.
*   **Iconografía:** Integración de Font Awesome para iconos descriptivos.

## Tecnologías Utilizadas

*   **HTML5:** Para la estructura semántica del contenido.
*   **CSS3:** Para el diseño, animaciones y responsividad.
    *   Flexbox para la maquetación.
    *   Scroll Snap.
    *   Animaciones y Transiciones CSS.
    *   Variables CSS (Custom Properties) para una fácil personalización de temas.
*   **JavaScript (Vanilla JS):**
    *   Manejo de eventos (clic en el sobre).
    *   `Intersection Observer API` para animaciones al hacer scroll.
    *   Funcionalidad de cuenta regresiva.
    *   Funcionalidad para copiar el IBAN al portapapeles (`navigator.clipboard`).

## Estructura del Proyecto
.
├── images/
│ ├── sobre.jpeg # Imagen del sobre inicial
│ ├── fondo.png # Imagen de fondo para las secciones
│ └── favicon.png # Favicon de la página (ejemplo)
├── index.html # Archivo principal HTML
├── style.css # Hoja de estilos CSS
├── script.js # Lógica JavaScript
└── README.md # Este archivo


## Uso

1.  Clona o descarga este repositorio.
2.  Abre el archivo `index.html` en tu navegador web preferido.
3.  Haz clic en el sobre para comenzar a explorar la invitación.

## Personalización

Para adaptar esta invitación para otro evento:

1.  **Contenido:**
    *   Modifica los textos en `index.html` (nombres, fechas, lugares, mensajes, enlaces de WhatsApp, número de cuenta, etc.).
    *   Reemplaza el enlace del formulario de confirmación (`href` en la sección "Formulario de confirmación").
    *   Actualiza los enlaces a mapas y la web del hotel si es necesario.
2.  **Imágenes:**
    *   Reemplaza `images/sobre.jpeg` y `images/fondo.png` con tus propias imágenes.
    *   Añade tu propio `favicon.png`.
3.  **Estilos (Opcional):**
    *   Modifica las variables CSS en la sección `:root` de `style.css` para cambiar colores y fuentes principales.
    *   Ajusta otros estilos en `style.css` según tus preferencias.
4.  **Cuenta Regresiva:**
    *   En `script.js`, cambia la fecha y hora en la variable `weddingDate` a la fecha de tu evento:
        ```javascript
        const weddingDate = new Date("YYYY-MM-DDTHH:MM:SS"); // Ejemplo: "2027-08-15T13:00:00"
        ```

## Posibles Mejoras Futuras

*   Integración de una galería de fotos.
*   Reproductor de música de fondo opcional con controles.
*   Modo oscuro/claro.
*   Internacionalización (soporte para múltiples idiomas).

## Contribuidores

*   (Si aplica, puedes listar aquí a quienes ayudaron o inspiraron el proyecto)

---

¡Esperamos que esta invitación sea del agrado de todos los invitados!
