import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store';


const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame((state, delta) => {
      //handle different screensizes
      const isBreakpoint = window.innerWidth <= 1260;
      const isMobile = window.innerWidth <= 600;

      //set initial position of model based on device size and which page we are on
      let targetPosition = [-0.4, 0 , 2];
      if(snap.intro) {
        if(isBreakpoint) targetPosition = [0,0,2]; //after passing breakpoint, shirt will shift left (-.4 => 0) to be more in column with text
        if(isMobile) targetPosition = [0,0.2, 2.5]; //if mobile then camera moves 'away' from shirt so it appears smaller and moves up so shirt shifts down a
      } else {
        if(isMobile) targetPosition = [0,0,2.5]; //make shirt appear smaller on customizer page for mobile
        else targetPosition = [0,0,2];
      }

      //set model camera position and smoothly respond to changes in targetPosition
      easing.damp3(state.camera.position, targetPosition, 0.25, delta)


      //set the model rotation and smoothly respond to shirt rotation
      easing.dampE(
          group.current.rotation, 
          [state.pointer.y / 10, 
          -state.pointer.x / 5, 0], 
          0.25,
          delta
      )
    })

  return <group ref={group}>{children}</group>
};

export default CameraRig;