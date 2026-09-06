import BrandCard from "../components/Shop/BrandCard";
import brandsData from "../data/brands.json";

/**
 * Top Brands tab content.
 * Shows a filterable list of brand cards.
 * @param {string} searchQuery - Current search query from parent
 */
export default function TopBrandsPage({ searchQuery = "" }) {
  const filteredBrands = brandsData.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section aria-label="Top Brands">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-md) var(--space-md) 0",
        }}
      >
        <h2 className="section-title">Top Brands</h2>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-tertiary)",
          }}
        >
          {filteredBrands.length} brands
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          padding: "var(--space-md)",
        }}
      >
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand, i) => (
            <BrandCard
              key={brand.id}
              brand={brand}
              index={i}
              onClick={() => {
                // No implementation needed per requirements
              }}
            />
          ))
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon">🔍</span>
            <p className="empty-state__title">No brands found</p>
            <p className="empty-state__subtitle">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
