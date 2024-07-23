export function ModelThumb({ description, blob, id, getNewModel }) {
  return (
    <li className="model-li">
      <p className="model-description">{description}</p>
      <img
        className="model-thumb"
        src={blob}
        onClick={() => {
          getNewModel('/v1/models/' + id);
        }}
      />
    </li>
  );
}
