import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb'); //get object info

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)); //smoothly update shirt color when there is a change

  const stateString = JSON.stringify(snap); //used as key to track changes to state and re-render. we stringify to ensure React considers the contents and not just the identify of 'snap'

  return (
    <group 
      key={stateString}   
    >
        <mesh
            castShadow //enable object shadows
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1} //how shiny the material appears
            dispose={null} //prevent three.js from disposing of material 
        >
          {snap.isFullTexture && (
            <Decal
              position={[0,0,0]} //if full texture then texture will be centered on shirt
              rotation={[0,0,0]}
              scale={1} //full texture will be same size as mesh
              map={fullTexture}
            />
          )}

          {snap.isLogoTexture && (
            <Decal
              position={[0,0.04,0.15]} //if logo then texture will be slightly above and in front of chest
              rotation={[0,0,0]}
              scale={0.15} 
              map={logoTexture}
              map-anisotropy={16} //ensure logo looks good from different angles and distances
              depthTest={false} //will ensure decal is rendered on top of shirt material regardles of other object being front of it
              depthWrite={true} //decal will write to depth buffer and obscure objects behind it - in this case the shirt material
            />
          )}
        </mesh>
    </group>
  );
};

export default Shirt;