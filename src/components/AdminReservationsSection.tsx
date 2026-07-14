"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { RefreshCw, Users } from "lucide-react";

type Reservation = {
  id: string;
  booking_code: string;
  name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed" | "No Show";
};

interface AdminReservationsSectionProps {
  showToast?: (msg: string, type?: "success" | "error") => void;
  compact?: boolean;
}

export function AdminReservationsSection({ showToast, compact = false }: AdminReservationsSectionProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);

    try {
      console.group("🔍 Reservations Fetch Debug");
      console.log("⏱️ Timestamp:", new Date().toISOString());
      console.log("📍 Supabase Project:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("🔑 Auth Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

      const query = supabase
        .from("reservations")
        .select("*")
        .order("reservation_date", { ascending: true })
        .order("reservation_time", { ascending: true });

      console.log("📋 Query Details:");
      console.log("  - Table: reservations");
      console.log("  - Select: *");
      console.log("  - Order: reservation_date, reservation_time (ascending)");

      const { data, error: fetchError } = await query;

      console.log("✅ Query executed");
      console.log("📦 Data returned:", data);
      console.log("❌ Error returned:", fetchError);

      if (fetchError) {
        console.error("🚨 Supabase Error Details:", {
          message: fetchError.message,
          code: fetchError.code,
          details: fetchError.details,
          hint: fetchError.hint,
        });
        console.error(
          "📌 Note: If error mentions 'relation does not exist' or 'permission denied', check RLS policies in Supabase dashboard"
        );
        setError(
          fetchError.message ||
            "Failed to fetch reservations. Check browser console for details."
        );
        console.groupEnd();
        return;
      }

      console.log("✨ Success! Reservations fetched:", {
        count: data?.length || 0,
        firstItem: data?.[0] || "No data",
      });
      console.groupEnd();

      setReservations(data || []);
    } catch (err) {
      console.error("💥 Unexpected error:", err);
      console.error("Error details:", {
        type: err instanceof Error ? err.constructor.name : typeof err,
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : "N/A",
      });
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const getStatusColor = (
    status: "Pending" | "Confirmed" | "Cancelled" | "Completed" | "No Show"
  ) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400";
      case "Confirmed":
        return "bg-green-500/10 border border-green-500/30 text-green-400";
      case "Cancelled":
        return "bg-red-500/10 border border-red-500/30 text-red-400";
      case "Completed":
        return "bg-blue-500/10 border border-blue-500/30 text-blue-400";
      case "No Show":
        return "bg-gray-500/10 border border-gray-500/30 text-gray-400";
      default:
        return "bg-gray-500/10 border border-gray-500/30 text-gray-400";
    }
  };

  const countByStatus = (status: string) => {
    return reservations.filter((r) => r.status === status).length;
  };

  const summaryCards = [
    {
      label: "Total Reservations",
      count: reservations.length,
      bgColor: "bg-[var(--gold)]/10",
      borderColor: "border-[var(--gold)]/30",
      textColor: "text-[var(--gold)]",
    },
    {
      label: "Pending",
      count: countByStatus("Pending"),
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
    },
    {
      label: "Confirmed",
      count: countByStatus("Confirmed"),
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
    },
    {
      label: "Cancelled",
      count: countByStatus("Cancelled"),
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
    },
  ];

  const handleRefresh = () => {
    fetchReservations();
    if (showToast) {
      showToast("Reservations refreshed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Reservations</h2>
          <p className="text-sm text-[var(--cream)]/50">Manage all table reservations</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--gold)] text-[var(--warm-black)] font-semibold hover:bg-[var(--gold)]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <p className="font-semibold mb-2">⚠️ Error Loading Reservations</p>
          <p>{error}</p>
          {error.includes("permission") && (
            <p className="text-xs mt-3 text-red-300/80">
              💡 <strong>Tip:</strong> This error often means Row Level Security (RLS) policies are
              blocking access. Check the browser console for full error details and verify RLS
              policies are configured for the reservations table.
            </p>
          )}
        </div>
      )}

      {/* Summary Cards */}
      {!loading && !error && reservations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} ${card.borderColor} border rounded-xl p-5 transition-transform hover:scale-105`}
            >
              <p className="text-xs text-[var(--cream)]/70 mb-2">{card.label}</p>
              <p className={`text-2xl font-bold ${card.textColor}`}>{card.count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin">
            <RefreshCw size={32} className="text-[var(--gold)]" />
          </div>
          <p className="text-[var(--cream)]/70 mt-4">Loading reservations...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && reservations.length === 0 && !error && (
        <div className="text-center py-12">
          <Users size={40} className="mx-auto text-[var(--gold)]/30 mb-4" />
          <p className="text-[var(--cream)]/70 text-lg">No reservations found</p>
        </div>
      )}

      {/* Reservations Table */}
      {!loading && reservations.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-[var(--gold)]/20 bg-black/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--gold)]/20 bg-black/40">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Booking Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap hidden md:table-cell">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Time
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Guests
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--gold)] whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr
                  key={reservation.id}
                  className={`border-b border-[var(--gold)]/10 transition-colors hover:bg-black/30 ${
                    index % 2 === 0 ? "bg-black/20" : "bg-transparent"
                  }`}
                >
                  <td className="px-4 py-3 text-xs text-[var(--cream)] font-mono">
                    {reservation.booking_code}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--cream)]">
                    {reservation.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--cream)] hidden md:table-cell">
                    {reservation.phone}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--cream)]">
                    {new Date(
                      reservation.reservation_date
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--cream)]">
                    {reservation.reservation_time}
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <span className="inline-block px-2 py-1 rounded bg-[var(--gold)]/20 border border-[var(--gold)]/30 text-[var(--gold)]">
                      {reservation.guests}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
