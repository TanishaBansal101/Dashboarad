
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface NodeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  type?: 'sphere' | 'box' | 'torus';
}

const Node: React.FC<NodeProps> = ({ position, size = 0.5, color = '#0EA5E9', type = 'sphere' }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      {type === 'sphere' && (
        <Sphere args={[size, 16, 16]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </Sphere>
      )}
      {type === 'box' && (
        <Box args={[size, size, size]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </Box>
      )}
      {type === 'torus' && (
        <Torus args={[size, size/4, 16, 32]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        </Torus>
      )}
    </mesh>
  );
};

const Connection: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ start, end }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      const direction = new THREE.Vector3().subVectors(
        new THREE.Vector3(...end),
        new THREE.Vector3(...start)
      );
      const center = new THREE.Vector3().addVectors(
        new THREE.Vector3(...start),
        direction.clone().multiplyScalar(0.5)
      );
      ref.current.position.copy(center);
      ref.current.lookAt(new THREE.Vector3(...end));
      ref.current.rotateX(Math.PI / 2);
    }
  });

  const distance = new THREE.Vector3(...start).distanceTo(new THREE.Vector3(...end));

  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[0.03, 0.03, distance, 8]} />
      <meshBasicMaterial color="#7DD3FC" transparent opacity={0.6} />
    </mesh>
  );
};

const DataNodes: React.FC = () => {
  // Main data nodes with properly typed positions
  const nodes: NodeProps[] = [
    { position: [0, 0, 0], size: 0.8, color: '#0EA5E9', type: 'sphere' },
    { position: [-2, 1, -1], size: 0.6, color: '#7DD3FC', type: 'sphere' },
    { position: [2, -1, 1], size: 0.6, color: '#7DD3FC', type: 'sphere' },
    { position: [1, 2, -2], size: 0.5, color: '#BAE6FD', type: 'box' },
    { position: [-2, -2, 1], size: 0.5, color: '#BAE6FD', type: 'box' },
    { position: [3, 0, -1], size: 0.5, color: '#0EA5E9', type: 'torus' },
    { position: [-3, 0, 1], size: 0.5, color: '#0EA5E9', type: 'torus' },
  ];

  // Connections between nodes with properly typed positions
  const connections: { start: [number, number, number]; end: [number, number, number] }[] = [
    { start: [0, 0, 0], end: [-2, 1, -1] },
    { start: [0, 0, 0], end: [2, -1, 1] },
    { start: [0, 0, 0], end: [1, 2, -2] },
    { start: [0, 0, 0], end: [-2, -2, 1] },
    { start: [-2, 1, -1], end: [-3, 0, 1] },
    { start: [2, -1, 1], end: [3, 0, -1] },
  ];

  return (
    <>
      {nodes.map((node, i) => (
        <Node key={i} {...node} />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} />
      ))}
    </>
  );
};

const DataModelVisualization: React.FC = () => {
  return (
    <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7DD3FC" />
        <DataNodes />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default DataModelVisualization;
