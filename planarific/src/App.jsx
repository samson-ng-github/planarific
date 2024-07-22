import { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './components/Model.jsx';
import { Lightings } from './components/Lightings.jsx';

function App() {
  return (
    <Canvas style={{ backgroundColor: 'black' }}>
      <Lightings />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
