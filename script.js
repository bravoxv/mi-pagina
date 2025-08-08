document.addEventListener('DOMContentLoaded', function() {
    // ======================================
    // LOGICA DE THREE.JS (GALAXIA)
    // ======================================
    // 1. Crear la escena y cámara
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    // 2. Crear el renderer y configurar canvas fijo en background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);  // Fondo transparente

    // Posicionar canvas como fondo fijo
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none'; // Para que no bloquee clicks

    document.body.appendChild(renderer.domElement);

    // 3. Crear las estrellas (puntos blancos) y galaxia
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = [];

    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(100);
        const y = THREE.MathUtils.randFloatSpread(100);
        const z = THREE.MathUtils.randFloatSpread(100);
        starPositions.push(x, y, z);
    }

    starsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Opcional: crear una galaxia central con un círculo de puntos amarillentos
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 300;
    const galaxyPositions = [];

    for (let i = 0; i < galaxyCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * 10;
        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 2; 
        const z = Math.sin(angle) * radius;
        galaxyPositions.push(x, y, z);
    }

    galaxyGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(galaxyPositions, 3)
    );

    const galaxyMaterial = new THREE.PointsMaterial({ color: 0xffeeaa, size: 0.15 });
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // 4. Animación
    function animate() {
        requestAnimationFrame(animate);

        // Girar galaxia y estrellas lentamente para efecto dinámico
        stars.rotation.y += 0.0005;
        galaxy.rotation.y -= 0.001;

        renderer.render(scene, camera);
    }
    animate();

    // 5. Ajustar canvas y cámara al cambiar tamaño ventana
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ======================================
    // LOGICA DE COMENTARIOS, DONACIONES Y TEMA
    // ======================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setUtterancesTheme(themeName) {
        const utterancesContainer = document.querySelector('.utterances-container');
        if (utterancesContainer) {
            utterancesContainer.innerHTML = '';
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', 'bravoxv/mi-pagina'); // Asegúrate de que este sea tu repositorio de GitHub
            script.setAttribute('issue-term', 'pathname');
            script.setAttribute('crossorigin', 'anonymous');
            script.setAttribute('async', 'true');
            script.setAttribute('theme', themeName);
            utterancesContainer.appendChild(script);
        }
    }

    // Tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = 'Cambiar a Tema Oscuro';
        setUtterancesTheme('github-light');
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = 'Cambiar a Tema Claro';
        setUtterancesTheme('github-dark');
    }

    // Toggle tema
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Cambiar a Tema Claro';
            setUtterancesTheme('github-dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Cambiar a Tema Oscuro';
            setUtterancesTheme('github-light');
        }
    });

    // Botón comentarios
    const commentButton = document.getElementById('comment-button');
    const commentsSection = document.getElementById('comments-section');
    if (commentButton && commentsSection) {
        commentButton.addEventListener('click', function() {
            commentsSection.classList.toggle('show');
        });
    }

    // Menú donaciones
    const donateButton = document.getElementById('donate-button');
    const donateOptions = document.getElementById('donate-options');
    const astropayCvu = document.getElementById('astropay-cvu');
    const copyCvuButton = document.querySelector('.copy-cvu-button');
    const astropayCopyMessage = document.getElementById('astropay-copy-message');

    if (donateButton && donateOptions) {
        donateButton.addEventListener('click', function(event) {
            donateOptions.classList.toggle('show');
            event.stopPropagation();
        });
        document.addEventListener('click', function(event) {
            if (!donateButton.contains(event.target) && !donateOptions.contains(event.target)) {
                donateOptions.classList.remove('show');
            }
        });
    }

    if (copyCvuButton) {
        copyCvuButton.addEventListener('click', function() {
            // El API de clipboard puede no funcionar en todos los entornos, por eso se utiliza execCommand
            try {
                const cvuText = astropayCvu.textContent;
                const tempInput = document.createElement('textarea');
                tempInput.value = cvuText;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                astropayCopyMessage.textContent = '¡Copiado!';
                astropayCopyMessage.style.color = '#28a745';
                setTimeout(() => astropayCopyMessage.textContent = '', 2000);
            } catch (err) {
                astropayCopyMessage.textContent = 'Error al copiar.';
                astropayCopyMessage.style.color = '#dc3545';
                setTimeout(() => astropayCopyMessage.textContent = '', 2000);
            }
        });
    }
});
