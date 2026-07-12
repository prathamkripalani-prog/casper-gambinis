"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, User, KeyRound, LogIn, AlertCircle } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PIN = "5092";
const DEVELOPER_PIN = "1234";

type Role = "administrator" | "developer" | null;

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const pinInputRef = useRef<HTMLInputElement>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setError("");
    setPin("");
    setTimeout(() => pinInputRef.current?.focus(), 100);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validPin =
      selectedRole === "administrator" ? ADMIN_PIN : DEVELOPER_PIN;

    if (pin === validPin) {
      // Successful login - redirect to dashboard
      const dashboardPath =
        selectedRole === "administrator" ? "/admin" : "/developer";
      onClose();
      window.location.href = dashboardPath;
    } else {
      setError("Invalid PIN. Please try again.");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin("");
      }, 600);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setPin("");
    setError("");
  };

  const handleClose = () => {
    setSelectedRole(null);
    setPin("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            {/* Glass card */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Background gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--warm-black-2)]/95 to-[var(--warm-black)]/95 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--gold)]/5" />

              {/* Gold border */}
              <div className="absolute inset-0 rounded-2xl border border-[var(--gold)]/15" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

              {/* Content */}
              <div className="relative p-8">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-[var(--cream)]/40 hover:text-[var(--gold)] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full gold-bg flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-[var(--warm-black)]" />
                </div>

                <h2 className="font-serif text-xl text-[var(--cream)] text-center mb-1">
                  Administrator Access
                </h2>
                <p className="text-xs text-[var(--cream)]/40 text-center mb-8">
                  Secure portal for restaurant management
                </p>

                <AnimatePresence mode="wait">
                  {!selectedRole ? (
                    /* Role Selection */
                    <motion.div
                      key="role-select"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => handleRoleSelect("administrator")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[var(--gold)]/30 transition-all duration-300 group text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                          <User size={18} className="text-[var(--gold)]" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                            Administrator
                          </p>
                          <p className="text-[10px] text-[var(--cream)]/40 mt-0.5">
                            Manage menu, events, gallery & content
                          </p>
                        </div>
                        <LogIn
                          size={16}
                          className="ml-auto text-[var(--gold)]/30 group-hover:text-[var(--gold)] transition-colors"
                        />
                      </button>

                      <button
                        onClick={() => handleRoleSelect("developer")}
                        className="w-full flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[var(--gold)]/30 transition-all duration-300 group text-left"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 flex items-center justify-center group-hover:bg-[var(--gold)]/20 transition-colors">
                          <Shield size={18} className="text-[var(--gold)]" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors">
                            Developer
                          </p>
                          <p className="text-[10px] text-[var(--cream)]/40 mt-0.5">
                            Full system access & configuration
                          </p>
                        </div>
                        <LogIn
                          size={16}
                          className="ml-auto text-[var(--gold)]/30 group-hover:text-[var(--gold)] transition-colors"
                        />
                      </button>
                    </motion.div>
                  ) : (
                    /* PIN Entry */
                    <motion.div
                      key="pin-entry"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Selected role indicator */}
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={handleBack}
                          className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors flex items-center gap-1"
                        >
                          ← Back
                        </button>
                        <span className="text-xs text-[var(--cream)]/50 flex items-center gap-1.5">
                          <KeyRound size={10} />
                          {selectedRole === "administrator"
                            ? "Administrator"
                            : "Developer"}
                        </span>
                      </div>

                      <form onSubmit={handlePinSubmit} className="space-y-4">
                        <div className="relative">
                          <input
                            ref={pinInputRef}
                            type="password"
                            inputMode="numeric"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => {
                              setPin(e.target.value.replace(/\D/g, ""));
                              setError("");
                            }}
                            placeholder="Enter PIN"
                            className={`w-full text-center text-2xl tracking-[0.5em] font-mono bg-white/5 border rounded-xl px-4 py-4 text-[var(--cream)] placeholder:text-[var(--cream)]/20 focus:outline-none transition-all duration-300 ${
                              error
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-[var(--gold)]/20 focus:border-[var(--gold)]"
                            }`}
                            autoComplete="off"
                          />
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs text-red-400 flex items-center justify-center gap-1.5"
                          >
                            <AlertCircle size={12} />
                            {error}
                          </motion.p>
                        )}

                        <motion.button
                          type="submit"
                          disabled={pin.length < 4}
                          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                            pin.length < 4
                              ? "bg-white/5 text-[var(--cream)]/30 cursor-not-allowed"
                              : "gold-bg text-[var(--warm-black)] hover:shadow-lg hover:shadow-[var(--gold)]/25"
                          }`}
                        >
                          Access Dashboard
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer note */}
                <p className="text-[9px] text-[var(--cream)]/20 text-center mt-6">
                  Authorized personnel only. All access is logged.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
