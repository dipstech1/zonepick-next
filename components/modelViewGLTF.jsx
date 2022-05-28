import { Loader, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
// import { ARCanvas, VRCanvas, useHitTest } from '@react-three/xr';

const ModelLoader = (props) => {
  const ref = useRef();
  let fbx = useGLTF(props.source);

  const { nodes, materials } = useGLTF(props.source);

  return (
    <Suspense>
      <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
        <primitive object={fbx.scene} dispose={null} />
      </mesh>
    </Suspense>
  );
};

const ModelViewGTLF = (props) => {
  const ref = useRef();

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Canvas style={{ minHeight: '300px', minWidth: '300px' }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.5} />
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <ModelLoader scale={props.scale} source={props.source} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelViewGTLF;
