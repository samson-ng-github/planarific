import { useState, useEffect, useRef, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Model } from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';
import { Glow } from './components/Glow.jsx';
import { getLogo, getModels, getModel, getThumb } from './api';
import * as THREE from 'three';

function App() {
  const [logo, setLogo] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);
  const [wireframe, setWireframe] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const orbitref = useRef();

  useEffect(() => {
    getLogo().then((data) => {
      setLogo(data);
    });

    getModel()
      .then((data) => {
        setModel(data);
      })
      .catch((err) => {
        console.log(err);
      });

    getModels()
      .then((data) => {
        const promises = data.map((model) => {
          return getThumb(model.thumbnail);
        });
        return Promise.all([data, ...promises]);
      })
      .then((data) => {
        const modelsWithBlobs = [...data[0]];
        for (let i = 0; i < modelsWithBlobs.length; i++)
          modelsWithBlobs[i].blob = data[i + 1];
        setModels(modelsWithBlobs);
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
      <Suspense fallback={'loading...'}>
        <img id="logo" src={logo}></img>
      </Suspense>
      <button
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
      <Suspense fallback={'loading...'}>
        <ul>
          {models.map((model) => {
            return (
              <li key={model.id}>
                <img
                  src={model.blob}
                  onClick={() => {
                    getNewModel('/v1/models/' + model.id);
                  }}
                />
                {model.description}
              </li>
            );
          })}{' '}
        </ul>
      </Suspense>
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
    </>
  );
}

export default App;
