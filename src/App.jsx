import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function App() {
  const mountPoint = useRef(null);

  const world = useRef(null);
  const viewCamera = useRef(null);
  const webgl = useRef(null);
  const sunMesh = useRef(null);
  const orbit = useRef(null);
  const animationId = useRef(null);

  const clickRay = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    world.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);
    viewCamera.current = camera;

   
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountPoint.current.appendChild(renderer.domElement);
    webgl.current = renderer;

  
    const softLight = new THREE.AmbientLight(0xffffff, 0.4);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    scene.add(softLight);
    scene.add(mainLight);


    const cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.enableDamping = true;
    orbit.current = cameraControls;

   
    const axes = new THREE.AxesHelper(3);
    scene.add(axes);

    const boxShape = new THREE.BoxGeometry(1, 1, 1);
    const boxPaint = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(boxShape, boxPaint);
    box.position.x = -2;
    scene.add(box);

    const sunShape = new THREE.SphereGeometry(0.8, 32, 32);
    const sunPaint = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: new THREE.Color("#ff8800"),
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.1,
    });

    const sun = new THREE.Mesh(sunShape, sunPaint);
    sun.position.x = 2;
    scene.add(sun);
    sunMesh.current = sun;


    const renderFrame = () => {
      sun.rotation.y += 0.01;
      cameraControls.update();
      renderer.render(scene, camera);
      animationId.current = requestAnimationFrame(renderFrame);
    };
    renderFrame();


    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);


    const onMouseClick = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      clickRay.current.setFromCamera(pointer.current, camera);
      const hit = clickRay.current.intersectObject(sun);

      if (hit.length > 0) {
        sun.material.color.set(0x00ff00);
        sun.material.emissiveIntensity = 0.6;
        console.log("Sun interaction triggered");
      }
    };
    window.addEventListener("click", onMouseClick);


    return () => {
      cancelAnimationFrame(animationId.current);

      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onMouseClick);

      cameraControls.dispose();

      boxShape.dispose();
      boxPaint.dispose();
      sunShape.dispose();
      sunPaint.dispose();

      renderer.dispose();
      mountPoint.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountPoint}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    />
  );
}
