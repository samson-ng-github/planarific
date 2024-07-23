import { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Model } from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';
import { Glow } from './components/Glow.jsx';
import { Logo } from './components/Logo.jsx';
import { ModelList } from './components/ModelList.jsx';
import { getModels, getModel, getThumb } from './api';
import * as THREE from 'three';

function App() {
  const [model, setModel] = useState('');
  const [wireframe, setWireframe] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const orbitref = useRef();

  useEffect(() => {
    getModel()
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getNewModel = (url) => {
    console.log(url);
    getModel(url)
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <button
        onClick={() => {
          orbitref.current.reset();
        }}
      >
        Reset camera
      </button>
      <button onClick={() => setWireframe(!wireframe)}>Toggle Wireframe</button>
      <div>
        {`x:${clickCoords ? clickCoords[0].toFixed(2) : null} y:${
          clickCoords ? clickCoords[1].toFixed(2) : null
        }  z:${clickCoords ? clickCoords[2].toFixed(2) : null} `}
      </div>
       */}
      <Canvas camera={{ position: [20, 20, 20] }}>
        <Lightings />
        <Suspense fallback={null}>
          <Center>
            <Model
              model={model}
              wireframe={wireframe}
              clickCoords={clickCoords}
              setClickCoords={setClickCoords}
            />
          </Center>
        </Suspense>
        {clickCoords ? <Glow clickCoords={clickCoords} /> : null}
        <OrbitControls
          makeDefault
          ref={orbitref}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
      <Logo />
      <ModelList getNewModel={getNewModel}/>
    </>
  );
}

export default App;
