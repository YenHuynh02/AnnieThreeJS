import { useState, useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';
import SceneInit from './lib/SceneInit';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // let loadedModel;
    const glftLoader = new GLTFLoader();
    glftLoader.load('/assets/wrapped_flower_bouquet/scene.gltf', (gltfScene) => {
      // loadedModel = gltfScene;
      // console.log(loadedModel);
      gltfScene.scene.position.y = 3.5;
      gltfScene.scene.scale.set(10, 10, 10);
      test.scene.add(gltfScene.scene);
      setLoading(false);
    });


    // const animate = () => {
    //   if (loadedModel) {
    //     loadedModel.scene.rotation.x += 0.01;
    //     loadedModel.scene.rotation.y += 0.01;
    //     loadedModel.scene.rotation.z += 0.01;
    //   }
    //   requestAnimationFrame(animate);
    // };
    // animate();

    test.animate();

  }, []);

  return (
    <div>
      {loading &&
        <div className="loading">
          <img src='/hi.gif'></img>
        </div>
      }

      <div className='info'>
        <h2>Happy Birthday Annie💐</h2>
      </div>

      <div className='musicBox'>
        <img src='/musicImg.jpeg' alt='Music Icon' />
        <div id='musicText'>
          <p>Now playing <i class="fa-solid fa-chart-simple fa-fade"></i></p>
          <p>my light (我的光)</p>
        </div>
      </div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}