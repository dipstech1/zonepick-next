import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import Layout from "../../components/Layout/layout.jsx";
import * as THREE from "../../public/build/three.module.js";
import { OrbitControls } from "../../public/jsm/controls/OrbitControls.js";
import { FBXLoader } from "../../public/jsm/loaders/FBXLoader.js";

var container, controls;
var camera, scene, renderer, hlight, directionalLight, light1, light2, light3, light4, light5;
var sceneName;
var isMouseDown = false;

var modelName = "Mobile";
var modelPath = "/models/" + modelName + ".fbx";

var mouseTouch = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var isdone = false;
var rot;
var set = 1;
var imgSrc = "/images/Mobile2.jpg";
var redMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var greenMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var blueMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const MobileShopColor = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["modelName"]) {
      modelName = router.query["modelName"];
      modelPath = "/models/" + modelName;
      set = router.query["set"];

      container = document.getElementById("game");
      container.addEventListener("mousedown", onMouseDown, false);

      initLoader();
      animate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  function initLoader() {
    container = document.getElementById("game");

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(-10, -100, -500);
    //camera.rotation.set( 0,-90,0);

    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0xc6c4c4 );
    const geometry = new THREE.SphereGeometry(550, 500, 400);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load("/images/CarShop.jpg");
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    hlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(hlight);
    /* directionalLight = new THREE.DirectionalLight(0xFFFF00,0.2);
    // directionalLight.position.set(0,0,0);
    // directionalLight.castShadow = false;
    // scene.add(directionalLight); */
    light1 = new THREE.PointLight(0xffffff, 0.1);
    light1.position.set(0, -50, -40);
    light1.rotation.set(0, 0, 45);
    scene.add(light1);
    light2 = new THREE.PointLight(0xffffff, 0.07);
    light2.position.set(-38, -67, 61);
    light2.rotation.set(0, -45, 0);
    scene.add(light2);
    light3 = new THREE.PointLight(0xffffff, 0.1);
    light3.position.set(0, 50, 50);
    light3.rotation.set(0, -135, 0);
    scene.add(light3);

    const loadingManager = new THREE.LoadingManager();
    var materials = [];
    var loader = new FBXLoader(loadingManager);
    loader.load(modelPath, function (object) {
      
      object.position.set(0, 0, 0);
      object.rotation.y = (90 * Math.PI) / 180;
      if (set === 1) {
        object.scale.set(0.36, 0.36, 0.36);
        object.position.set(-15, -105, -500);
        object.rotation.y = (90 * Math.PI) / 180;
      }

      if (set === 2) {
        object.position.set(-15, -105, -500);
        object.rotation.y = (90 * Math.PI) / 180;
      }

      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "mobile";
          //materials.push(child.material);
        }
      });
      rot = object;
      scene.add(object);
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    //controls.autoRotate=true;
    //controls.autoRotateSpeed=1;
    controls.enablePan = false;
    controls.minDistance = -100;
    controls.maxDistance = 400;

    controls.enablePan = false;
    //controls.rotateInLeft( 90* Math.PI / 180 );
    controls.rotateInUp((25 * Math.PI) / 180);
    controls.update();
    //container.addEventListener('mousemove', onMouseUp);
    //container.addEventListener('mousedown', onMouseDown);
    //container.addEventListener('mouseup', onMouseUp);
    //container.addEventListener('touchend', onMouseUp,);
    //container.addEventListener('touchmove',onMouseUp);
    //container.addEventListener('touchstart',onMouseDown);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  function onMouseDown(e) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects && intersects[0]) {
      //alert(intersects[0].object.name);
      if (intersects[0].object.name.includes("mobile")) {
        if (set == 1) {
          setShow(true);
          imgSrc = "/images/ChairSet.jpg";

          // modalimg = document.getElementsByClassName("modalImg");
          //  modalimg[0].src = "./images/Mobile1.jpg";

          //  handleShow()

          /* var actModal = document.getElementById("exampleModal");
          var modal = new bootstrap.Modal(actModal);
          modal.show();*/
        }

        if (set == 2) {
          setShow(true);
          imgSrc = "/images/Laptop.jpg";
          // modalimg = document.getElementsByClassName("modalImg");
          // modalimg[0].src = "./images/Mobile2.jpg";
          /* var actModal = document.getElementById("exampleModal");
          var modal = new bootstrap.Modal(actModal);
          modal.show();*/
          // handleShow()
        }

        if (set == 3) {
          //   modalimg = document.getElementsByClassName("modalImg");
          //  modalimg[0].src = "./images/Mobile3.jpg";
          /* var actModal = document.getElementById("exampleModal");
          var modal = new bootstrap.Modal(actModal);
          modal.show();*/
          //  handleShow()
        }
      }
    }
  }

  const CgangeToBlue = () => {
    rot.traverse(function (child) {
      if (child.isMesh) {
        //var materialCol=child.material.color;
        //child.material.color=new THREE.Color( 0x00ff00 );
        //materials.push(child.material);
        child.material = blueMat;
        child.material.needsUpdate = true;
      }})
      //child.material.color=new THREE.Color( 0x00ff00 );
    
  };

  const CgangeToGreen = () => {
    rot.traverse(function (child) {
      if (child.isMesh) {
        //var materialCol=child.material.color;
        //child.material.color=new THREE.Color( 0x00ff00 );
        //materials.push(child.material);
        child.material = greenMat;
        child.material.needsUpdate = true;
      }})
      //child.material.color=new THREE.Color( 0x00ff00 );
  };

  const CgangeToRed = () => {
    rot.traverse(function (child) {
      if (child.isMesh) {
        //var materialCol=child.material.color;
        //child.material.color=new THREE.Color( 0x00ff00 );
        //materials.push(child.material);
        child.material = redMat;
        child.material.needsUpdate = true;
      }})
      //child.material.color=new THREE.Color( 0x00ff00 );
  };

  return (
    <Layout title="Product Details" showFooter={false} showNav={false}>
      <div id="game" align="center" style={{ display: "block", position: "absolute" }}></div>
      <div id="header" style={{ marginTop: 10, position: "relative", zIndex: 10, textAlign: "center" }}>
        <button className="btn btn-primary" onClick={() => CgangeToBlue()}></button>
        <button className="btn btn-success" onClick={() => CgangeToGreen()}></button>
        <button className="btn btn-danger" onClick={() => CgangeToRed()}></button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image className="modalImg" src={imgSrc} style={{ width: "100%", height: "auto" }} alt="na"></Image>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="mybtn btn-primary">
            ADD TO CART
          </button>
          <div className="clearfix"></div>
          <button type="button" className="mybtn btn-primary">
            BUY NOW
          </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default MobileShopColor;
