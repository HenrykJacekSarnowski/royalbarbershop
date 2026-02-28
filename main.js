import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.getElementById('app').appendChild(renderer.domElement);

// Atmosférické osvětlení (Warm Interior)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const warmSpotlight = new THREE.SpotLight(0xffd485, 2);
warmSpotlight.position.set(5, 5, 5);
warmSpotlight.castShadow = true;
scene.add(warmSpotlight);

// Materiály odpovídající screenu (tmavé dřevo, kůže, chrom)
const floorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
const woodMat = new THREE.MeshStandardMaterial({ color: 0x2b1d0e, roughness: 0.5 });
const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.2 });

// Simulace interiéru (Základní geometrie pro HD hloubku)
const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), floorMat);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Barberské křeslo (Aktivní 3D prvek)
const chairGroup = new THREE.Group();
const seat = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 1), new THREE.MeshStandardMaterial({ color: 0x111111 }));
const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32), goldMat);
chairGroup.add(seat, base);
chairGroup.position.set(0, 0.05, -2);
scene.add(chairGroup);

camera.position.set(0, 2, 5);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true; // Pomalé otáčení pro dynamiku
controls.autoRotateSpeed = 0.5;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
