import { Link } from "react-router-dom";

function Categorie({ icon, name, url = "/shop" }) {
  return (
    <Link to={url} className="categorie">
      <span className="categorie-icon">{icon}</span>
      <span className="categorie-name">{name}</span>
    </Link>
  );
}

export default Categorie;
