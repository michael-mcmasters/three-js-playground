import './style.css'
import * as Three from 'three';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new Three.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const geometry = new Three.TorusGeometry(10, 3, 16, 100);
const material = new Three.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
const torus = new Three.Mesh(geometry, material);
scene.add(torus);

function testy() {
  console.log("testy");
}


// Runs every frame.
function animate() {
  // Function recursively calls itself to create game loop.
  // To do so, it is passed as a call back, so that the browser will call the callback when the next frame is ready.
  // If we didn't use a callback, and instead just called animate() like normal recursion is done, then the app would be blocked and would never be able to get to the next frame.
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;

  renderer.render(scene, camera);
}
animate();  // Call the recursive function once to begin loop.
