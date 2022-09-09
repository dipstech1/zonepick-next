import { useRouter } from "next/router.js";
import { useEffect } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Layout from "../../components/Layout/layout";

var container, controls;
var camera, scene, renderer, hlight, directionalLight, light1, light2, light3, light4, light5;
var sceneName;
var isMouseDown = false;

var panoName = "d6.jpg";
var modelName = "Mobile";
var modelPath_1 = "/models/Mobile.fbx";
var modelPath_2 = "/models/xiami_s12_ultra_white.fbx";
var modelPath_3 = "/models/Mobile_Phone.fbx";

var rot1, rot2, rot3;

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
    const geometry = new THREE.SphereGeometry(600, 600, 600);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load("/images/" + panoName);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    hlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(hlight);

    light1 = new THREE.PointLight(0xffffff, 0.8);
    light1.position.set(0, -50, -40);
    light1.rotation.set(0, 0, 45);
    scene.add(light1);
    light2 = new THREE.PointLight(0xffffff, 0.7);
    light2.position.set(-38, -67, 61);
    light2.rotation.set(0, -45, 0);
    scene.add(light2);
    light3 = new THREE.PointLight(0xffffff, 0.8);
    light3.position.set(85, -50, 50);
    light3.rotation.set(0, 20, 0);
    scene.add(light3);

    const loadingManager = new THREE.LoadingManager();

    var loader = new FBXLoader(loadingManager);
    loader.load(modelPath_1, function (object) {
      object.scale.set(1, 1, 1);
      object.position.set(25, -65, -400);
      //object.rotation.y=0;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "Mobile1";
        }
      });
      rot1 = object;
      scene.add(object);
    });

    var loader1 = new FBXLoader(loadingManager);
    loader1.load(modelPath_2, function (object) {
      object.scale.set(5, 5, 5);
      object.position.set(160, -80, -200);
      // object.rotation.y = -5.62;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "Mobile2";
        }
      });
      rot2 = object;
      scene.add(object);
    });

    var loader2 = new FBXLoader(loadingManager);
    loader2.load(modelPath_3, function (object) {
      object.scale.set(0.7, 0.7, 0.7);
      object.position.set(-150, -150, -500);
      // object.rotation.y = -5.62;
      object.traverse(function (child) {
        if (child.isMesh) {
          child.name = "Mobile3";
        }
      });
      rot3 = object;
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
      rot1.rotation.y -= 0.005;
    }

    if (rot2 != null) {
      rot2.rotation.y -= 0.005;
    }

    if (rot3 != null) {
      rot3.rotation.y -= 0.005;
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
      if (intersects[0].object.name.includes("Mobile1")) {
        router.push("mobile-view?modelName=Mobile.fbx&set=1");
        // window.location = "mobile-view?modelName=Mobile.fbx&set=1";
      }

      if (intersects[0].object.name.includes("Mobile2")) {
        router.push("mobile-view?modelName=xiami_s12_ultra_white.fbx&set=2");
        // window.location = "mobile-view?modelName=Laptop.FBX&set=2";
      }

      if (intersects[0].object.name.includes("Mobile3")) {
        router.push("mobile-view?modelName=Mobile_Phone.fbx&set=3");
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
    <Layout title="Virtual Mobile Shop" showFooter={false} showNav={false}>
      <div id="game" align="center" style={{ display: "block", position: "absolute", minHeight: "100vh" }}></div>
    </Layout>
  );
};

export default ItemListPage;
