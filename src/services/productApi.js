// ============================================================
//  productApi – mock API layer for 1Fi Marketplace
//
//  All functions return Promises to mirror a real fetch() call.
//  To switch to a live backend, replace the body of each
//  function while keeping the same signatures.
// ============================================================

import productsData from "../data/products.json";

/** Simulated network delay (ms) */
const MOCK_DELAY = 600;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all products, optionally filtered by category.
 *
 * @param {string|null} category - Category name, or null / "All" for no filter
 * @returns {Promise<Array>}
 */
export async function getProducts(category = null) {
  await delay(MOCK_DELAY);
  if (category && category !== "All") {
    return productsData.filter((p) => p.category === category);
  }
  return productsData;
}

/**
 * Fetch a single product by its ID.
 *
 * @param {string} id - Product ID
 * @returns {Promise<Object|null>} The product, or null if not found
 */
export async function getProduct(id) {
  await delay(MOCK_DELAY - 200); // detail load is slightly faster
  return productsData.find((p) => p.id === id) ?? null;
}
