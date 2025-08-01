import { useState, useEffect, useRef } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';
import SceneInit from './lib/SceneInit';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const audioRef = useRef(null);

  // Handle button click
  const handleButtonClick = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((err) => {
        console.warn('Playback blocked:', err);
      });
    }
  };

  // Restore audio time and save every second
  useEffect(() => {
    const audio = audioRef.current;

    // Restore time if saved
    const savedTime = localStorage.getItem('audioTime');
    if (audio && savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }

    // Save time every second
    const interval = setInterval(() => {
      if (audio && !audio.paused && !audio.ended) {
        localStorage.setItem('audioTime', audio.currentTime.toString());

        // Optional: reset if audio is near end
        if (audio.currentTime >= audio.duration - 1) {
          localStorage.removeItem('audioTime');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Trigger playback on user interaction (required by browsers)
  useEffect(() => {
    const handlePlay = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.load(); // iOS buffering
        const savedTime = localStorage.getItem('audioTime');
        if (savedTime) {
          audio.currentTime = parseFloat(savedTime);
        }

        audio.play().catch((err) => {
          console.warn('Playback blocked:', err);
        });
      }

      // Remove listener after first interaction
      window.removeEventListener('click', handlePlay);
    };

    window.addEventListener('click', handlePlay);
    return () => window.removeEventListener('click', handlePlay);
  }, []);

  // Initialize Three.js scene
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
      {!buttonClicked && (
        <div className='background'>
          <div className='openLetter'>
            <h2 style={{ textAlign: 'center' }}>Take Care Notes</h2>
            <div id='section1'>
              <p>How are u?</p>
              <p>Are u tired?</p>
              <p>Have u sleep well?</p>
              <p>Have u eaten well these days?</p>
            </div>
            <div id='section2'>
              <p>NieNie</p>
              <p>I may not be around all the time but remembering
                to treat urself kindly, sleep enough, eat enough, cuz I don't want to see u sick tho 🥹</p>
              <p>Pinky promise?</p>
            </div>
            <button
              style={{
                clear: 'both',
                width: '30%',
                margin: '380px auto 0 auto',
                display: 'block',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: '#52af55ff',
                color: 'white',
                border: 'none'
              }}
              type='submit'
              onClick={handleButtonClick}
            >
              Oke <i className="fa-regular fa-heart fa-bounce"></i>
            </button>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src='/mylight.m4a'
        autoPlay
        style={{ display: 'none' }}
        loop
      />

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
          <div style={{ display: 'flex', alignItems: 'center', height: '30px' }}>
            <p style={{ color: 'white' }}>I miss u, bro </p> &nbsp;
            <img src='/emoji.png' style={{ width: '30px', height: 'auto' }}></img>
          </div>
        </div>
      </div>

      <div className='message'>
        <button>
          <i className="fa-regular fa-message fa-beat fa-xl" style={{color: '#63E62E'}}></i>
        </button>
      </div>

      <canvas id="myThreeJsCanvas" />
    </div>
  );
}