/**
 * =====================================================
 * PORTAFOLIO CYBERPUNK - ALEJANDRO
 * JavaScript para animaciones e interacciones
 * =====================================================
 */

// -----------------------------------------------------
// MENÚ MÓVIL (HAMBURGUESA)
// -----------------------------------------------------

/**
 * Controla la apertura y cierre del menú en dispositivos móviles
 */
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Abrir/cerrar menú al hacer click en el botón hamburguesa
    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');

            // Actualizar atributo ARIA para accesibilidad
            const isExpanded = navbarToggle.classList.contains('active');
            navbarToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Cerrar menú al hacer click en un enlace
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', (e) => {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// -----------------------------------------------------
// NAVBAR CON EFECTO SCROLL
// -----------------------------------------------------

/**
 * Añade clase 'scrolled' a la navbar cuando se hace scroll
 * para cambiar su apariencia
 */
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// -----------------------------------------------------
// EFECTO TYPEWRITER (MÁQUINA DE ESCRIBIR)
// -----------------------------------------------------

/**
 * Muestra texto con efecto de máquina de escribir
 * para el rol/profesión en la sección Hero
 */
const typewriterElement = document.getElementById('typewriter');

if (typewriterElement) {
    // Roles que se mostrarán rotativamente
    const roles = [
        'Especialista en Sistemas Linux',
        'Ciberseguridad',
        'Optimización de Hardware/Software',
        'Pentesting & Security',
        'Linux Ricing Expert'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    /**
     * Función principal que escribe/borra el texto
     */
    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Borrando texto
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Más rápido al borrar
        } else {
            // Escribiendo texto
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Velocidad normal al escribir
        }

        // Determinar siguiente acción
        if (!isDeleting && charIndex === currentRole.length) {
            // Terminó de escribir, esperar antes de borrar
            isDeleting = true;
            typingSpeed = 2000; // Pausa antes de borrar
        } else if (isDeleting && charIndex === 0) {
            // Terminó de borrar, pasar al siguiente rol
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pausa antes de escribir
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Iniciar efecto después de un breve delay
    setTimeout(typeWriter, 1000);
}

// -----------------------------------------------------
// ANIMACIONES CON INTERSECTION OBSERVER
// -----------------------------------------------------

/**
 * Usa Intersection Observer para detectar cuando elementos
 * entran en pantalla y activar animaciones
 */

// Elementos a animar (tarjetas de skills y servicios)
const animatedElements = document.querySelectorAll('.skill-card, .service-card');

/**
 * Callback del Intersection Observer
 * Se ejecuta cuando la visibilidad de un elemento cambia
 */
const observerCallback = (entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Añadir delay escalonado para efecto cascada
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);

            // Dejar de observar una vez animado
            observer.unobserve(entry.target);
        }
    });
};

