import { useState, useEffect, Suspense } from 'react';
import { getLogo } from '../api';

export function Logo() {
  const [logo, setLogo] = useState('');
  useEffect(() => {
    getLogo()
      .then((data) => {
        setLogo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Suspense fallback={null}>
      <img id="logo" src={logo}></img>
    </Suspense>
  );
}
