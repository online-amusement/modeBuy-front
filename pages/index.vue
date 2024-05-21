<template>
    <div class="container">
        <h1>Three Sample</h1>
    </div>
    <div class="login-area">
        <div ref="canvas"></div>
    </div>
</template>
<script setup lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
const runtimeConfig = useRuntimeConfig()
const loader = new GLTFLoader();
//const model = 'http://localhost:3002/3d/earth.glb';
const model = 'http://localhost:3002/3d/AnimatedMorphSphere.glb';
const scene = new THREE.Scene()
const clock = new THREE.Clock();
const canvas = ref()
let width = 640;
let height = 480;

//
let renderer : THREE.WebGLRenderer | null = null
let camera : THREE.Camera | null = null
let targetObject : THREE.Group | null = null
let mixer : THREE.AnimationMixer | null = null

onMounted(() => {
    //
    initScene()
    createRenderer()
    createCamera()
    createLight()
    //createControl()
    load()
})

/* events */

const initScene = () => {

    // width = window.innerWidth;
    // height = window.innerHeight;

    scene.background = new THREE.Color("#000000")

}

const createRenderer = () => {
    
    // レンダラーを作成
    renderer = new THREE.WebGLRenderer({
        alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    canvas.value?.appendChild(renderer.domElement)
}

const createCamera = () => {
    
    // カメラを作成
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    camera.position.set(10, 10, 10)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    //const controls = new OrbitControls(camera, renderer.domElement)
}

const createLight = () => {
    //const light = new THREE.AmbientLight(0xffffff, 4);
    const light = new THREE.DirectionalLight(0xefefef, 2)
    light.position.set(1, 5, 5).normalize()
    scene.add(light);
}

const load = () => {
    
    //glTFの読み込み
    loader.load(model, (data) => {

        //console.log(canvas.value)

        //console.log("appUrl=" + runtimeConfig.public.appUrl);
        //console.log(GLTFLoader);
        //console.log(THREE.AnimationMixer);
        //const loader = new THREE.GLTFLoader();        
        
        const gltf = data;
        const object = gltf.scene;

        //
        targetObject = object

        //object.scale.set(3.0, 3.0, 3.0)

        /*
        //アニメーションの読み込み
        const animations = gltf.animations;
        const mixer = new THREE.AnimationMixer(object);

        const anime = mixer.clipAction(animations[0]);
        anime.play();
        */

        //シーンに追加
        scene.add(object);

        //first tick
        tick()
    });
};

const tick = () => {

    const delta = clock.getDelta();
    
    if(targetObject){
        targetObject.rotation.x += 0.01;
        //targetObject.scale.x += 0.01
        //targetObject.scale.y += 3.0 + Math.random() * 5.0
    }

    //mixer.pla

    if(camera && renderer){
        renderer.render(scene, camera)
    }
    requestAnimationFrame(tick)
}
</script>
<style lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-area {
    max-width: 1200px;
}
.email-area {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
.password-area {
    display: flex;
    justify-content: center;
}
.button-area {
    display: flex;
    justify-content: center; 
}
.btn {
    background: #0000FF;
    border: none;
    color: #fff;
    margin-top: 50px;
    width: 150px;
    height: 30px;
    border-radius: 5px;
}
</style>