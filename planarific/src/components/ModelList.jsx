import { useState, useEffect, Suspense } from 'react';
import { getModels, getThumb } from '../api';
import { ModelThumb } from './ModelThumb';

export function ModelList({ getNewModel }) {
  const [models, setModels] = useState([]);
  useEffect(() => {
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

  return (
    <ul id="model-list">
      {models.map((model) => {
        return (
          <ModelThumb
            key={model.id}
            description={model.description}
            blob={model.blob}
            id={model.id}
            getNewModel={getNewModel}
          />
        );
      })}
    </ul>
  );
}
