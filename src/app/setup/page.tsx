"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, User, KeyRound, CheckCircle, ArrowRight, Home } from "lucide-react";

export default function AdminSetup() {
  const [completed, setCompleted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pin: "",
    confirmPin: "",
  });
  const [error, setError] = useState("");

  // Check if setup was already completed
  useEffect(() => {
    const setupDone = localStorage.getItem("cg_setup_completed");
    if (setupDone === "true") {
      setCompleted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email) {
      setError("Please fill in all fields");
      return;
    }

    if (form.pin.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    if (form.pin !== form.confirmPin) {
      setError("PINs do not match");
      return;
    }

    // Accept terms
    setStep(3);
  };

  const handleComplete = () => {
    localStorage.setItem("cg_setup_completed", "true");
    window.location.href = "/admin";
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-[var(--warm-black)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-md w-full text-center"
        >
          <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
          <h1 className="font-serif text-xl text-[var(--cream)] mb-2">Setup Already Completed</h1>
          <p className="text-sm text-[var(--cream)]/60 mb-6">
            The initial administrator account has already been set up.
            If you need to reconfigure, please use the Developer Dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <a href="/" className="py-3 rounded-xl gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center justify-center gap-2">
              <Home size={16} /> Return to Website
            </a>
            <a href="/developer" className="py-3 rounded-xl border border-[var(--gold)]/20 text-[var(--gold)] text-sm font-medium flex items-center justify-center gap-2">
              <Shield size={16} /> Developer Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--warm-black)] flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                step >= s ? "gold-bg text-[var(--warm-black)]" : "bg-white/5 text-[var(--cream)]/30"
              }`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 3 && (
                <div className={`w-8 h-[1px] transition-colors ${step > s ? "bg-[var(--gold)]" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="w-14 h-14 rounded-full gold-bg flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-[var(--warm-black)]" />
                </div>
                <h1 className="font-serif text-xl text-[var(--cream)] text-center mb-2">
                  Welcome to Casper & Gambini&apos;s
                </h1>
                <p className="text-xs text-[var(--cream)]/40 text-center mb-8">
                  Let&apos;s set up your first administrator account
                </p>

                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                  <div>
                    <label className="text-xs text-[var(--cream)]/50 mb-1 block">Administrator Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g., Restaurant Manager"
                      className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-xl px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--cream)]/50 mb-1 block">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="admin@casperandgambinis.com"
                      className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-xl px-4 py-3 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!form.name || !form.email}
                    className="w-full py-3 rounded-xl gold-bg text-[var(--warm-black)] text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="w-14 h-14 rounded-full gold-bg flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={24} className="text-[var(--warm-black)]" />
                </div>
                <h1 className="font-serif text-xl text-[var(--cream)] text-center mb-2">
                  Set Your PIN
                </h1>
                <p className="text-xs text-[var(--cream)]/40 text-center mb-8">
                  Choose a secure 4-digit PIN for admin access
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-[var(--cream)]/50 mb-1 block">Create PIN</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={form.pin}
                      onChange={(e) => setForm((p) => ({ ...p, pin: e.target.value.replace(/\D/g, "") }))}
                      placeholder="••••"
                      className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-white/5 border border-[var(--gold)]/10 rounded-xl px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--cream)]/50 mb-1 block">Confirm PIN</label>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={form.confirmPin}
                      onChange={(e) => setForm((p) => ({ ...p, confirmPin: e.target.value.replace(/\D/g, "") }))}
                      placeholder="••••"
                      className="w-full text-center text-2xl tracking-[0.5em] font-mono bg-white/5 border border-[var(--gold)]/10 rounded-xl px-4 py-3 text-[var(--cream)] placeholder:text-[var(--cream)]/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-400 text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl border border-[var(--gold)]/10 text-[var(--cream)]/50 text-sm hover:bg-white/5 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl gold-bg text-[var(--warm-black)] text-sm font-medium"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} className="text-green-400" />
                </div>
                <h1 className="font-serif text-xl text-[var(--cream)] text-center mb-2">
                  Setup Complete
                </h1>
                <p className="text-xs text-[var(--cream)]/40 text-center mb-6">
                  Administrator account has been created successfully
                </p>

                <div className="glass-card rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--cream)]/50">Name</span>
                    <span className="text-[var(--cream)]">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--cream)]/50">Email</span>
                    <span className="text-[var(--cream)]">{form.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--cream)]/50">Role</span>
                    <span className="text-[var(--gold)]">Administrator</span>
                  </div>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full py-3 rounded-xl gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Home size={16} /> Go to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-[9px] text-[var(--cream)]/15 mt-6">
          This setup can only be run once. Use Developer Dashboard to reset if needed.
        </p>
      </motion.div>
    </div>
  );
}
