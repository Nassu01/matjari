export default function Header({ title, subtitle, right }) {
  return (
    <div className="header">
      <div className="header-container">
        <div>
          <h1 className="header-title">
            {title}
          </h1>

          {subtitle && (
            <p className="header-subtitle">{subtitle}</p>
          )}
        </div>

        {right && <div className="header-right">{right}</div>}
      </div>
    </div>
  );
}
