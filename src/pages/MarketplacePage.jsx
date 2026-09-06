import { useState } from "react";
import ProductCard from "../components/Marketplace/ProductCard";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorState from "../components/common/ErrorState";
import { useProducts } from "../hooks/useProducts";

const CATEGORIES = ["All", "Electronics", "Appliances"];

/**
 * 1Fi Marketplace tab – product listing with category filter and search.
 *
 * @param {string} searchQuery - Current search query forwarded from ShopPage
 */
export default function MarketplacePage({ searchQuery = "" }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products, loading, error } = useProducts(activeCategory);

  // Client-side search filter (category filtering is handled in the API layer)
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section aria-label="1Fi Marketplace">
      {/* Category filter chips */}
      <div className="category-filter" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`category-${cat.toLowerCase().replace(/ /g, "-")}`}
            className={`category-filter__chip${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <SkeletonCard count={6} />}

      {/* Error */}
      {!loading && error && (
        <ErrorState
          icon="⚠️"
          title="Something went wrong"
          message={error}
        />
      )}

      {/* Product grid */}
      {!loading && !error && (
        <>
          <div className="section-header">
            <h2 className="section-header__title">1Fi Marketplace</h2>
            <span className="section-header__count">
              {filteredProducts.length} products
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon">🛒</span>
              <p className="empty-state__title">No products found</p>
              <p className="empty-state__subtitle">
                Try a different search or category
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
