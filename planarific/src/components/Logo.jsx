import { useState, useEffect } from 'react';
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
  return <>{logo ? <img id="logo" src={logo}></img> : null}</>;
}
