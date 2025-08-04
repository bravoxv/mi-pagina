document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar el tema guardado o el tema por defecto (oscuro)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.textContent = 'Cambiar a Tema Oscuro';
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = 'Cambiar a Tema Claro';
    }

    // Toggle de tema
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Cambiar a Tema Claro';
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Cambiar a Tema Oscuro';
        }
    });

    // --- CÓDIGO PARA EL MENÚ DE DONACIÓN ---
    const donateButton = document.getElementById('donate-button');
    const donateOptions = document.getElementById('donate-options');
    const astropayCvu = document.getElementById('astropay-cvu');
    const copyCvuButton = document.querySelector('.copy-cvu-button');
    const astropayCopyMessage = document.getElementById('astropay-copy-message');

    // Función para mostrar/ocultar el menú
    donateButton.addEventListener('click', function(event) {
        donateOptions.classList.toggle('show');
        event.stopPropagation();
    });

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        if (!donateButton.contains(event.target) && !donateOptions.contains(event.target)) {
            if (donateOptions.classList.contains('show')) {
                donateOptions.classList.remove('show');
            }
        }
    });

    // Funcionalidad de copiar CVU
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
