"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type ReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      specialRequests: "",
    });
  };

  const generateBookingCode = (): string => {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const xxxx = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `CG-${yy}${mm}${dd}-${xxxx}`;
  };

  const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (loading) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    console.log("OTP (development only):", newOtp);

    // Temporary until the OTP UI is implemented.
    // Continue with the existing reservation flow.

    try {
      // Generate booking code
      const bookingCode = generateBookingCode();

      // Insert into Supabase
      const { data, error } = await supabase.from("reservations").insert({
        booking_code: bookingCode,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        reservation_date: formData.date,
        reservation_time: formData.time,
        guests: parseInt(formData.guests),
        special_requests: formData.specialRequests,
        status: "Pending",
      });

      if (error) {
        console.error("Supabase Reservation Insert Error:", {
          message: error?.message,
          details: error?.details,
          hint: error?.hint,
          code: error?.code,
          fullError: error,
        });

        // Provide user-friendly error messages
        let displayError = error.message || "Failed to submit reservation. Please try again.";

        if (error.code === "42501" || error.message?.includes("permission")) {
          displayError =
            "Server permission error - reservations cannot be submitted at this time. Please contact support.";
        } else if (error.code === "PGRST116") {
          displayError =
            "Database access error. The reservations table may not be properly configured.";
        }

        setErrorMessage(displayError);
        setLoading(false);
        return;
      }

      // Success
      setSuccessMessage(
        "🎉 Reservation Created! Your reservation has been received successfully. Please keep an eye on your email inbox. Once our team confirms your reservation, you'll receive a confirmation email with your booking code. We look forward to welcoming you to Casper & Gambini's!"
      );

      setLoading(false);

      setTimeout(() => {
        resetForm();
        setSuccessMessage(null);
        onClose();
      }, 7000);

    } catch (err) {
      console.error("Unexpected error:", err);
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(errorMsg);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-[var(--charcoal)] p-8 shadow-2xl border border-[var(--gold)]/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[var(--gold)] mb-2">
              Reserve a Table
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-[var(--gold)] to-transparent" />
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
          >
            ×
          </button>
        </div>

        <p className="text-[var(--cream)]/70 mb-6 text-sm">
          Experience excellence at Casper & Gambini&apos;s. Reserve your table
          and let us make your dining unforgettable.
        </p>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 rounded-2xl border border-[var(--gold)]/40 bg-[var(--warm-black)] p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--warm-black)] text-2xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--gold)] mb-2">
                  Reservation Created!
                </h3>
                <p className="text-[var(--cream)] leading-7">
                  Your reservation has been received successfully.<br /><br />
                  Please keep an eye on your email inbox. Once our team confirms your reservation, you'll receive a confirmation email containing your booking code.
                  <br /><br />
                  We look forward to welcoming you to <span className="text-[var(--gold)] font-semibold">Casper & Gambini's</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        {!successMessage && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+234 (0) 000 0000"
              className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors"
            />
          </div>

          {/* Row 3: Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
                Reservation Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
                Reservation Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors"
              />
            </div>
          </div>

          {/* Row 4: Number of Guests */}
          <div>
            <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
              Number of Guests *
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23D4AF37' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem",
              }}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1} className="bg-[var(--charcoal)] text-[var(--cream)]">
                  {i + 1} {i === 0 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Row 5: Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-[var(--gold)] mb-2">
              Special Requests
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any dietary restrictions, allergies, or special occasions?"
              rows={4}
              className="w-full bg-black/40 border border-[var(--gold)]/30 rounded-lg px-4 py-3 text-[var(--cream)] placeholder-[var(--cream)]/40 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-1 focus:ring-[var(--gold)]/30 transition-colors resize-none"
            />
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-[var(--gold)]/0 via-[var(--gold)]/30 to-[var(--gold)]/0" />

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-[var(--gold)]/40 text-[var(--gold)] font-medium hover:bg-[var(--gold)]/5 hover:border-[var(--gold)]/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-[var(--gold)] text-[var(--warm-black)] font-semibold hover:bg-[var(--gold)]/90 transition-all shadow-lg hover:shadow-[var(--gold)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Reserve Table"}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}