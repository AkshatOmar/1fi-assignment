import { useState } from "react";
import HeroBanner from "../components/Layout/HeroBanner";
import ShopTabs from "../components/Shop/ShopTabs";
import SearchBar from "../components/Shop/SearchBar";
import TopBrandsPage from "./TopBrandsPage";
import NearbyStoresPage from "./NearbyStoresPage";
import MarketplacePage from "./MarketplacePage";

const TAB_CONTENT = {
  "top-brands": TopBrandsPage,
  "nearby-stores": NearbyStoresPage,
  "1fi-marketplace": MarketplacePage,
};

/**
 * Main Shop page – renders the hero banner, tab selector, search bar,
 * and the content for the active tab.
 */
export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("top-brands");
  const [searchValue, setSearchValue] = useState("");

  const ActiveTabContent = TAB_CONTENT[activeTab];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchValue(""); // reset search on tab switch
  };

  return (
    <div className="page-content" id="shop-page">
      <HeroBanner />

      <ShopTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Search bar only shown on Top Brands and Marketplace */}
      {activeTab !== "nearby-stores" && (
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder={
            activeTab === "1fi-marketplace"
              ? "Search products..."
              : "Search online stores..."
          }
        />
      )}

      <main
        id={`shop-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`shop-tab-${activeTab}`}
      >
        <ActiveTabContent searchQuery={searchValue} />
      </main>
    </div>
  );
}
