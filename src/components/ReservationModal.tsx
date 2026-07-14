"use client";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-[var(--charcoal)] p-8 shadow-2xl border border-[var(--gold)]/20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[var(--gold)]">
            Reserve a Table
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-[var(--cream)] hover:text-[var(--gold)]"
          >
            ×
          </button>
        </div>

        <p className="text-[var(--cream)]/80">
          Welcome to Casper & Gambini&apos;s reservation system.
        </p>
      </div>
    </div>
  );
}