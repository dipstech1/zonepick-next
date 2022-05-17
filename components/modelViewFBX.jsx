import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Loader, useFBX} from "@react-three/drei"

const ModelLoader = (props) => {
  const ref = useRef()
  let fbx = useFBX(props.source)
  return (
      <Suspense fallback={<Loader/>}>
          <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
              <primitive object={fbx} dispose={null}/>
          </mesh>
      </Suspense>
  )
};

const ModelViewFBX = (props) => {
  const ref = useRef();
  return (
    <div>
      <Suspense>
        <Canvas camera={props.camera} style={{minHeight:'300px',minWidth:'300px'}}>
          <OrbitControls />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.1} />
          <ambientLight />
          <ModelLoader scale={props.scale} source={props.source} camera={props.camera}/>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelViewFBX;



