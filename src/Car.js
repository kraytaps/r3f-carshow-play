import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + 'models/car/scene.gltf'
    );
    console.log(gltf)

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [gltf]);

    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        let meshes = gltf.scene.children[0].children[0].children[0];

        const rimFL = meshes.children[0];
        const rimRL = meshes.children[2];
        const rimRR = meshes.children[4];
        const rimFR = meshes.children[6];
        
        rimFL.rotation.x = t * 2;
        rimRL.rotation.x = t * 2;
        rimRR.rotation.x = t * 2;
        rimFR.rotation.x = t * 2;
        
    })

    return <primitive object={gltf.scene}/>
}