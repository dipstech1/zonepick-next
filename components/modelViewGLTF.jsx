import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Loader, useGLTF} from "@react-three/drei"


const ModelLoader = (props) => {
  const ref = useRef()
  let fbx = useGLTF(props.source)
  return (
      <Suspense fallback={<Loader/>}>
          <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
              <primitive object={fbx.scene} dispose={null}/>
          </mesh>
      </Suspense>
  )
};

const ModelViewGTLF = (props) => {
  const ref = useRef();
  return (
    <div>
      <Suspense>
        <Canvas style={{minHeight:'300px',minWidth:'300px'}}>
          <OrbitControls />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.1} />
          <ambientLight />
          <ModelLoader scale={props.scale} source={props.source} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelViewGTLF;



