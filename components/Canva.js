import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import * as THREE from 'three'
import {useEffect, useState} from "react";

export default function Canva() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQueryForMobilePortrait = matchMedia('(max-width: 768px)');
        const mediaQueryForMobileLandscape = matchMedia(
            '(max-width: 812px) and (orientation: landscape)',
        );
        const mobile =
            mediaQueryForMobilePortrait.matches ||
            mediaQueryForMobileLandscape.matches;
        setIsMobile(mobile);
    },[])

    return (
        <Canvas shadows gl={{ stencil: false, depth: false, alpha: false, antialias: false }} camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>
            <fog attach="fog" args={["red", 25, 40]} />
            <color attach="background" args={["#C97164"]} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <directionalLight
                castShadow
                intensity={2}
                position={[50, 50, 25]}
                shadow-mapSize={[256, 256]}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <Physics gravity={[0, -50, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
                <group position={[0, 0, -10]}>
                    <Mouse />
                    <Borders />
                    <InstancedSpheres isMobile={isMobile} count={ isMobile ? 20 : 150} />
                </group>
            </Physics>
        </Canvas>
    )
}

function InstancedSpheres({ count = 150, isMobile = false }) {
    const { viewport } = useThree()
    const color = new THREE.Color()
    const array = new Float32Array(count*3)
    for (let i = 0; i < count; i++) {
        color
            .set('#b22d17')
            .convertSRGBToLinear()
            .toArray(array, i * 3)
    }
    const map = useLoader(THREE.TextureLoader, '/texture.jpeg')
    const [ref] = useSphere((index) => ({ mass: isMobile ? 200 : 100, position: [4 - Math.random() * 8, viewport.height, 0, 0], args: [1.1] }))
    return (
        <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
            <sphereBufferGeometry args={[1.1, 32, 32]} >
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[array, 3]} />
            </sphereBufferGeometry>
            <meshPhongMaterial
                vertexColors={THREE.VertexColors}
                normalMap={map}
                normalScale={[1, 1]}
                normalMap-wrapS={THREE.RepeatWrapping}
                normalMap-wrapT={THREE.RepeatWrapping}
                normalMap-repeat={[10, 10]}
            />
        </instancedMesh>
    )
}

function Borders() {
    const { viewport } = useThree()
    return (
        <>
            <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
            <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
        </>
    )
}

function Plane({ color, ...props }) {
    usePlane(() => ({ ...props }))
    return null
}

function Mouse() {
    const { viewport } = useThree()
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [10] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7))
}
