import { formatINR } from "../../data/emiPlans";

/**
 * Single EMI plan option in the selector grid.
 *
 * @param {import('../../data/emiPlans').EmiPlan} plan - EMI plan object
 * @param {boolean}  selected  - Whether this plan is currently active
 * @param {function} onSelect  - Called when the user picks this plan
 */
export default function EmiPlanCard({ plan, selected, onSelect }) {
  const { tenureMonths, monthlyAmount } = plan;

  return (
    <button
      type="button"
      id={`emi-plan-${tenureMonths}`}
      className={`emi-plan-card${selected ? " selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${tenureMonths} months EMI, ${formatINR(monthlyAmount)} per month`}
    >
      {/* Selection indicator */}
      <span className="emi-plan-card__check" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>

      {/* Tenure */}
      <div className="emi-plan-card__tenure">{tenureMonths} Months</div>

      {/* Monthly amount */}
      <div
        className="emi-plan-card__amount"
        aria-label={`${formatINR(monthlyAmount)} per month`}
      >
        {formatINR(monthlyAmount)}
      </div>
      <div className="emi-plan-card__per-month">/ month</div>

      {/* No-cost badge — always shown since all 1Fi EMIs are no-cost */}
      <span className="emi-plan-card__badge zero" aria-hidden="true">
        No Cost
      </span>
    </button>
  );
}
