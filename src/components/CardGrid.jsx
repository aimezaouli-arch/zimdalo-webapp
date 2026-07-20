export default function CardGrid({ items }) {
  return (
    <div className="tools-grid">
      {items.map((item, i) => (
        <div className="tool-card" key={i}>
          <div className="tool-icon">{item[0]}</div>
          <h4>{item[1]}</h4>
          <p>{item[2]}</p>
        </div>
      ))}
    </div>
  );
}
