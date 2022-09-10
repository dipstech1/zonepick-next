import { useRouter } from "next/router.js";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Layout from "../../../components/Layout/layout";

var container, controls;
var camera, scene, renderer, hlight, directionalLight, light1, light2, light3, light4, light5;
var sceneName;
var isMouseDown = false;

var panoName = "top-of-a-bed.jpeg";
var modelPath_1 = "/models/modern.fbx";
var modelPath_2 = "/models/building.fbx";
var modelPath_3 = "/models/interior.FBX";


var rot1, rot2, rot3, rot4;

let count = 1;

var mouseTouch = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

const ItemListPage = () => {
  const router = useRouter();
  useEffect(() => {
    container = document.getElementById("game");
    container.addEventListener("mousedown", onMouseDown, false);
    container.addEventListener("touchend", onMouseDown, false);
    window.addEventListener("resize", onWindowResize, true);
    container.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener(
      "orientationchange",
      function () {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      },
      false
    );

    initLoader();
    animate();

    //
    // console.log(container.firstElementChild.remove())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initLoader = () => {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.3, 1000);
    // camera.position.x = 100;
    // camera.position.y = 160;
    camera.position.z = 200;

    //camera.lookAt (new THREE.Vector3(0,0,0));

    scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(550, 500, 400);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load("/images/" + panoName);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    hlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(hlight);

    light1 = new THREE.PointLight(0xffffff, 0.1);
    light1.position.set(0, -50, -40);
    light1.rotation.set(0, 0, 45);
    scene.add(light1);
    light2 = new THREE.PointLight(0xffffff, 0.07);
    light2.position.set(-38, -67, 61);
    light2.rotation.set(0, -45, 0);
    scene.add(light2);
    light3 = new THREE.PointLight(0xffffff, 0.1);
    light3.position.set(85, -50, 50);
    light3.rotation.set(0, 20, 0);
    scene.add(light3);

    const loadingManager = new THREE.LoadingManager();

    var loader = new FBXLoader(loadingManager);
    loader.load(modelPath_1, function (object) {
      object.scale.set(0.01, 0.01, 0.01);
      object.position.set(-250, -150, -350);
      //object.rotation.y=0;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "modern";
        }
      });
      rot1 = object;
      scene.add(object);
    });

    var loader1 = new FBXLoader(loadingManager);
    loader1.load(modelPath_2, function (object) {
      object.scale.set(10, 10, 10);
      object.position.set(100, -100, -200);
      // object.rotation.y = -5.62;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "building";
        }
      });
      rot2 = object;
      scene.add(object);
    });
/*
    var loader2 = new FBXLoader(loadingManager);
    loader2.load(modelPath_3, function (object) {
      object.scale.set(0.1, 0.1, 0.1);
      object.position.set(50, -150, -350);
      //object.rotation.y=0;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "Vans";
        }
      });
      rot3 = object;
      scene.add(object);
    });

    var loader4 = new OBJLoader(loadingManager);
    loader4.load(modelPath_4, function (object) {
      object.scale.set(0.75, 0.75, 0.75);
      object.position.set(115, -40, -200);
      // object.rotation.y = -5.62;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "shoe";
        }
      });
      rot4 = object;
      scene.add(object);
    });*/

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    controls.enablePan = false;
    controls.minDistance = -400;
    controls.maxDistance = 400;
    controls.update();
    controls.enablePan = false;
    //controls.rotateInLeft((180 * Math.PI) / 180);
    //
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();

    if (rot1 != null) {
      rot1.rotation.y += 0.01;
    }

    if (rot2 != null) {
      rot2.rotation.y += 0.005;
    }

    if (rot3 != null) {
      rot3.rotation.y += 0.005;
    }
  }

  function onTransitionEnd(event) {
    event.target.remove();
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
      if (intersects[0].object.name.includes("modern")) {
        router.push("real-estate-shop/view?modelName=modern.fbx&set=1");
        // window.location = "mobile-view?modelName=Mobile.fbx&set=1";
      }

      if (intersects[0].object.name.includes("building")) {
        router.push("real-estate-shop/view?modelName=building.fbx&set=2");
        // window.location = "mobile-view?modelName=Laptop.FBX&set=2";
      }

    }
  }

  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  return (
    <Layout title="Real Estate Shop" showFooter={false} showNav={false}>
      <div id="game" align="center" style={{ display: "block", position: "absolute", minHeight: "100vh" }}></div>
    </Layout>
  );
};

export default ItemListPage;
