/**
 * Renders one or more animated skeleton cards for loading states.
 * Use in grids (count > 1) or as a single detail-page skeleton (count = 1).
 *
 * @param {number} count    - Number of cards to render (default 1)
 * @param {'grid'|'detail'} variant - Layout variant
 */
export default function SkeletonCard({ count = 1, variant = "grid" }) {
  if (variant === "detail") {
    return (
      <div className="skeleton-detail" aria-busy="true" aria-label="Loading product">
        <div className="skeleton skeleton-detail__image" />
        <div className="skeleton-detail__body">
          <div className="skeleton skeleton-detail__line" style={{ width: "40%" }} />
          <div className="skeleton skeleton-detail__line" style={{ width: "80%" }} />
          <div className="skeleton skeleton-detail__line" style={{ width: "60%" }} />
          <div className="skeleton skeleton-detail__line" style={{ width: "50%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-card__image" />
          <div className="skeleton-card__body">
            <div className="skeleton skeleton-card__line" style={{ width: "90%" }} />
            <div className="skeleton skeleton-card__line" style={{ width: "70%" }} />
            <div className="skeleton skeleton-card__line" />
          </div>
        </div>
      ))}
    </div>
  );
}
