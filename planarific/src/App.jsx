import { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Model } from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';
import { Glow } from './components/Glow.jsx';
import { Logo } from './components/Logo.jsx';
import { Background } from './components/Background.jsx';
import { ModelList } from './components/ModelList.jsx';
import * as THREE from 'three';
import { getModel } from './api';
import resetIcon from './assets/reset.png';
import wireframeIcon from './assets/wireframe.png';
import coordinateIcon from './assets/coordinate.png';
import { Icon } from './components/Icon.jsx';

function App() {
  const [model, setModel] = useState('');
  const [wireframe, setWireframe] = useState(false);
  const [isCameraMoved, setIsCameraMoved] = useState(false);
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
    setClickCoords(null);
    getModel(url)
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetCamera = () => {
    orbitref.current.reset();
    setClickCoords(null);
    setIsCameraMoved(false);
  };

  const toggleWireframe = () => {
    setWireframe(!wireframe);
  };

  const handleControlsChange = () => {
    setIsCameraMoved(true);
  };

  return (
    <>
      <Canvas camera={{ position: [50, 30, 0], fov: 75 }}>
        <Background />
        <Lightings />
        <Suspense fallback={null}>
          <Center>
            <Model
              model={model.model}
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
          maxDistance={400}
          onChange={handleControlsChange}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
      <Logo />
      <ModelList getNewModel={getNewModel} />
      {model ? (
        <div id="metadata">
          {model.address1} {model.address2} • {model.city} • {model.state} •{' '}
          {model.postal_code}
        </div>
      ) : null}
      <div id="icon-list">
        <Icon
          src={wireframeIcon}
          colorDependent={wireframe}
          onClick={toggleWireframe}
        />
        <Icon
          src={resetIcon}
          colorDependent={isCameraMoved}
          onClick={resetCamera}
        />
        <Icon src={coordinateIcon} colorDependent={clickCoords} />
        {clickCoords ? (
          <div className="coordinates">{clickCoords[0].toFixed(2)}</div>
        ) : null}
        {clickCoords ? (
          <div className="coordinates">{clickCoords[1].toFixed(2)}</div>
        ) : null}
        {clickCoords ? (
          <div className="coordinates">{clickCoords[2].toFixed(2)}</div>
        ) : null}
      </div>
    </>
  );
}

export default App;
