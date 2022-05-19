import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF,useFBX } from '@react-three/drei'

export default function Car({ speed, factor, url, ...props }) {
    let fbx = useFBX('/glb/oddysey.FBX')

    console.log(fbx)
    return (
       <div>
           dd
       </div>

    )
}