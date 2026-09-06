/**
 * Hero Banner – matches the 1Fi app's purple gradient header
 * "Shop today, Pay later using Mutual funds."
 */
export default function HeroBanner() {
  return (
    <header className="hero-banner" role="banner">
      <div className="hero-banner__content">
        <div className="hero-banner__badge" aria-label="No-cost EMIs promotion">
          ✦ NO-COST EMIs
        </div>
        <h1 className="hero-banner__title">
          Shop today,{" "}
          <em>Pay later using</em>
          <br />
          Mutual funds.
        </h1>
        <p className="hero-banner__subtitle">
          No credit score required. No interest.
          <br />
          Backed by your investments.
        </p>
      </div>

      {/* Decorative illustration using CSS-generated placeholder */}
      <div className="hero-banner__illustration" aria-hidden="true">
        <div className="hero-illustration">
          <span className="hero-illustration__item hero-illustration__car">🚗</span>
          <span className="hero-illustration__item hero-illustration__phone">📱</span>
          <span className="hero-illustration__item hero-illustration__laptop">💻</span>
          <span className="hero-illustration__item hero-illustration__bag">🛍️</span>
          <span className="hero-illustration__coin hero-illustration__coin1">💰</span>
          <span className="hero-illustration__coin hero-illustration__coin2">💰</span>
          <span className="hero-illustration__coin hero-illustration__coin3">💰</span>
        </div>
      </div>

      <style>{`
        .hero-banner__content {
          position: relative;
          z-index: 2;
          max-width: 55%;
        }
        .hero-banner__illustration {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .hero-illustration {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .hero-illustration__item {
          position: absolute;
          font-size: 36px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.25));
        }
        .hero-illustration__car {
          bottom: 30px;
          right: 10px;
          font-size: 44px;
          animation: floatCar 3s ease-in-out infinite;
        }
        .hero-illustration__phone {
          top: 20px;
          right: 20px;
          font-size: 32px;
          animation: floatPhone 2.5s ease-in-out infinite 0.4s;
        }
        .hero-illustration__laptop {
          top: 30px;
          right: 55px;
          font-size: 28px;
          animation: floatPhone 2.8s ease-in-out infinite 0.8s;
        }
        .hero-illustration__bag {
          bottom: 25px;
          right: 55px;
          font-size: 36px;
          animation: floatCar 3.2s ease-in-out infinite 0.2s;
        }
        .hero-illustration__coin {
          position: absolute;
          font-size: 20px;
          animation: spinCoin 2s linear infinite;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .hero-illustration__coin1 { top: 55px; right: 45px; animation-delay: 0s; }
        .hero-illustration__coin2 { top: 80px; right: 15px; animation-delay: 0.6s; }
        .hero-illustration__coin3 { bottom: 60px; right: 30px; animation-delay: 1.2s; }
        @keyframes floatCar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatPhone {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-6px) rotate(5deg); }
        }
        @keyframes spinCoin {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}
