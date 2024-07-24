export function Metadata({ model }) {
  return (
    <div id="metadata">
      {model.address1} {model.address2}
      <span id="desktop-only">{' • '}</span>
      <br id="mobile-only" />
      {model.city} • {model.state ? `${model.state} • ` : null}
      {model.postal_code}
    </div>
  );
}
