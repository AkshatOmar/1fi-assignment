/**
 * Brand list card – replicates the 1Fi app's Top Brands card style.
 * @param {{ id, name, subtitle, logo, bgColor }} brand
 * @param {function} onClick
 * @param {number} index - animation delay index
 */
export default function BrandCard({ brand, onClick, index = 0 }) {
  const { name, subtitle, logo, bgColor } = brand;

  return (
    <article
      className="brand-card"
      role="button"
      tabIndex={0}
      aria-label={`${name}: ${subtitle}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        className="brand-card__logo-wrap"
        style={{ background: bgColor || "#f0f0f0" }}
        aria-hidden="true"
      >
        <img
          src={logo}
          alt=""
          className="brand-card__logo"
          onError={(e) => {
            // Fallback: show first letter of brand name
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <span
          style={{
            display: "none",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          {name[0]}
        </span>
      </div>

      <div className="brand-card__info">
        <p className="brand-card__name">{name}</p>
        <p className="brand-card__subtitle">{subtitle}</p>
      </div>

      <span
        style={{
          marginLeft: "auto",
          color: "var(--text-tertiary)",
          fontSize: 20,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        ›
      </span>
    </article>
  );
}
