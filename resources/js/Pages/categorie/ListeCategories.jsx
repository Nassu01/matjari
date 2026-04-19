import Categorie from "./Categorie";

const fallbackCategories = [
  { icon: "PH", label: "Telephone & Tablet", url: "/shop" },
  { icon: "TV", label: "TV & High Tech", url: "/shop" },
  { icon: "PC", label: "Computing", url: "/shop" },
  { icon: "HM", label: "Home, Kitchen & Office", url: "/shop" },
];

function ListeCategories({ items = fallbackCategories }) {
  return (
    <div className="liste-categories">
      {items.map((cat, index) => (
        <Categorie
          key={index}
          icon={cat.icon || cat.label?.slice(0, 2)?.toUpperCase() || "CT"}
          name={cat.name || cat.label}
          url={cat.url || "/shop"}
        />
      ))}
    </div>
  );
}

export default ListeCategories;
