import './style.css'
import * as Three from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Every Three.js site needs a scene, camera, and a renderer.
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement);

const donutObj = createDonut();
const [pointLight, ambientLight, lightHelper] = createLights();
const gridHelper = new Three.GridHelper(200, 50);
scene.add(donutObj, pointLight, ambientLight, lightHelper, gridHelper);   // Call this function to add objects to the world.


// Game engine loop.
function updateFrame() {
  // Function recursively calls itself to create game loop.
  // To do so, it is passed as a call back, so that the browser will call the callback when the next frame is ready.
  // If we didn't use a callback, and instead just called animate(), then the program would be blocked and would never be able to get to the next frame.
  requestAnimationFrame(updateFrame);

  donutObj.rotation.x += 0.01;
  donutObj.rotation.y += 0.005;
  donutObj.rotation.z += 100;

  controls.update();
  renderer.render(scene, camera);
}
updateFrame();  // Call function once to begin recursive loop.



function createScene() {
  return new Three.Scene();
}

function createCamera() {
  const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;
  return camera;
}

// Function is telling Three.js to render on the <canvas> element.
function createRenderer(scene, camera) {
  const renderer = new Three.WebGL1Renderer({
    canvas: document.querySelector("#background"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  return renderer;
}

function createDonut() {
  const geometry = new Three.TorusGeometry(10, 3, 16, 100);
  const material = new Three.MeshStandardMaterial({ color: 0xFF6347, wireframe: false });
  return new Three.Mesh(geometry, material);
}

function createLights() {
  const pointLight = new Three.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  const ambientLight = new Three.AmbientLight(0xffffff);
  const lightHelper = new Three.PointLightHelper(pointLight);
  return [pointLight, ambientLight, lightHelper];
}