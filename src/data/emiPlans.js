// ============================================================
//  EMI plan configuration and utility functions
//
//  1Fi's model: all EMIs are no-cost (0% interest, no fees).
//  The monthly amount is simply price divided by tenure.
// ============================================================

/** Available EMI tenures in months */
export const EMI_TENURES = [3, 6, 9, 12, 18, 24];

/**
 * @typedef {Object} EmiPlan
 * @property {number} tenureMonths   - Number of monthly instalments
 * @property {number} interestRate   - Always 0 for 1Fi no-cost EMI
 * @property {number} monthlyAmount  - Amount due each month (rounded up)
 * @property {number} totalAmount    - Total payable (monthlyAmount × tenureMonths)
 */

/**
 * Generates no-cost EMI options for a given price.
 * Only tenures up to maxMonths are included.
 *
 * @param {number} price       - Product price in INR
 * @param {number} maxMonths   - Maximum tenure allowed for this product
 * @returns {EmiPlan[]}
 */
export function generateEmiPlans(price, maxMonths) {
  return EMI_TENURES.filter((t) => t <= maxMonths).map((tenureMonths) => {
    const monthlyAmount = Math.ceil(price / tenureMonths);
    return {
      tenureMonths,
      interestRate: 0,
      monthlyAmount,
      totalAmount: monthlyAmount * tenureMonths,
    };
  });
}

/**
 * Formats a number as Indian Rupees.
 * e.g. 134900 → "₹1,34,900"
 *
 * @param {number} amount
 * @returns {string}
 */
export function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Calculates discount percentage between sale price and MRP.
 *
 * @param {number} price - Sale price
 * @param {number} mrp   - Original / maximum retail price
 * @returns {number} Rounded percentage, or 0 if mrp is invalid
 */
export function calcDiscount(price, mrp) {
  if (mrp <= 0) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
