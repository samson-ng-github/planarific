import { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Model } from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';
import { getModel } from './api';
import * as THREE from 'three';

function App() {
  const [model, setModel] = useState('');
  const [wireframe, setWireframe] = useState(false);
  const orbitref = useRef();

  useEffect(() => {
    getModel()
      .then((data) => {
        console.log(data);
        setModel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <button
        onClick={() => {
          orbitref.current.reset();
        }}
      >
        Reset camera
      </button>
      <button onClick={() => setWireframe(!wireframe)}>Toggle Wireframe</button>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <Lightings />
        <Suspense fallback={null}>
          <Center>
            <Model model={model} wireframe={wireframe} />
          </Center>
        </Suspense>
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
    </>
  );
}

export default App;
