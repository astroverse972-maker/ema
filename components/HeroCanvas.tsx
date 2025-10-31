import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const BrokenHeart = ({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; }> }) => {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  // Animate the heart to float gently and rotate towards the mouse cursor
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime();
      
      // 1. Gentle floating on the Y axis
      const floatingY = 0.5 + Math.sin(t) * 0.05;
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatingY, 0.1);
      
      // 2. Target rotation based on mouse position (Yaw and Pitch)
      const targetRotationY = mouse.current.x * 0.3;
      const targetRotationX = -mouse.current.y * 0.3;

      // 3. Smoothly interpolate to the target rotation for a fluid feel
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotationX, 0.05);
    }
  });

  // Settings for extruding the 2D heart shape into a 3D object
  const extrudeSettings = {
    steps: 1,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.05,
    bevelSegments: 8,
  };

  // Define the 2D shape of the left half of the heart
  const leftHalfShape = new THREE.Shape();
  const x = 0, y = -1.2;
  leftHalfShape.moveTo(x, y);
  leftHalfShape.bezierCurveTo(x, y + 0.5, x - 1.2, y + 1.2, x - 1.5, y + 2);
  leftHalfShape.bezierCurveTo(x - 1.8, y + 2.8, x - 1, y + 3.2, x, y + 2.5);
  leftHalfShape.lineTo(x, y);

  // Define the 2D shape of the right half of the heart
  const rightHalfShape = new THREE.Shape();
  rightHalfShape.moveTo(x, y);
  rightHalfShape.bezierCurveTo(x, y + 0.5, x + 1.2, y + 1.2, x + 1.5, y + 2);
  rightHalfShape.bezierCurveTo(x + 1.8, y + 2.8, x + 1, y + 3.2, x, y + 2.5);
  rightHalfShape.lineTo(x, y);

  return (
    <group 
        ref={group}
        scale={0.25}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
    >
      {/* Left Piece */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, -0.3, 0.1]}>
        <extrudeGeometry args={[leftHalfShape, extrudeSettings]} />
        <meshStandardMaterial color="#F0A7A0" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Right Piece */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0.3, -0.1]}>
        <extrudeGeometry args={[rightHalfShape, extrudeSettings]} />
        <meshStandardMaterial color="#F0A7A0" roughness={0.4} metalness={0.2} />
      </mesh>
      
      {/* Glowing Orb in the middle */}
      <GlowingOrb hovered={hovered} />
    </group>
  );
};

const GlowingOrb = ({ hovered }: { hovered: boolean }) => {
    const lightRef = useRef<THREE.PointLight>(null!);
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const pulse = 1 + Math.sin(t * 2) * 0.5;
        if(lightRef.current) {
            lightRef.current.intensity = (hovered ? 4 : 1.5) * pulse;
        }
        if(meshRef.current) {
            const scale = 0.4 + Math.sin(t * 2) * 0.05;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group position={[0, 1.2, 0.2]}>
            <pointLight ref={lightRef} color="#F0A7A0" distance={6} />
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial emissive="#F0A7A0" color="#F0A7A0" emissiveIntensity={2} toneMapped={false} />
            </mesh>
        </group>
    )
}

const Scene = () => {
    const { viewport } = useThree();
    const mouse = useRef({ x: 0, y: 0 });

    return (
        <group onPointerMove={(e) => {
            // Update mouse coordinates, normalized from -1 to 1
            mouse.current = {
                x: (e.clientX / viewport.width) * 2 - 1,
                y: (e.clientY / viewport.height) * 2 - 1
            };
        }}>
            <ambientLight intensity={0.5} color="#F0A7A0" />
            <directionalLight
                position={[5, 5, 5]}
                intensity={1.5}
                color="#FADCD9"
            />
            <Sparkles count={80} scale={6} size={1.5} speed={0.2} color="#D4AF37" />
            <BrokenHeart mouse={mouse} />
        </group>
    );
};


const HeroCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-soft-peach">
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
            {/* Set a single, unified background color for the scene */}
            <color attach="background" args={['#FADCD9']} />
            <Scene />
        </Canvas>
    </div>
  );
};

export default HeroCanvas;