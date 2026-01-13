import { useEffect } from "react";

function QuickViewModal({ space, onClose }) {
  // 🔑 Keyboard support (ESC to close)
  useEffect(() => {
    if (!space) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [space, onClose]);

  // 🚫 Do not render if no space selected
  if (!space) return null;

  return (
    <div
      className="quickview-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div
        className="quickview-modal"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Image */}
        <div
          className="quickview-image"
          style={{ backgroundImage: `url(${space.image})` }}
        />

        {/* Content */}
        <div className="quickview-content">
          <h2 id="quickview-title">{space.name}</h2>
          <p className="muted">{space.location}</p>

          <div className="quickview-meta">
            <span>{space.hours}</span>
            <strong>₹ {space.price} / day</strong>
          </div>

          <button
            className="btn primary full"
            onClick={() => {
              onClose();
              // later → navigate to booking page
            }}
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
