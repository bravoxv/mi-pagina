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
renderer.setClearColor(0x000000, 0);  // Transparente para ver fondo real

// Posicionar canvas como fondo fijo
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
renderer.domElement.style.zIndex = '-1';
renderer.domElement.style.pointerEvents = 'none';  // Para que no bloquee clicks

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
    const radius = Math.sqrt(Math.random()) * 10;  // Raíz para densidad en centro
    const x = Math.cos(angle) * radius;
    const y = (Math.random() - 0.5) * 2; // Ligero movimiento vertical
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
