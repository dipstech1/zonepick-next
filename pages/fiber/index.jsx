/* eslint-disable @next/next/no-img-element */
import { Loader, OrbitControls, useGLTF, useFBX, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";
import * as THREE from "three";

const ModelLoader = (props) => {
  const geometry = new THREE.SphereGeometry(550, 200, 400);
  geometry.scale(-1, 1, 1);
  const texture = new THREE.TextureLoader().load("/images/d6.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.3, 1000);

  const ref = useRef();
  let fbx = useFBX(props.source);

  useEffect(() => {
    // Add mesh to camera
    const meshRef = ref.current;
    
  }, [ref.current]);

  return (
    <Suspense>
      <mesh ref={ref} geometry={geometry} material={material} position={[25, -65, -400]}>
        <primitive object={fbx} dispose={null} />
      </mesh>
    </Suspense>
  );
};

const ModelViewGTLF = ({ arImageUrl = "/models/Mobile.fbx", scale = [0.1, 0.1, 0.1] }) => {
  const ref = useRef();
 
  return (
    <>
      <Row>
        <Col>
          <Card className="border-0">
            <Card.Body style={{ height: "100vh" }}>
              <Row>
                <Col>
                  <Suspense fallback={<Loader />}>
                    <Canvas style={{ minHeight: "100vh", minWidth: "100vh" }}>
                      <OrbitControls />
                      <ambientLight intensity={0.5} />
                      <directionalLight intensity={0.5} />
                      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[-10, -15, -100]} castShadow />
                      <ModelLoader scale={scale} source={arImageUrl} />
                    </Canvas>
                  </Suspense>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ModelViewGTLF;
