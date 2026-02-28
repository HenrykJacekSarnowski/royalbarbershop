import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// INICIALIZACE SCÉNY
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Bílé pozadí pro styl omalovánek

// KAMERA (Perspektiva pro 3D hloubku)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 5);

// RENDERER (HD kvalita s vyhlazováním hran)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Přizpůsobení rozlišení displeje
document.getElementById('app').appendChild(renderer.domElement);

// OSVĚTLENÍ (Nutné pro Toon shading)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));

// AKTIVNÍ PRVEK: BARBERSHOP CHAIR (Placeholder)
const geometry = new THREE.BoxGeometry(1.5, 0.8, 1.5);
// ToonMaterial vytváří komiksový/omalovánkový vzhled
const material = new THREE.MeshToonMaterial({ color: 0xdddddd });
const chair = new THREE.Mesh(geometry, material);

// SILNÉ OBRYSY (Váš požadavek na čistý styl omalovánek)
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 4 }));
chair.add(line); 

scene.add(chair);

// OVLÁDÁNÍ (Umožňuje uživateli rotovat scénu myší)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ANIMAČNÍ SMYČKA (Udržuje scénu aktivní v reálném čase)
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// RESPONZIVITA (Přizpůsobení při změně velikosti okna)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

