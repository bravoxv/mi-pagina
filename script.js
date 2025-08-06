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

    // Cargar el tema guardado
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

    // Toggle de tema
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

    // --- Lógica del botón de comentarios ---
    const commentButton = document.getElementById('comment-button');
    const commentsSection = document.getElementById('comments-section');

    if (commentButton && commentsSection) {
        commentButton.addEventListener('click', function() {
            commentsSection.classList.toggle('show');
        });
    }

    // --- Lógica del menú de donación ---
    const donateButton = document.getElementById('donate-button-mobile');
    const donateOptions = document.getElementById('donate-dropdown-mobile');
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
                if (donateOptions.classList.contains('show')) {
                    donateOptions.classList.remove('show');
                }
            }
        });
    }

    if (copyCvuButton) {
        copyCvuButton.addEventListener('click', function() {
            const textToCopy = astropayCvu.textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    astropayCopyMessage.textContent = '¡Copiado!';
                    astropayCopyMessage.style.color = '#28a745';
                    setTimeout(() => {
                        astropayCopyMessage.textContent = '';
                    }, 2000);
                })
                .catch(err => {
                    astropayCopyMessage.textContent = 'Error al copiar.';
                    astropayCopyMessage.style.color = '#dc3545';
                    console.error('Error al copiar CVU:', err);
                    setTimeout(() => {
                        astropayCopyMessage.textContent = '';
                    }, 2000);
                });
        });
    }
});
