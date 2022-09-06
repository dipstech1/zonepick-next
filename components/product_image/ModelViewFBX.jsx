/* eslint-disable @next/next/no-img-element */
import { Loader, OrbitControls, useFBX, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { Card, Col, Row } from "react-bootstrap";

const ModelLoader = (props) => {
  const ref = useRef();
  let fbx = useFBX(props.source);

  const { nodes, materials } = useFBX(props.source);

  return (
    <Suspense>
      <mesh ref={ref} scale={props.scale} material-reflectivity={1}>
        <primitive object={fbx} dispose={null} />
      </mesh>
    </Suspense>
  );
};

const ModelViewFBX = ({ arImageUrl = "", scale = [1.1, 1.1, 1.1] }) => {
  const ref = useRef();

  return (
    <>
      <Row>
        <Col>
          <Card className="border-0">
            <Card.Body style={{ height: "350" }}>
              <Row>
                <Col>
                  <Suspense fallback={<Loader />}>
                    <Canvas style={{ minHeight: "350px", minWidth: "350px" }}>
                      <OrbitControls />
                      <ambientLight intensity={0.5} />
                      <directionalLight intensity={0.5} />
                      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                      <ModelLoader scale={scale} source={arImageUrl} />*/
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

export default ModelViewFBX;
