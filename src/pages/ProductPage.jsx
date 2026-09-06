import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmiSelector from "../components/Marketplace/EmiSelector";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorState from "../components/common/ErrorState";
import { useProduct } from "../hooks/useProducts";
import { calcDiscount, formatINR, generateEmiPlans } from "../data/emiPlans";

/**
 * Product Detail page.
 *
 * State machine:
 *   loading → skeleton
 *   error   → ErrorState
 *   ready   → full page
 *     └─ plan selected → sticky CTA shows plan summary + Proceed
 *         └─ Proceed clicked → inline "Plan confirmed" toast
 */
export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useProduct(id);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planConfirmed, setPlanConfirmed] = useState(false);

  // ── Loading ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="product-detail">
        <button
          className="product-detail__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>
        <SkeletonCard variant="detail" />
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="product-detail">
        <button
          className="product-detail__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>
        <ErrorState
          icon="⚠️"
          title="Product not found"
          message={error || "This product doesn't exist."}
          action={{ label: "Go Back", onClick: () => navigate(-1) }}
        />
      </div>
    );
  }

  // ── Derived state ────────────────────────────────────────
  const { name, brand, description, images, variants, specs, tags, maxEmiMonths } = product;
  const selectedVariant = variants[selectedVariantIndex];
  const discount = calcDiscount(selectedVariant.price, selectedVariant.mrp);
  const emiPlans = generateEmiPlans(selectedVariant.price, maxEmiMonths);

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index);
    setSelectedPlan(null);
    setPlanConfirmed(false);
  };

  const handleProceed = () => {
    if (selectedPlan) setPlanConfirmed(true);
  };

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="product-detail" id="product-detail-page">
      {/* Back button */}
      <button
        className="product-detail__back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to marketplace"
      >
        ←
      </button>

      {/* Product images */}
      <div className="product-detail__image-section">
        <img
          src={images[selectedImageIndex]}
          alt={`${name} – view ${selectedImageIndex + 1}`}
          className="product-detail__main-image"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x300/f0f0f0/999999?text=No+Image";
          }}
        />

        {images.length > 1 && (
          <div
            className="product-detail__image-tabs"
            role="tablist"
            aria-label="Product images"
          >
            {images.map((_, i) => (
              <button
                key={i}
                className={`product-detail__image-dot${selectedImageIndex === i ? " active" : ""}`}
                onClick={() => setSelectedImageIndex(i)}
                role="tab"
                aria-selected={selectedImageIndex === i}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="product-detail__body">
        <p className="product-detail__brand" aria-label={`Brand: ${brand}`}>{brand}</p>
        <h1 className="product-detail__name">{name}</h1>

        {/* Price */}
        <div className="product-detail__price-block">
          <span className="product-detail__price">{formatINR(selectedVariant.price)}</span>
          {discount > 0 && (
            <>
              <span className="product-detail__mrp">{formatINR(selectedVariant.mrp)}</span>
              <span className="product-detail__discount-badge">{discount}% off</span>
            </>
          )}
        </div>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="tags-row" aria-label="Product tags">
            {tags.map((tag) => (
              <span key={tag} className="chip chip-purple">{tag}</span>
            ))}
          </div>
        )}

        <div className="divider-thick" />

        {/* Variant selector */}
        <div className="variant-section">
          <p className="variant-section__title">Select Variant</p>
          <div className="variant-list" role="group" aria-label="Product variants">
            {variants.map((variant, i) => (
              <button
                key={variant.id}
                id={`variant-${variant.id}`}
                className={`variant-chip${selectedVariantIndex === i ? " selected" : ""}`}
                onClick={() => handleVariantChange(i)}
                aria-pressed={selectedVariantIndex === i}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider-thick" />

        {/* Description */}
        <div className="product-detail__section">
          <h2 className="product-detail__section-title">About this product</h2>
          <p className="product-detail__section-body">{description}</p>
        </div>

        <div className="divider-thick" />

        {/* Specifications */}
        <div className="specs-section">
          <h2 className="specs-section__title">Specifications</h2>
          <div className="specs-table" role="table" aria-label="Product specifications">
            {specs.map((spec) => (
              <div key={spec.label} className="specs-row" role="row">
                <span className="specs-row__label" role="rowheader">{spec.label}</span>
                <span className="specs-row__value" role="cell">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider-thick" />

        {/* EMI Selector */}
        <div className="product-detail__section">
          <EmiSelector
            plans={emiPlans}
            selectedPlan={selectedPlan}
            onSelect={(plan) => {
              setSelectedPlan(plan);
              setPlanConfirmed(false);
            }}
          />
        </div>

        {/* Bottom spacing for fixed CTA */}
        <div style={{ height: 130 }} />
      </div>

      {/* ── Sticky CTA ────────────────────────────────── */}
      <div className="sticky-cta">
        {planConfirmed ? (
          /* Confirmed state */
          <div className="sticky-cta__confirmed" aria-live="polite">
            <div className="sticky-cta__confirmed-icon" aria-hidden="true">✓</div>
            <div className="sticky-cta__confirmed-info">
              <span className="sticky-cta__confirmed-title">
                {selectedPlan.tenureMonths}-month No-cost EMI selected
              </span>
              <span className="sticky-cta__confirmed-amount">
                {formatINR(selectedPlan.monthlyAmount)}/month
              </span>
            </div>
            <button
              className="sticky-cta__change-btn"
              onClick={() => setPlanConfirmed(false)}
            >
              Change
            </button>
          </div>
        ) : (
          /* Selection state */
          <>
            <div className="sticky-cta__summary" aria-live="polite">
              <span className="sticky-cta__label">
                {selectedPlan
                  ? `${selectedPlan.tenureMonths}-month EMI`
                  : "Select an EMI plan"}
              </span>
              <span className="sticky-cta__value">
                {selectedPlan
                  ? `${formatINR(selectedPlan.monthlyAmount)}/mo`
                  : formatINR(selectedVariant.price)}
              </span>
            </div>
            <button
              id="proceed-cta"
              className="btn-primary"
              onClick={handleProceed}
              disabled={!selectedPlan}
              aria-label={
                selectedPlan
                  ? `Proceed with ${selectedPlan.tenureMonths}-month EMI at ${formatINR(selectedPlan.monthlyAmount)} per month`
                  : "Select an EMI plan to proceed"
              }
            >
              {selectedPlan ? "Proceed with this Plan →" : "Select an EMI Plan to Continue"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
