import './App.css';
import * as THREE from 'three';
import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Model } from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';
import { Glow } from './components/Glow.jsx';
import { Logo } from './components/Logo.jsx';
import { Background } from './components/Background.jsx';
import { ModelList } from './components/ModelList.jsx';
import { CircularLoader } from './components/CircularLoader.jsx';
import { Metadata } from './components/Metadata.jsx';
import { IconList } from './components/IconList.jsx';
import { getModel } from './api';
import resetIcon from './assets/reset.png';
import wireframeIcon from './assets/wireframe.png';
import coordinateIcon from './assets/coordinate.png';

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
    getModel(url)
      .then((data) => {
        setModel(data);
        resetCamera();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetCamera = () => {
    orbitref.current.reset();
    setClickCoords(null);
    setWireframe(false);
  };

  const toggleWireframe = () => {
    setWireframe(!wireframe);
  };

  const resetClickCoords = () => {
    setClickCoords(null);
  };

  return (
    <>
      <Canvas camera={{ position: [50, 30, 0], fov: 75 }}>
        <Background />
        <Lightings />
        <Suspense>
          <Center>
            {model ? (
              <Model
                model={model.model}
                wireframe={wireframe}
                clickCoords={clickCoords}
                setClickCoords={setClickCoords}
              />
            ) : null}
          </Center>
        </Suspense>
        <Glow clickCoords={clickCoords} />
        <OrbitControls
          makeDefault
          ref={orbitref}
          maxDistance={400}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
      <CircularLoader />
      <Logo />
      <ModelList getNewModel={getNewModel} />
      <Metadata model={model} />
      <IconList
        wireframeIcon={wireframeIcon}
        wireframe={wireframe}
        toggleWireframe={toggleWireframe}
        resetIcon={resetIcon}
        resetCamera={resetCamera}
        coordinateIcon={coordinateIcon}
        clickCoords={clickCoords}
        resetClickCoords={resetClickCoords}
      />
    </>
  );
}

export default App;
