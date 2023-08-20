import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    15,
    window.innerWidth / window.innerHeight,
    0.01,
    5000,
)

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
    alpha: true,
})

const handleWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', handleWindowResize, false)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
const initialCameraPosition = new THREE.Vector3(
    25 * Math.sin(0.2 * Math.PI),
    12,
    15 * Math.cos(0.2 * Math.PI),
)
camera.position.copy(initialCameraPosition)

renderer.render(scene, camera)

let obj

const loader = new GLTFLoader()
loader.load(
    'LinkTreeModel.glb',
    function (gltf) {
        obj = gltf.scene
        obj.name = 'House'
        obj.position.y = 0
        obj.position.x = 0
        obj.castShadow = true
        obj.receiveShadow = true
        scene.add(obj)
    },
    undefined,
    function (error) {
        console.error(error)
    },
)

const spotLightLeftWindow = new THREE.SpotLight(0xffb773)
spotLightLeftWindow.position.set(-0.75, 1.25, 0.1)
spotLightLeftWindow.target.position.set(-0.75, 0, 1.2)
spotLightLeftWindow.rotation.x = -Math.PI / 3
spotLightLeftWindow.angle = Math.PI / 4
spotLightLeftWindow.intensity = 2

const spotLightCornerLeftWindow = new THREE.SpotLight(0xffb773)
spotLightCornerLeftWindow.position.set(-0.9, 0.5, 0.6)
spotLightCornerLeftWindow.target.position.set(-0.9, 0, 1.2)
spotLightCornerLeftWindow.angle = Math.PI / 3
spotLightCornerLeftWindow.intensity = 3

const spotLightFrontWindow = new THREE.SpotLight(0xffb773)
spotLightFrontWindow.position.set(-0.25, 1.25, -0.45)
spotLightFrontWindow.target.position.set(0, 1.2, -0.45)
spotLightFrontWindow.angle = Math.PI / 2
spotLightFrontWindow.intensity = 3

const spotLightFrontLeftWindow = new THREE.SpotLight(0xffb773)
spotLightFrontLeftWindow.position.set(0.32, 0.5, 0.28)
spotLightFrontLeftWindow.target.position.set(1.2, 0, 0.28)
spotLightFrontLeftWindow.angle = Math.PI / 3
spotLightFrontLeftWindow.intensity = 3

const spotLightFrontRightWindow = new THREE.SpotLight(0xffb773)
spotLightFrontRightWindow.position.set(0.32, 0.5, -0.75)
spotLightFrontRightWindow.target.position.set(1.2, 0, -0.75)
spotLightFrontRightWindow.angle = Math.PI / 3
spotLightFrontRightWindow.intensity = 3

const spotLightFrontDoor = new THREE.SpotLight(0xffb773)
spotLightFrontDoor.position.set(0, 0.4, -0.23)
spotLightFrontDoor.target.position.set(1.2, 0, -0.23)
spotLightFrontDoor.angle = Math.PI / 5
spotLightFrontDoor.intensity = 3

const spotLightStreet = new THREE.SpotLight(0xffb773)
spotLightStreet.position.set(2.1, 1.1, -1)
spotLightStreet.target.position.set(1.2, 0, 0)
spotLightStreet.angle = Math.PI / 6
spotLightStreet.intensity = 3

const spotLightDispenser = new THREE.SpotLight(0xffffff)
spotLightDispenser.position.set(-0.2, 0.3, 0.9)
spotLightDispenser.target.position.set(-0.2, 0, 1.4)
spotLightDispenser.angle = Math.PI / 6
spotLightDispenser.intensity = 2

const spotLightCarLeft = new THREE.SpotLight(0xffffff)
spotLightCarLeft.position.set(1.45, 0.17, -0.1)
spotLightCarLeft.target.position.set(1.45, 0, 0.4)
spotLightCarLeft.angle = Math.PI / 8
spotLightCarLeft.intensity = 2

const spotLightCarRight = new THREE.SpotLight(0xffffff)
spotLightCarRight.position.set(1.78, 0.17, -0.1)
spotLightCarRight.target.position.set(1.78, 0, 0.4)
spotLightCarRight.angle = Math.PI / 8
spotLightCarRight.intensity = 2

const carBackLeftLight = new THREE.PointLight(0xb00012, 0.05)
carBackLeftLight.position.set(1.4, 0.2, -1.1)

const carBackRightLight = new THREE.PointLight(0xb00012, 0.05)
carBackRightLight.position.set(1.8, 0.2, -1.1)

const ambientLight = new THREE.AmbientLight(0x6470e7, 0.3)

scene.add(
    spotLightLeftWindow.target,
    spotLightCornerLeftWindow.target,
    spotLightFrontWindow.target,
    spotLightFrontLeftWindow.target,
    spotLightFrontRightWindow.target,
    spotLightFrontDoor.target,
    spotLightStreet.target,
    spotLightDispenser.target,
    spotLightCarLeft.target,
    spotLightCarRight.target,
)

scene.add(
    spotLightFrontWindow,
    spotLightLeftWindow,
    spotLightCornerLeftWindow,
    spotLightFrontLeftWindow,
    spotLightFrontRightWindow,
    spotLightFrontDoor,
    spotLightStreet,
    spotLightDispenser,
    spotLightCarLeft,
    spotLightCarRight,
    carBackLeftLight,
    carBackRightLight,
    ambientLight,
)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enabled = false;

function animate() {
    requestAnimationFrame(animate)

    const counter = Math.random() * 1000

    if (counter <= 10) {
        spotLightStreet.intensity = 0
        setTimeout(() => {spotLightStreet.intensity = 3}, 100)
    }

    if (counter <= 20 && counter >= 10) {
        spotLightDispenser.intensity = 0
        setTimeout(() => {spotLightDispenser.intensity = 3}, 100)
    }

    renderer.render(scene, camera)
}

animate()
