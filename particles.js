// particles.js - Handles three.js particle animations

function createParticleAnimation(startX, startY, endX, endY, text) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(renderer.domElement);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const geometry = new THREE.TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.1,
        });

        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(startX, startY, 0);
        scene.add(mesh);

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);

            mesh.position.x += (endX - mesh.position.x) * 0.05;
            mesh.position.y += (endY - mesh.position.y) * 0.05;

            if (Math.abs(mesh.position.x - endX) < 0.1 && Math.abs(mesh.position.y - endY) < 0.1) {
                scene.remove(mesh);
                document.body.removeChild(renderer.domElement);
                return;
            }

            renderer.render(scene, camera);
        };

        animate();
    });
}
