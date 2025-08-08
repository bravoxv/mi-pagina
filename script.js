document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setUtterancesTheme(themeName) {
        const utterancesContainer = document.querySelector('.utterances-container');
        if (utterancesContainer) {
            utterancesContainer.innerHTML = '';
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', 'bravoxv/mi-pagina');
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
            navigator.clipboard.writeText(astropayCvu.textContent)
                .then(() => {
                    astropayCopyMessage.textContent = '¡Copiado!';
                    astropayCopyMessage.style.color = '#28a745';
                    setTimeout(() => astropayCopyMessage.textContent = '', 2000);
                })
                .catch(err => {
                    astropayCopyMessage.textContent = 'Error al copiar.';
                    astropayCopyMessage.style.color = '#dc3545';
                    setTimeout(() => astropayCopyMessage.textContent = '', 2000);
                });
        });
    }

    // 🎨 Galaxia 3D con estrellas parpadeantes
    const canvas = document.getElementById('galaxy');
    const ctx = canvas.getContext('2d');
    let stars = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            z: Math.random() * w,
            o: Math.random()
        });
    }

    function draw() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "white";

        stars.forEach(star => {
            star.z -= 2;
            if (star.z <= 0) star.z = w;
            let k = 128.0 / star.z;
            let px = star.x * k + w / 2;
            let py = star.y * k + h / 2;

            if (px >= 0 && px <= w && py >= 0 && py <= h) {
                let size = (1 - star.z / w) * 3;
                ctx.globalAlpha = star.o;
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }
    draw();
});