// Configurar el observer
const observerOptions = {
    root: null,           // Usar el viewport
    rootMargin: '0px',    // Sin margen extra
    threshold: 0.1        // Activar cuando 10% del elemento sea visible
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observar cada elemento animado
animatedElements.forEach(element => {
    observer.observe(element);
});

// -----------------------------------------------------
// SCROLL SUAVE ENTRE SECCIONES
// -----------------------------------------------------

/**
 * Implementa scroll suave al hacer click en enlaces internos
 * (para navegadores que no soportan scroll-behavior: smooth)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// -----------------------------------------------------
// FONDO DE PARTÍCULAS ANIMADAS
// -----------------------------------------------------

/**
 * Crea un efecto de partículas/nodos conectados
 * que se mueven suavemente en el fondo
 */
const canvas = document.getElementById('particles-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');

    // Ajustar canvas al tamaño de la ventana
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuración de partículas
    const particleConfig = {
        count: 50,                    // Número de partículas
        minSize: 1,                   // Tamaño mínimo
        maxSize: 3,                   // Tamaño máximo
        minSpeed: 0.2,                // Velocidad mínima
        maxSpeed: 0.8,                // Velocidad máxima
        connectionDistance: 150,      // Distancia para conectar líneas
        color: 'rgba(255, 42, 77, ',  // Color base (rojo neón)
    };

    // Array de partículas
    let particles = [];

    /**
     * Clase que representa una partícula individual
     */
    class Particle {
        constructor() {
            // Posición aleatoria
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            // Velocidad aleatoria
            this.vx = (Math.random() - 0.5) * particleConfig.maxSpeed;
            this.vy = (Math.random() - 0.5) * particleConfig.maxSpeed;

            // Tamaño aleatorio
            this.size = Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize;

            // Opacidad aleatoria
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        /**
         * Actualiza la posición de la partícula
         */
        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Rebotar en los bordes
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        /**
         * Dibuja la partícula en el canvas
         */
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = particleConfig.color + this.opacity + ')';
            ctx.fill();
        }
    }

    /**
     * Inicializa el array de partículas
     */
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleConfig.count; i++) {
            particles.push(new Particle());
        }
    }

    /**
     * Dibuja líneas entre partículas cercanas
     */
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particleConfig.connectionDistance) {
                    // Opacidad basada en la distancia
                    const opacity = 1 - (distance / particleConfig.connectionDistance);

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = particleConfig.color + (opacity * 0.3) + ')';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    /**
     * Loop de animación principal
     */
    function animate() {
        // Limpiar canvas
        ctx.clearRect(0, 0, width, height);

        // Actualizar y dibujar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Dibujar conexiones
        drawConnections();

        // Siguiente frame
        requestAnimationFrame(animate);
    }

    // Inicializar y comenzar animación
    initParticles();
    animate();

    // Redimensionar canvas cuando cambia el tamaño de ventana
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Reiniciar partículas con nuevas dimensiones
        initParticles();
    });

    // Efecto interactivo: partículas huyen del mouse
    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Si el mouse está cerca, empujar la partícula
            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
            }
        });
    });
}

// -----------------------------------------------------
// AÑO ACTUAL EN EL FOOTER
// -----------------------------------------------------

/**
 * Actualiza automáticamente el año en el footer
 */
const yearElement = document.getElementById('current-year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// -----------------------------------------------------
// FORMULARIO DE CONTACTO
// -----------------------------------------------------

/**
 * Maneja el envío del formulario de contacto
 * (Actualmente solo muestra una alerta - conectar con backend después)
 */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Validación básica
        if (!name || !email || !message) {
            showAlert('Por favor completa todos los campos', 'error');
            return;
        }

        // Aquí iría la lógica para enviar el formulario
        // Por ahora, mostramos un mensaje de éxito
        showAlert('¡Mensaje enviado! Te contactaré pronto.', 'success');

        // Limpiar formulario
        contactForm.reset();

        // Nota para producción:
        // Para hacer el formulario funcional, puedes usar servicios como:
        // - Formspree (https://formspree.io/)
        // - EmailJS (https://www.emailjs.com/)
        // - O tu propio backend
    });
}

/**
 * Muestra una alerta estilizada
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta ('success' o 'error')
 */
function showAlert(message, type) {
    // Crear elemento de alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Estilos inline para la alerta
    alert.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        border-radius: 8px;
        font-family: var(--font-sans);
        font-size: 0.875rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    // Añadir animación de entrada
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Añadir al DOM
    document.body.appendChild(alert);

    // Remover después de 3 segundos
    setTimeout(() => {
        alert.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// -----------------------------------------------------
// EFECTO PARALLAX SUAVE EN HERO
// -----------------------------------------------------

/**
 * Añade un sutil efecto parallax al contenido del hero
 * cuando se hace scroll
 */
const heroContent = document.querySelector('.hero-content');

if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

        // Solo aplicar si estamos en la sección hero
        if (scrolled < heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight);
        }
    });
}

// -----------------------------------------------------
// CONSOLE EASTER EGG
// -----------------------------------------------------

/**
 * Mensaje secreto para desarrolladores en la consola
 */
console.log(`
%c🔐 PORTAFOLIO CYBERPUNK - ALEJANDRO
%c
¿Eres un fellow hacker? ¡Bienvenido!

Si estás viendo esto, probablemente eres un desarrollador
o alguien curioso sobre cómo funciona la web.

Stack tecnológico:
• HTML5 semántico
• CSS3 con Custom Properties
• JavaScript vanilla (sin frameworks)
• Canvas API para partículas

¿Quieres colaborar? ¡Encuéntrame en GitHub!
`,
    'color: #ff2a4d; font-family: monospace; font-size: 16px; font-weight: bold;',
    'color: #a1a1aa; font-family: monospace; font-size: 12px;'
);
