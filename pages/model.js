import React, {Suspense, useRef} from 'react'
import ModelViewGTLF from '../components/modelViewGLTF'
import ModelViewFBX from '../components/modelViewFBX';



function Model() {
    const gltf = useGLTF('/glb/shoe.glb')
    return (<primitive object={gltf.scene} />)
}

export default function Home() {
    const ref = useRef()
    return (
        <div>
            <ModelViewGTLF scale={[20.1,20.1,20.1]} source={'/glb/shoe.glb'}/>
            <ModelViewFBX scale={[0.2,0.2,0.2]} source={'/glb/shoe.glb'} camera={{ position: [0, 0, 35] }}/>
        </div>
    )
}
