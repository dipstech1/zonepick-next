import React, { Suspense, useRef } from 'react';
import { Canvas , useLoader} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {Loader } from "@react-three/drei"

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


const ModelLoader = (props) => {
  const ref = useRef()
  let fbx = useLoader(OBJLoader, props.source)
  return (
      <Suspense>
          <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
              <primitive object={fbx} dispose={null}/>
          </mesh>
      </Suspense>
  )
};

const ModelViewOBJ = (props) => {
  const ref = useRef();
  return (
    <div>
      <Suspense fallback={<Loader/>}>
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

export default ModelViewOBJ;



