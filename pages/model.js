import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Model() {
    const gltf = useGLTF('https://thinkuldeep.com/modelviewer/Astronaut.glb')
    return (<primitive object={gltf.scene} />)
}

export default function Home() {
    return (
        <div>
            <Suspense>
                <Canvas>
                    <ambientLight />
                    <Model />
                </Canvas>
            </Suspense>
        </div>
    )
}