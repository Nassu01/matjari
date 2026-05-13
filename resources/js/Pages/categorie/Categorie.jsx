import { Link } from "react-router-dom";

function Categorie({ icon, name, url = "/shop", forceDocumentNavigation = false }) {
  if (forceDocumentNavigation) {
    return (
      <a href={url} className="categorie">
        <span className="categorie-icon">{icon}</span>
        <span className="categorie-copy">
          <span className="categorie-name">{name}</span>
          <span className="categorie-meta">Explore products</span>
        </span>
        <span className="categorie-arrow" aria-hidden="true">›</span>
      </a>
    );
  }

  return (
    <Link to={url} className="categorie">
      <span className="categorie-icon">{icon}</span>
      <span className="categorie-copy">
        <span className="categorie-name">{name}</span>
        <span className="categorie-meta">Explore products</span>
      </span>
      <span className="categorie-arrow" aria-hidden="true">›</span>
    </Link>
  );
}

export default Categorie;
