import React, {useRef} from 'react'
import ModelViewGTLF from '../../components/modelViewGLTF'
import ModelViewFBX from '../../components/modelViewFBX';



function Model() {
    const gltf = useGLTF('/glb/shoe.glb')
    return (<primitive object={gltf.scene} />)
}

export default function Home() {
    const ref = useRef()
    return (
        <div style={{paddingTop:'150px'}}>
            <div className='row'>
                <div className='col-md-4'>
                    <ModelViewGTLF scale={[20.1,20.1,20.1]} source={'/glb/shoe.glb'}/>
                </div>
                <div className='col-md-4'>
                     <ModelViewFBX scale={[0.2,0.2,0.2]} source={'/glb/odyssey_2021/oddysey.FBX'} camera={{ position: [0, 0, 35] }}/>
                </div>
                <div className='col-md-4'>
                     <ModelViewFBX scale={[0.2,0.2,0.2]} source={'/glb/modern.FBX'} camera={{ position: [0, 0, 35] }}/>
                </div>
            </div> 
        </div>
    )
}
