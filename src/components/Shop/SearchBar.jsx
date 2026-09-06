/**
 * Search bar with magnifier icon.
 * @param {string} value - Current search input value
 * @param {function} onChange - Callback on input change
 * @param {string} placeholder - Placeholder text
 */
export default function SearchBar({ value, onChange, placeholder = "Search online stores..." }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <input
        id="shop-search"
        type="search"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}
