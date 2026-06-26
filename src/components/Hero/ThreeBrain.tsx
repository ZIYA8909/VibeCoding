import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const ThreeBrain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get current dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Create Particle Nodes (Neural Junctions)
    const particleCount = 180;
    const sphereRadius = 6;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const originalPositions: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Uniform spherical distribution (Fibonacci lattice or random spherical shell)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Random variance inside shell for volume depth
      const radiusOffset = sphereRadius * (0.85 + Math.random() * 0.15);
      const x = radiusOffset * Math.sin(phi) * Math.cos(theta);
      const y = radiusOffset * Math.sin(phi) * Math.sin(theta);
      const z = radiusOffset * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push(new THREE.Vector3(x, y, z));
      
      // Small random drift velocity for pulsing effect
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03
      ));
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom glowing particle material using canvas texture
    const createParticleTexture = () => {
      const canvasEl = document.createElement('canvas');
      canvasEl.width = 16;
      canvasEl.height = 16;
      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 200, 1, 1)'); // Forsythia
        grad.addColorStop(0.3, 'rgba(255, 153, 50, 0.8)'); // Deep Saffron
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvasEl);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(pointCloud);

    // 3. Create Neural Connective Lines Geometry
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x114c5a, // Nocturnal Expedition
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6 * 3); // Max connections support
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // 4. Mouse Move Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse positions between -1 and 1
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.targetY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    // Attach listener with passive set to true for scroll optimization
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 5. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse easing (Lag smoothing)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update particle positions (Pulsing neural wave + drift)
      const posAttribute = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const orig = originalPositions[i];
        
        // Add multi-frequency sine wave expansion
        const pulse = 1.0 + Math.sin(time * 2.0 + orig.x * 0.3) * 0.04 + Math.cos(time * 1.5 + orig.y * 0.3) * 0.03;
        
        // Add cursor hover displacement (repulsion force)
        const currentP = new THREE.Vector3(
          orig.x * pulse,
          orig.y * pulse,
          orig.z * pulse
        );

        // Map mouse coordinates to 3D space approximation
        const mouse3D = new THREE.Vector3(mouse.x * 6, mouse.y * 6, 0);
        const distToMouse = currentP.distanceTo(mouse3D);
        if (distToMouse < 4) {
          const force = (4 - distToMouse) * 0.15;
          const dir = currentP.clone().sub(mouse3D).normalize();
          currentP.addScaledVector(dir, force);
        }

        posArray[i * 3] = currentP.x;
        posArray[i * 3 + 1] = currentP.y;
        posArray[i * 3 + 2] = currentP.z;
      }
      posAttribute.needsUpdate = true;

      // Update lines connections (connect nodes if distance < 2.5)
      let lineIndex = 0;
      const lineArray = lineGeometry.getAttribute('position').array as Float32Array;
      const maxDistance = 2.8;

      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        // Search remaining nodes
        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            lineArray[lineIndex++] = x1;
            lineArray[lineIndex++] = y1;
            lineArray[lineIndex++] = z1;
            lineArray[lineIndex++] = x2;
            lineArray[lineIndex++] = y2;
            lineArray[lineIndex++] = z2;
          }
        }
      }
      
      // Reset remaining line slots to 0
      while (lineIndex < lineArray.length) {
        lineArray[lineIndex++] = 0;
      }
      lineGeometry.getAttribute('position').needsUpdate = true;

      // Slow passive rotation
      pointCloud.rotation.y = time * 0.08 + mouse.x * 0.2;
      pointCloud.rotation.x = time * 0.04 + mouse.y * 0.15;
      lineMesh.rotation.y = time * 0.08 + mouse.x * 0.2;
      lineMesh.rotation.x = time * 0.04 + mouse.y * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resizing via ResizeObserver
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      
      // Dispose WebGL contexts
      scene.remove(pointCloud);
      scene.remove(lineMesh);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center min-h-[300px] md:min-h-[500px]">
      <canvas ref={canvasRef} className="w-full h-full block focus-visible:outline-none" />
    </div>
  );
};

export default ThreeBrain;
