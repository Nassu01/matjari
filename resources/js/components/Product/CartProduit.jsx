import "../../App.css";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, getCartTotals } from "../../redux/CartSlice";
import { toggleFavorite } from "../../redux/FavoriteSlice";

function CartProduit({ id, img, titre, price }) {
  const dispatch = useDispatch();

  const isFav = useSelector((state) =>
    state.favorite?.items?.some((product) => product.id === id)
  );

  const safePrice = Number.isFinite(Number(price)) ? Number(price) : 0;

  const handleAdd = () => {
    if (id == null) {
      console.error("CartProduit: missing 'id' prop");
      return;
    }

    dispatch(
      addToCart({
        id,
        name: titre,
        price: safePrice,
        image: img,
      })
    );
    dispatch(getCartTotals());
  };

  const handleFav = () => {
    if (id == null) return;

    dispatch(
      toggleFavorite({
        id,
        name: titre,
        price: safePrice,
        image: img,
      })
    );
  };

  return (
    <div className="cartProduit">
      <div className="cartProduitImage">
        {img ? (
          <img src={img} alt={titre || "Product"} loading="lazy" />
        ) : (
          <div className="cartProduitNoImage">No image</div>
        )}
      </div>

      <div className="cartProduitDetails">
        <h1 title={titre}>{titre}</h1>
        <p className="price">{safePrice.toFixed(2)} DH</p>
        <p className="avis">avis</p>
      </div>

      <div className="cartProduitActions">
        <button className="add-btn" type="button" onClick={handleAdd}>
          Ajouter au panier
        </button>

        <button
          type="button"
          onClick={handleFav}
          className={`fav-btn ${isFav ? "is-fav" : ""}`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          title={isFav ? "Remove favorite" : "Add favorite"}
        >
          {isFav ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default CartProduit;
