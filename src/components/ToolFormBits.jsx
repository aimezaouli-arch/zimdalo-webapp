export function FieldGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, marginBottom: 8, color: "var(--ink)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function PillLightRow({ options, selected, onSelect }) {
  return (
    <div className="pill-row">
      {options.map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={`pill-light${selected === value ? " selected" : ""}`}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
