import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, { Suspense } from 'react';
import Lights from '../Lights/Lights';
import { Iphone } from '../Iphone/Iphone';
import * as THREE from 'three'
import Loader from '../Loader/Loader';

const ModalView = ({index, item, size, groupRef, 
    gsapType, controlRef, setRotationState}) => {

    return (
        <View 
            index={index}
            id={gsapType}
            className={`w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}
        >
            {/* ambient light */}
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]}/>

            <Lights />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)} 
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngel())}
            />

            <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`} position={[0, 0, 0]}>
                <Suspense fallback={<Loader />}>
                    <Iphone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
};

export default ModalView;