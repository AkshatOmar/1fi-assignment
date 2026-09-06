const TABS = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "1fi-marketplace", label: "1Fi Marketplace" },
];

/**
 * Tab bar for the Shop page.
 * @param {string} activeTab - ID of currently active tab
 * @param {function} onTabChange - Callback with new tab ID
 */
export default function ShopTabs({ activeTab, onTabChange }) {
  return (
    <div className="shop-tabs">
      <div className="shop-tabs__list" role="tablist" aria-label="Shop sections">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`shop-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`shop-panel-${tab.id}`}
            className={`shop-tabs__tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
