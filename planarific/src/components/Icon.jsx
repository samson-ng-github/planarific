export function Icon({ src, colorDependent, onClick }) {
  return (
    <img
      className="icon"
      src={src}
      onClick={onClick}
      style={colorDependent ? { backgroundColor: '#e47f63' } : null}
    />
  );
}
