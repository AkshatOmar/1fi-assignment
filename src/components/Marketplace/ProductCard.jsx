import { useNavigate } from "react-router-dom";
import { formatINR, calcDiscount, generateEmiPlans } from "../../data/emiPlans";

/**
 * Product card in the marketplace grid.
 * @param {Object} product - Product data object
 * @param {number} index - Animation delay index
 */
export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { id, name, images, variants, maxEmiMonths, tags } = product;

  const defaultVariant = variants[0];
  const discount = calcDiscount(defaultVariant.price, defaultVariant.mrp);
  const emiPlans = generateEmiPlans(defaultVariant.price, maxEmiMonths);
  // Longest tenure = lowest monthly instalment
  const cheapestEmi = emiPlans[emiPlans.length - 1];

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/shop/marketplace/${id}`)}
      role="button"
      tabIndex={0}
      aria-label={`${name}, starting ₹${defaultVariant.price.toLocaleString("en-IN")}`}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/shop/marketplace/${id}`)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="product-card__image-wrap">
        {tags?.[0] && (
          <span className="product-card__tag" aria-hidden="true">
            {tags[0]}
          </span>
        )}
        <img
          src={images[0]}
          alt={name}
          className="product-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x300/f0f0f0/999999?text=No+Image";
          }}
        />
      </div>

      {/* Body */}
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>

        <div className="product-card__price-row">
          <span className="product-card__price">
            {formatINR(defaultVariant.price)}
          </span>
          {discount > 0 && (
            <>
              <span className="product-card__mrp">
                {formatINR(defaultVariant.mrp)}
              </span>
              <span className="product-card__discount">{discount}% off</span>
            </>
          )}
        </div>

        {cheapestEmi && (
          <div className="product-card__emi" aria-label="EMI available">
            <span>✦</span>
            <span>
              No-cost EMI from {formatINR(cheapestEmi.monthlyAmount)}/mo
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
