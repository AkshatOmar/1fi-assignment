import EmiPlanCard from "./EmiPlanCard";
import { formatINR } from "../../data/emiPlans";

/**
 * EMI plan selector section — renders a 2-column grid of tenure options
 * and a summary row once the user picks one.
 *
 * @param {Array}        plans        - EMI plan objects from generateEmiPlans()
 * @param {Object|null}  selectedPlan - Currently active plan, or null
 * @param {function}     onSelect     - Called with the chosen plan object
 */
export default function EmiSelector({ plans, selectedPlan, onSelect }) {
  if (!plans || plans.length === 0) return null;

  return (
    <section className="emi-section" aria-labelledby="emi-section-heading">
      <div className="emi-section__header">
        <div className="emi-section__icon" aria-hidden="true">✦</div>
        <div className="emi-section__title-group">
          <h2 id="emi-section-heading" className="emi-section__title">
            No-Cost EMI Plans
          </h2>
          <p className="emi-section__subtitle">
            0% interest · Backed by your mutual funds
          </p>
        </div>
      </div>

      <div className="emi-list" role="group" aria-label="EMI tenure options">
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.tenureMonths}
            plan={plan}
            selected={selectedPlan?.tenureMonths === plan.tenureMonths}
            onSelect={() => onSelect(plan)}
          />
        ))}
      </div>

      {/* Summary – only shown once a plan is selected */}
      {selectedPlan && (
        <div
          className="emi-summary"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="emi-summary__row">
            <span>Monthly payment</span>
            <span className="emi-summary__value">
              {formatINR(selectedPlan.monthlyAmount)} × {selectedPlan.tenureMonths}
            </span>
          </div>
          <div className="emi-summary__total">
            <span>Total Payable</span>
            <span className="emi-summary__total-value">
              {formatINR(selectedPlan.totalAmount)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
