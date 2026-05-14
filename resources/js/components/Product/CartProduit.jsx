import "../../App.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, getCartTotals } from "../../redux/CartSlice";
import { toggleFavorite } from "../../redux/FavoriteSlice";
import useStorefrontContent from "../../hooks/useStorefrontContent";

function CartProduit({ id, img, titre, price }) {
  const dispatch = useDispatch();
  const { auth } = useStorefrontContent();
  const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);

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

    if (!auth?.isAuthenticated) {
      setShowFavoritePrompt(true);
      return;
    }

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

      {showFavoritePrompt && (
        <FavoriteLoginPrompt onClose={() => setShowFavoritePrompt(false)} />
      )}
    </div>
  );
}

function FavoriteLoginPrompt({ onClose }) {
  return (
    <div className="favorite-auth-prompt" role="dialog" aria-modal="true" aria-label="Connexion requise">
      <div className="favorite-auth-prompt__card">
        <button className="favorite-auth-prompt__close" type="button" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <strong>Connexion requise</strong>
        <p>Vous devez vous connecter ou créer un compte pour ajouter ce produit aux favoris.</p>
        <div className="favorite-auth-prompt__actions">
          <a href="/login">Se connecter</a>
          <a href="/register">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}

export default CartProduit;
