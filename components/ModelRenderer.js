import React, {
    Suspense,
    useRef,
    useState,
    useEffect,
    useCallback,
} from "react";
// import * as THREE from "three";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/gltfloader";
import "@google/model-viewer/dist/model-viewer.min.js";
// import * as dat from "dat.gui";

const ModelRenderer = ({ gltfLink, width, height }) => {
    const [loaded, setLoaded] = useState(false);

    const cameraRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const canvasRef = useRef(null);
    const modelRef = useRef(null);

    const mdRef = useRef(null);

    useEffect(() => {
        // const canvas = document.getElementById(gltfLink);
        // if (!loaded && canvas) {
        //     // _renderScene();
        // }
    }, [loaded, _renderScene, gltfLink]);

    const _renderScene = useCallback(async () => {
        // if (!process.browser) {
        //     return;
        // }
        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(100, 350 / 350, 0.1, 100);
        // const renderer = new THREE.WebGLRenderer();
        // const canvas = document.getElementById(gltfLink);
        // console.log({ canvas });
        // renderer.setSize(0, 0, true);
        // canvas.appendChild(renderer.domElement);
        // renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        // const loader = new GLTFLoader();
        // const gltf = await loader.loadAsync(gltfLink);
        // const obj = gltf.scene;
        // obj.position.set(0, -1, 0);
        // const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
        // scene.add(obj);
        // scene.add(light);
        // scene.background = new THREE.Color(0xded7d7);
        // camera.position.set(0, 0, 1);
        // const animate = () => {
        //     requestAnimationFrame(animate);
        //     // obj.rotation.y += 0.05;
        //     renderer.render(scene, camera);
        // };
        // animate();
        // // const gui = new dat.GUI();
        // // gui.add(obj.position, "y").min(-10).max(10).step(1);
        // sceneRef.current = scene;
        // cameraRef.current = camera;
        // rendererRef.current = renderer;
        // canvasRef.current = canvas;
        // modelRef.current = obj;
        // setLoaded(true);
    }, [gltfLink]);

    return (
        <>
            <div id="card" style={{ width, height }}>
                <model-viewer
                    src={gltfLink}
                    data-js-focus-visible
                    alt="A 3D model of an astronaut"
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                ></model-viewer>
            </div>
        </>
    );
};

export default ModelRenderer;
