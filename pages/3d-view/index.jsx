import React, {useRef} from 'react'
import ModelViewGTLF from '../../components/modelViewGLTF'
import ModelViewFBX from '../../components/modelViewFBX';
import ModelViewOBJ from '../../components/modelViewOBJ';
import Layout from '../../components/layout';

export default function Home() {
    const ref = useRef()
    return (
        <Layout title='3d View'>
        <div style={{paddingTop:'150px'}}>
            <div className='row'>
                <div className='col-md-4'>
                    <ModelViewGTLF scale={[20.1,20.1,20.1]} source={'/glb/shoe.glb'}/>
                </div>               
                
            </div> 
        </div>
        </Layout>
    )
}

/*

<div className='col-md-4'>
                     <ModelViewOBJ scale={[20.2,20.2,20.2]} source={'/glb/womens-bag/womens-bag.obj'} camera={{ position: [0, 0, 35] }}/>
                </div>
             
                <div className='col-md-4'>
                     <ModelViewFBX scale={[0.2,0.2,0.2]} source={'/glb/modern.FBX'} camera={{ position: [0, 0, 35] }}/>
                </div>

*/
