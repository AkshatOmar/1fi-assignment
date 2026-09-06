import { useReducer, useEffect, useRef } from "react";
import { getProducts, getProduct } from "../services/productApi";

// Shared async state reducer — avoids synchronous setState calls inside effects
function asyncReducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return { data: action.data, loading: false, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

/**
 * Fetches the product list, with optional category filter.
 * Delegates to productApi.getProducts() — swap the service to use a real backend.
 *
 * @param {string|null} category - Category filter ("All" or null means no filter)
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
export function useProducts(category = null) {
  const [state, dispatch] = useReducer(asyncReducer, {
    data: [],
    loading: true,
    error: null,
  });
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;

    getProducts(category)
      .then((result) => {
        if (requestId.current === id) {
          dispatch({ type: "SUCCESS", data: result });
        }
      })
      .catch(() => {
        if (requestId.current === id) {
          dispatch({ type: "ERROR", error: "Failed to load products. Please try again." });
        }
      });
  }, [category]);

  return state;
}

/**
 * Fetches a single product by ID.
 * Delegates to productApi.getProduct() — swap the service to use a real backend.
 *
 * @param {string} id - Product ID
 * @returns {{ data: Object|null, loading: boolean, error: string|null }}
 */
export function useProduct(id) {
  const [state, dispatch] = useReducer(asyncReducer, {
    data: null,
    loading: true,
    error: null,
  });
  const requestId = useRef(0);

  useEffect(() => {
    const reqId = ++requestId.current;

    getProduct(id)
      .then((product) => {
        if (requestId.current === reqId) {
          if (!product) {
            dispatch({ type: "ERROR", error: "Product not found." });
          } else {
            dispatch({ type: "SUCCESS", data: product });
          }
        }
      })
      .catch(() => {
        if (requestId.current === reqId) {
          dispatch({ type: "ERROR", error: "Failed to load product details. Please try again." });
        }
      });
  }, [id]);

  return state;
}
