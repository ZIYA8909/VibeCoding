import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const [hasError, setHasError] = useState(false);
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());

  useEffect(() => {
    let isMounted = true;
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.45, 24.7);
      camera.zoom = 1.6; // Zoom in to focus closely on the robot's face
      camera.lookAt(new THREE.Vector3(0, 13.45, 0));
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = { loaded: () => Promise.resolve() };
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let activeChar: THREE.Object3D | null = null;
      const onResize = () => {
        if (activeChar) {
          handleResize(renderer, camera, canvasDiv);
        }
      };

      loadCharacter()
        .then((gltf) => {
          if (!isMounted) return;
          if (gltf) {
            const animations = setAnimations(gltf);
            hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
            let loadedCharacter = gltf.scene;
            activeChar = loadedCharacter;
            loadedCharacter.position.y = 0; // Center robot body at the origin
            scene.add(loadedCharacter);
            headBone = loadedCharacter.getObjectByName("spine.006") || loadedCharacter.getObjectByName("spine006") || null;
            screenLight = loadedCharacter.getObjectByName("screenlight") || null;

            // Hide computer desk, monitor, keyboard, ground, and other desk parts
            loadedCharacter.traverse((child: any) => {
              const hideNames = [
                "Plane.002",
                "Plane.003",
                "Plane.004",
                "Keyboard",
                "KEYS",
                "screenlight",
                "Cube.002",
                "ground"
              ];
              const isDeskPlane = child.name === "Plane";
              if (child.name && (isDeskPlane || hideNames.some(name => child.name.startsWith(name)))) {
                child.visible = false;
              }
            });

            // Timelines skipped in speedrun build

            progress.loaded().then(() => {
              if (!isMounted) return;
              setTimeout(() => {
                if (!isMounted) return;
                light.turnOnLights();
                animations.startIntro();
              }, 800);
            });
            window.addEventListener("resize", onResize);
          }
        })
        .catch((err) => {
          console.error("Failed to load 3D character:", err);
          if (isMounted) setHasError(true);
        });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        if (!isMounted) return;
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        isMounted = false;
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        // Timelines cleared in speedrun build
        window.removeEventListener("resize", onResize);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 select-none">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Animated outer glass ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C7A9FF]/20 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm" />
          
          {/* Fallback Vector Graphic SVG */}
          <svg 
            className="w-20 h-20 text-[#C7A9FF]/80 relative z-10 animate-float"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="8" cy="16" r="1.5" fill="currentColor" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
            <path d="M9 7h6" />
            <path d="M12 3v4" />
            <path d="M2 14v3M22 14v3" />
          </svg>

          {/* Glowing background blob */}
          <div className="absolute w-40 h-40 bg-[#C7A9FF]/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
