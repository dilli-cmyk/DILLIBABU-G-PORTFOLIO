import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroBrainSphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check device performance / reduced motion
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 350 : 800;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Neural Sphere Geometry & Particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#38bdf8'); // Sky Blue / Cyan
    const color2 = new THREE.Color('#a855f7'); // Glowing Purple

    const radius = 2.0;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere surface + subtle volume jitter
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const jitter = (Math.random() - 0.5) * 0.25;
      const r = radius + jitter;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient based on vertical height
      const mixRatio = (y + radius) / (radius * 2);
      const mixedColor = color1.clone().lerp(color2, mixRatio);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(geometry, particleMaterial);
    scene.add(pointCloud);

    // 3. Inner Core Glow Mesh
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 4. Orbital Ring
    const ringGeo = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // 5. Mouse Interaction Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      targetRotationY = mouseX * 0.5;
      targetRotationX = -mouseY * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous sphere rotation
      pointCloud.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.y = -elapsedTime * 0.12;
      coreMesh.rotation.x = elapsedTime * 0.08;
      ringMesh.rotation.z = elapsedTime * 0.1;

      // Smooth mouse lerp
      pointCloud.rotation.x += (targetRotationX - pointCloud.rotation.x) * 0.05;
      pointCloud.rotation.y += (targetRotationY - pointCloud.rotation.y) * 0.05;

      // Pulse opacity
      coreMat.opacity = 0.12 + Math.sin(elapsedTime * 2) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] flex items-center justify-center">
      {/* Background glow halo */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Badge Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-full text-[11px] sm:text-xs text-cyan-300 flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>3D Neural Sphere • Interactive AI Object</span>
      </div>
    </div>
  );
};
