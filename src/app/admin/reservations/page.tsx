"use client";

import { AdminReservationsSection } from "@/components/AdminReservationsSection";

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-[var(--warm-black)]">
      {/* Header */}
      <div className="bg-[var(--charcoal)] border-b border-[var(--gold)]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--gold)] mb-2">
              Reservations Management
            </h1>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--gold)] to-transparent" />
            <p className="text-sm text-[var(--cream)]/60 mt-3">
              View and manage all restaurant reservations
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminReservationsSection />
      </div>
    </div>
  );
}
