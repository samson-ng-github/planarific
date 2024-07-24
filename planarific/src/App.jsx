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
import { CircularLoader } from './components/CircularLoader.jsx';
import { AnimatedControls } from './components/AnimatedControls.jsx';

function App() {
  const [model, setModel] = useState('');
  const [wireframe, setWireframe] = useState(false);
  const [isCameraMoved, setIsCameraMoved] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [initialCameraState, setInitialCameraState] = useState({
    position: [30, 30, 0],
    rotation: [0, 0, 0],
  });
  const [resetFlag, setResetFlag] = useState(false);

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
    setResetFlag(true);
    setTimeout(() => setResetFlag(false), 100);
    setClickCoords(null);
    setIsCameraMoved(false);
  };

  const toggleWireframe = () => {
    setWireframe(!wireframe);
  };

  const resetClickCoords = () => {
    setClickCoords(null);
  };

  const handleControlsChange = () => {
    setIsCameraMoved(true);
  };

  return (
    <>
      <Canvas>
        <AnimatedControls
          initialCameraState={initialCameraState}
          handleControlsChange={handleControlsChange}
          resetFlag={resetFlag}
        />
        <Background />
        <Lightings />
        <Suspense>
          {model ? (
            <Center>
              <Model
                model={model.model}
                wireframe={wireframe}
                clickCoords={clickCoords}
                setClickCoords={setClickCoords}
              />
            </Center>
          ) : null}
        </Suspense>
        {clickCoords ? <Glow clickCoords={clickCoords} /> : null}
        {/* <OrbitControls
          makeDefault
          maxDistance={400}
          onChange={handleControlsChange}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        /> */}
      </Canvas>
      <CircularLoader />
      <Logo />
      <ModelList getNewModel={getNewModel} />
      {model ? (
        <div id="metadata">
          {model.address1} {model.address2}
          <span id="desktop-only">{' • '}</span>
          <br id="mobile-only" />
          {model.city} • {model.state ? `${model.state} • ` : null}
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
        <Icon
          src={coordinateIcon}
          colorDependent={clickCoords}
          onClick={resetClickCoords}
        />
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
