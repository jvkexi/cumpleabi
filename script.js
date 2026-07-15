const botonAbrir = document.getElementById('btn-abrir');
const escena1 = document.getElementById('escena1');
const escenaAnimacion = document.getElementById('escena-animacion');

// Elementos de la animación
const elSobre = document.getElementById('el-sobre');
const laCarta = document.getElementById('la-carta');

// Retraso para que el botón pulse (como ya lo teníamos)
setTimeout(() => {
    botonAbrir.classList.remove('ocultar-boton');
    botonAbrir.classList.add('pulsar-animacion');
}, 1000); 

// Secuencia Maestra al hacer CLIC
// Secuencia Maestra al hacer CLIC
botonAbrir.addEventListener('click', () => {
    
    // --- NUEVO: REPRODUCIR MÚSICA ---
    const musica = document.getElementById('musica-fondo');
    musica.play().catch(error => console.log("El navegador requiere interacción para el audio"));
    
    // 1. Ocultar pantalla inicial y mostrar el sobre
    escena1.classList.add('oculto');
    escenaAnimacion.classList.remove('oculto');

    // ... (el resto de tu código de animaciones se queda igual)
    // 2. A los 0.5s -> Se abre la solapa del sobre
    setTimeout(() => {
        elSobre.classList.add('sobre-abierto');
    }, 500);

    // 3. A los 1.5s -> La carta sale del sobre hacia arriba
    setTimeout(() => {
        laCarta.classList.add('carta-fuera');
    }, 1500);

    // 4. A los 2.8s -> La carta se acerca (zoom) y el sobre se desvanece
    setTimeout(() => {
        laCarta.classList.remove('carta-fuera');
        laCarta.classList.add('carta-zoom');
        elSobre.classList.add('desvanecer-sobre');
    }, 2800);

// ... (tu código anterior)

// 5. A los 4.5s -> ¡La carta se desdobla! Revelando el texto y el video
    setTimeout(() => {
        laCarta.classList.add('carta-abierta');
        const video = document.getElementById('video-recuerdos');
        if (video) video.play().catch(e => console.log("Video bloqueado por navegador"));
    }, 4500);

    // 6. A los 30 segundos -> El cordón aparece
    setTimeout(() => {
        const contenedorCordon = document.getElementById('contenedor-cordon');
        contenedorCordon.classList.remove('oculto');
        contenedorCordon.classList.add('visible');
    }, 28000); 
});

// --- BLOQUE FUERA DEL CLICK ---
// Usamos el 'document' para escuchar cualquier clic
// --- 1. Lógica del evento de clic (Delegación) ---
// Esto escucha cualquier clic en la página y busca específicamente el tirador.
// Así no importa si se carga antes o después, siempre funcionará.
// ... (toda tu lógica anterior)

// --- ESTO ES LO QUE DEBES TENER AL FINAL DE TU ARCHIVO ---

// 1. Delegación de clics (para el cordón)
// 1. Lógica del evento de clic (Delegación)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tirador')) {
        const contenedorCordon = document.getElementById('contenedor-cordon');
        
        // --- AQUÍ HACEMOS QUE EL CORDÓN DESAPAREZCA AL INSTANTE ---
        contenedorCordon.classList.add('oculto'); 
        contenedorCordon.classList.remove('visible');
        // ----------------------------------------------------------

        // Animación de tirón (opcional si quieres que se vea un movimiento rápido)
        contenedorCordon.style.top = "50px"; 
        
        // Iniciamos la secuencia de cierre de la carta
        setTimeout(() => {
            iniciarSecuenciaFinal();
        }, 500);
    }
});

// 2. Función de cierre y regreso (La que acabamos de hacer)
function iniciarSecuenciaFinal() {
    const laCarta = document.getElementById('la-carta');
    
    // Primero, se dobla la carta
    laCarta.classList.remove('carta-abierta'); 
    
    // Luego, esperamos 1 segundo antes de iniciar el "viaje" de regreso al sobre
    setTimeout(() => {
        laCarta.classList.add('carta-regresa'); // Aplica la animación CSS
        
        // Cuando termine la animación (2 segundos después), ocultamos la carta y mostramos el pastel
        setTimeout(() => {
            laCarta.classList.add('oculto');
            mostrarPastel(); 
        }, 2000);
    }, 1000);
}

// 3. Función del pastel (aquí activarás lo que sigue)
function mostrarPastel() {
    const escenaPastel = document.getElementById('escena-pastel');
    const mensaje = document.getElementById('mensaje-final');
    
    if (escenaPastel) {
        escenaPastel.classList.remove('oculto');
        
        // --- AQUÍ ESTABA EL ERROR: AGREGA ESTA LÍNEA ---
        activarCelebracion(); 
        // ------------------------------------------------
        
        if (mensaje) {
            setTimeout(() => {
                mensaje.classList.remove('oculto');
                mensaje.style.opacity = "1";
            }, 2000);
        }
    }
}

function activarCelebracion() {
    // Ráfaga inicial de confeti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff80ab', '#795548', '#ffeb3b'] // Colores que combinan con tu pastel
    });

    // Añadimos globos (usando emojis en el confeti)
    const end = Date.now() + 3000;
    const colors = ['#ff80ab', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
