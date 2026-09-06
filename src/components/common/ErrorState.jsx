/**
 * Reusable error / empty state display.
 *
 * @param {string}   icon     - Emoji or symbol to display (e.g. "⚠️", "🛒")
 * @param {string}   title    - Primary message
 * @param {string}   [message]  - Secondary descriptive text
 * @param {{ label: string, onClick: function }} [action] - Optional CTA button
 */
export default function ErrorState({ icon, title, message, action }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-state__icon" aria-hidden="true">{icon}</span>
      <p className="error-state__title">{title}</p>
      {message && <p className="error-state__message">{message}</p>}
      {action && (
        <button
          className="btn-primary error-state__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
