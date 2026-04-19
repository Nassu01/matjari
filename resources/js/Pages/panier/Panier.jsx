import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  getCartTotals,
} from "../../redux/CartSlice";

export default function Panier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], totalQuantity = 0, totalAmount = 0 } = useSelector(
    (state) => state.cart || {}
  );

  useEffect(() => {
    dispatch(getCartTotals());
  }, [dispatch, products]);

  const isEmpty = !products || products.length === 0;
  const money = (value) => `$${Number(value || 0).toFixed(2)}`;

  if (isEmpty) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-card">
            <div className="empty-icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6h15l-1.5 9h-12L6 6Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6 5 3H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h2 className="empty-title">Your cart is empty</h2>
            <p className="empty-subtitle">
              Browse products and add something to your cart.
            </p>

            <Link className="btn btn-black" to="/shop">
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-top">
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">Review your items and adjust quantities.</p>
          </div>
        </div>

        <div className="cart-grid">
          <div className="card">
            <div className="table-head">
              <div className="th th-product">PRODUCTS</div>
              <div className="th">PRICE</div>
              <div className="th">QUANTITY</div>
              <div className="th">SUBTOTAL</div>
              <div className="th th-remove">REMOVE</div>
            </div>

            <div className="table-body">
              {products.map((product) => (
                <div className="row" key={product.id}>
                  <div className="cell product">
                    <div className="img-box">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <span className="no-img">No image</span>
                      )}
                    </div>

                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-meta">In stock | Fast delivery</div>
                    </div>
                  </div>

                  <div className="cell price">{money(product.price)}</div>

                  <div className="cell qty">
                    <div className="qty-box">
                      <button
                        className="qty-btn"
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                        type="button"
                      >
                        -
                      </button>
                      <div className="qty-value">{product.quantity}</div>
                      <button
                        className="qty-btn"
                        onClick={() => dispatch(increaseQuantity(product.id))}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cell subtotal">{money(product.totalPrice)}</div>

                  <div className="cell remove">
                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      type="button"
                      aria-label="Remove item"
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button
                className="btn btn-outline"
                onClick={() => dispatch(clearCart())}
                type="button"
              >
                Clear Cart
              </button>

              <Link className="continue" to="/shop">
                Continue shopping
              </Link>
            </div>
          </div>

          <aside className="card summary">
            <div className="summary-head">Order Summary</div>

            <div className="summary-body">
              <div className="summary-row">
                <span>Total Items:</span>
                <strong>{totalQuantity}</strong>
              </div>

              <div className="summary-box">
                <div className="summary-row">
                  <span>Shipping:</span>
                  <strong>Free</strong>
                </div>

                <div className="summary-row small">
                  <span>Shipping to:</span>
                  <span>
                    Marrakech, Morocco{" "}
                    <button className="change" type="button">
                      change address
                    </button>
                  </span>
                </div>
              </div>

              <div className="summary-total">
                <span>Total Price:</span>
                <strong>{money(totalAmount)}</strong>
              </div>

              <button
                className="btn btn-black btn-full"
                type="button"
                onClick={() => navigate("/checkout")}
              >
                Proceed to checkout
              </button>

              <div className="summary-foot">
                <span>Secure checkout</span>
                <strong>24/7 Support</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
