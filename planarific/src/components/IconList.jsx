import { Icon } from './Icon';

export function IconList(props) {
  const {
    wireframeIcon,
    wireframe,
    toggleWireframe,
    resetIcon,
    resetCamera,
    coordinateIcon,
    clickCoords,
    resetClickCoords,
  } = props;
  return (
    <div id="icon-list">
      <Icon
        src={resetIcon}
        onClick={resetCamera}
      />
      <Icon
        src={wireframeIcon}
        colorDependent={wireframe}
        onClick={toggleWireframe}
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
      {clickCoords ? null : (
        <div className="coordinates">Click model to see coordinates</div>
      )}
    </div>
  );
}
