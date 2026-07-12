"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Utensils,
  Wine,
  Image as ImageIcon,
  Calendar,
  Star,
  Settings,
  Clock,
  MapPin,
  LogOut,
  Menu,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  ChevronDown,
  Globe,
  ExternalLink,
  Users,
  Shield,
  Database,
  FileCode,
  BarChart3,
  AlertTriangle,
  Upload,
  Home,
  Download,
  Upload as ImportIcon,
  Power,
  RotateCcw,
  Terminal,
  Eye,
  CheckCircle,
  X,
  Search,
  UserPlus,
  UserMinus,
  Key,
  Copy,
} from "lucide-react";
import { useEffect } from "react";
import { foodMenu } from "@/data/foodMenu";
import { beverageMenu } from "@/data/beverageMenu";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/data/foodMenu";

// Types
type Section =
  | "overview" | "food-menu" | "beverage-menu" | "gallery" | "events"
  | "reviews" | "hours" | "seo" | "analytics"
  | "users" | "security" | "backup" | "file-manager" | "api"
  | "performance" | "cache" | "maintenance" | "dev-settings";

interface NavItem {
  id: Section;
  label: string;
  icon: React.ElementType;
  category: "content" | "system" | "developer";
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, category: "content" },
  { id: "food-menu", label: "Food Menu", icon: Utensils, category: "content" },
  { id: "beverage-menu", label: "Beverage Menu", icon: Wine, category: "content" },
  { id: "gallery", label: "Gallery", icon: ImageIcon, category: "content" },
  { id: "events", label: "Events", icon: Calendar, category: "content" },
  { id: "reviews", label: "Reviews", icon: Star, category: "content" },
  { id: "hours", label: "Opening Hours", icon: Clock, category: "content" },
  { id: "seo", label: "SEO", icon: Globe, category: "system" },
  { id: "analytics", label: "Analytics", icon: BarChart3, category: "system" },
  { id: "users", label: "User Management", icon: Users, category: "developer" },
  { id: "security", label: "Security", icon: Shield, category: "developer" },
  { id: "backup", label: "Backup & Restore", icon: Database, category: "developer" },
  { id: "file-manager", label: "File Manager", icon: FileCode, category: "developer" },
  { id: "api", label: "API Settings", icon: Settings, category: "developer" },
  { id: "performance", label: "Performance", icon: BarChart3, category: "developer" },
  { id: "cache", label: "Cache", icon: RefreshCw, category: "developer" },
  { id: "maintenance", label: "Maintenance", icon: AlertTriangle, category: "developer" },
  { id: "dev-settings", label: "Dev Settings", icon: Terminal, category: "developer" },
];

function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-[80] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
        type === "success"
          ? "bg-green-500/10 border border-green-500/20 text-green-400"
          : "bg-red-500/10 border border-red-500/20 text-red-400"
      }`}
    >
      {type === "success" ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
      <span className="text-sm">{message}</span>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center mb-3">
        <Icon size={18} className="text-[var(--warm-black)]" />
      </div>
      <p className="text-2xl font-serif font-bold text-[var(--cream)]">{value}</p>
      <p className="text-xs text-[var(--cream)]/50 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-[var(--gold)]/60 mt-0.5">{sub}</p>}
    </div>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, danger = false }: {
  open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-xl p-6 max-w-sm w-full"
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
          danger ? "bg-red-500/10" : "bg-[var(--gold)]/10"
        }`}>
          {danger ? <AlertTriangle size={20} className="text-red-400" /> : <CheckCircle size={20} className="text-[var(--gold)]" />}
        </div>
        <h3 className="font-serif text-lg text-[var(--cream)] mb-2">{title}</h3>
        <p className="text-sm text-[var(--cream)]/60 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg text-sm border border-white/10 text-[var(--cream)]/70 hover:bg-white/5">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 py-2.5 rounded-lg text-sm font-medium text-white ${
            danger ? "bg-red-500 hover:bg-red-600" : "gold-bg text-[var(--warm-black)]"
          }`}>Confirm</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function DeveloperDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [confirmState, setConfirmState] = useState<{
    open: boolean; title: string; message: string; onConfirm: () => void; danger?: boolean;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  }, []);

  // Admin-accessible stats
  const totalFood = foodMenu.reduce((s, c) => s + c.items.length, 0);
  const totalBeverage = beverageMenu.reduce((s, c) => s + c.items.length, 0);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DevOverview showToast={showToast} stats={{ totalFood, totalBeverage }} />;
      case "users":
        return <UserManagement showToast={showToast} setConfirm={setConfirmState} />;
      case "security":
        return <SecurityDashboard showToast={showToast} />;
      case "backup":
        return <BackupRestore showToast={showToast} />;
      case "file-manager":
        return <FileManager showToast={showToast} />;
      case "api":
        return <APISettings showToast={showToast} />;
      case "performance":
        return <PerformanceDashboard />;
      case "cache":
        return <CacheManager showToast={showToast} />;
      case "maintenance":
        return <MaintenanceMode showToast={showToast} setConfirm={setConfirmState} />;
      case "dev-settings":
        return <DevSettings showToast={showToast} setConfirm={setConfirmState} />;
      default:
        return (
          <div className="text-center py-16">
            <Settings size={40} className="mx-auto text-[var(--gold)]/30 mb-4" />
            <p className="text-[var(--cream)]/60">Section under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--warm-black)] flex">
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
      <ConfirmDialog {...confirmState} onCancel={() => setConfirmState((p) => ({ ...p, open: false }))} />

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[var(--warm-black-2)] border-r border-[var(--gold)]/10 overflow-y-auto dashboard-scroll transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-4 border-b border-[var(--gold)]/10">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-serif font-bold">
              <span className="text-gradient">C</span>
              <span className="text-[var(--cream)]">&</span>
              <span className="text-gradient">G</span>
            </span>
            <div>
              <p className="font-serif text-xs text-[var(--cream)] leading-tight">Dashboard</p>
              <p className="text-[8px] text-[var(--gold)] tracking-widest uppercase">Developer</p>
            </div>
          </a>
        </div>

        <nav className="p-3 space-y-1">
          <p className="text-[10px] text-[var(--cream)]/30 uppercase tracking-wider px-3 pt-4 pb-2 font-medium">Content</p>
          {navItems.filter((n) => n.category === "content").map((item) => (
            <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === item.id ? "bg-[var(--gold)]/10 text-[var(--gold)]" : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
              }`}
            ><item.icon size={16} /> {item.label}</button>
          ))}

          <p className="text-[10px] text-[var(--cream)]/30 uppercase tracking-wider px-3 pt-6 pb-2 font-medium">System</p>
          {navItems.filter((n) => n.category === "system").map((item) => (
            <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === item.id ? "bg-[var(--gold)]/10 text-[var(--gold)]" : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
              }`}
            ><item.icon size={16} /> {item.label}</button>
          ))}

          <p className="text-[10px] text-[var(--gold)]/40 uppercase tracking-wider px-3 pt-6 pb-2 font-medium border-t border-[var(--gold)]/10 mt-4">Developer Tools</p>
          {navItems.filter((n) => n.category === "developer").map((item) => (
            <button key={item.id} onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === item.id ? "bg-[var(--gold)]/10 text-[var(--gold)]" : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
              }`}
            ><item.icon size={16} /> {item.label}</button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--gold)]/10 bg-[var(--warm-black-2)]">
          <a href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] hover:bg-white/5 transition-all w-full">
            <ExternalLink size={14} /> View Website
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-30 glass-dark px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--cream)]/60 hover:text-[var(--gold)] transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-medium text-[var(--cream)] capitalize hidden sm:block">{activeSection.replace("-", " ")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/admin" className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors flex items-center gap-1">
              <Eye size={12} /> Admin View
            </a>
            <a href="/" className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors flex items-center gap-1">
              <ExternalLink size={12} /> View Site
            </a>
            <div className="w-8 h-8 rounded-full gold-bg flex items-center justify-center">
              <span className="text-xs font-bold text-[var(--warm-black)]">D</span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

// ======== DEVELOPER SECTIONS ========

function DevOverview({ showToast, stats }: { showToast: (msg: string, type?: "success" | "error") => void; stats: { totalFood: number; totalBeverage: number } }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Developer Dashboard</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Full system access — Proceed with caution</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Utensils} label="Food Items" value={stats.totalFood} />
        <StatCard icon={Wine} label="Beverage Items" value={stats.totalBeverage} />
        <StatCard icon={Users} label="Admin Accounts" value="3" sub="1 super admin" />
        <StatCard icon={Shield} label="Security Score" value="A+" sub="All checks passing" />
      </div>

      {/* System Status */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h3 className="font-serif text-lg text-[var(--cream)] mb-4">System Status</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Application", status: "Healthy", color: "text-green-400" },
            { label: "Database", status: "Connected", color: "text-green-400" },
            { label: "Cache", status: "Operational", color: "text-green-400" },
            { label: "File Storage", status: "Active", color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-sm text-[var(--cream)]/70">{s.label}</span>
              <span className={`text-xs font-medium ${s.color}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-serif text-lg text-[var(--cream)] mb-4">Developer Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Database, label: "Backup Database", section: "backup" },
            { icon: RefreshCw, label: "Clear Cache", section: "cache" },
            { icon: Shield, label: "Security Scan", section: "security" },
            { icon: Power, label: "Maintenance Mode", section: "maintenance" },
          ].map((action) => (
            <button key={action.label} onClick={() => showToast(`Navigate to ${action.section} section`)}
              className="flex items-center gap-3 p-3 rounded-lg border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-sm text-[var(--cream)]/70 hover:text-[var(--gold)] text-left"
            >
              <action.icon size={16} className="text-[var(--gold)]" /> {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserManagement({ showToast, setConfirm }: {
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@casperandgambinis.com", role: "Administrator", status: "Active" },
    { id: 2, name: "Manager", email: "manager@casperandgambinis.com", role: "Administrator", status: "Active" },
    { id: 3, name: "Developer", email: "dev@casperandgambinis.com", role: "Developer", status: "Active" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Administrator" });

  const handleCreate = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: Date.now(), ...newUser, status: "Active" }]);
    setNewUser({ name: "", email: "", role: "Administrator" });
    setShowForm(false);
    showToast("User created successfully");
  };

  const handleDelete = (id: number) => {
    setConfirm({
      open: true, title: "Delete User", message: "Remove this user? They will lose all access.",
      danger: true,
      onConfirm: () => {
        setUsers(users.filter((u) => u.id !== id));
        showToast("User deleted");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">User Management</h2>
          <p className="text-sm text-[var(--cream)]/50">Create, manage, and delete administrator accounts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        ><UserPlus size={16} /> Add User</button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card rounded-xl p-5 space-y-3">
              <input type="text" value={newUser.name} onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full name" className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30" />
              <input type="email" value={newUser.email} onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                placeholder="Email address" className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30" />
              <select value={newUser.role} onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
                className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
              >
                <option value="Administrator">Administrator</option>
                <option value="Developer">Developer</option>
              </select>
              <button onClick={handleCreate} disabled={!newUser.name || !newUser.email}
                className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium disabled:opacity-30"
              >Create Account</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[var(--gold)]/10">
          <div className="flex items-center gap-3">
            <Search size={14} className="text-[var(--cream)]/30" />
            <input type="text" placeholder="Search users..." className="bg-transparent text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none w-full" />
          </div>
        </div>
        <div className="divide-y divide-[var(--gold)]/5">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gold-bg flex items-center justify-center">
                  <span className="text-xs font-bold text-[var(--warm-black)]">{user.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm text-[var(--cream)] font-medium">{user.name}</p>
                  <p className="text-xs text-[var(--cream)]/40">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  user.role === "Developer" ? "bg-purple-500/10 text-purple-400" : "bg-[var(--gold)]/10 text-[var(--gold)]"
                }`}>{user.role}</span>
                <span className="text-[10px] text-green-400/80">{user.status}</span>
                <button onClick={() => handleDelete(user.id)}
                  className="p-1.5 rounded-lg text-[var(--cream)]/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                  <UserMinus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityDashboard({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Security Dashboard</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Monitor and manage security settings</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Failed Logins (24h)", value: "3", status: "low" },
          { label: "Active Sessions", value: "2", status: "ok" },
          { label: "Security Score", value: "95/100", status: "good" },
          { label: "Last Security Scan", value: "2 hours ago", status: "ok" },
          { label: "Encryption Status", value: "Active", status: "good" },
          { label: "2FA Status", value: "Disabled", status: "warning" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xs text-[var(--cream)]/40 mb-1">{s.label}</p>
            <p className={`text-lg font-serif font-bold ${
              s.status === "good" ? "text-green-400" : s.status === "warning" ? "text-amber-400" : "text-[var(--cream)]"
            }`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h3 className="font-serif text-base text-[var(--cream)]">Security Actions</h3>
        {[
          { label: "Run Security Scan", icon: Shield },
          { label: "View Audit Logs", icon: FileCode },
          { label: "Manage API Keys", icon: Key },
          { label: "Enable Two-Factor Auth", icon: Shield },
        ].map((action) => (
          <button key={action.label} onClick={() => showToast(`${action.label} initiated`)}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-sm text-[var(--cream)]/70 hover:text-[var(--gold)]"
          ><action.icon size={16} /> {action.label}</button>
        ))}
      </div>
    </div>
  );
}

function BackupRestore({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [backups, setBackups] = useState([
    { id: 1, name: "Full Backup 2026-07-11", size: "156 MB", date: "July 11, 2026" },
    { id: 2, name: "Full Backup 2026-07-10", size: "152 MB", date: "July 10, 2026" },
    { id: 3, name: "Database Only 2026-07-09", size: "23 MB", date: "July 9, 2026" },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Backup & Restore</h2>
          <p className="text-sm text-[var(--cream)]/50">Manage database backups and restore points</p>
        </div>
        <button onClick={() => showToast("Backup initiated")}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        ><Database size={16} /> Create Backup</button>
      </div>

      {/* Backup Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Download, label: "Export Data", desc: "Download complete data export" },
          { icon: ImportIcon, label: "Import Data", desc: "Restore from uploaded file" },
          { icon: RotateCcw, label: "Restore Latest", desc: "Recover from latest backup" },
        ].map((action) => (
          <button key={action.label} onClick={() => showToast(`${action.label} initiated`)}
            className="glass-card rounded-xl p-5 text-left hover:border-[var(--gold)]/30 transition-all group"
          >
            <action.icon size={20} className="text-[var(--gold)] mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm text-[var(--cream)] font-medium">{action.label}</p>
            <p className="text-xs text-[var(--cream)]/40 mt-1">{action.desc}</p>
          </button>
        ))}
      </div>

      {/* Backup History */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-serif text-base text-[var(--cream)] mb-4">Backup History</h3>
        <div className="space-y-3">
          {backups.map((b) => (
            <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Database size={14} className="text-[var(--gold)]/50" />
                <div>
                  <p className="text-sm text-[var(--cream)]">{b.name}</p>
                  <p className="text-xs text-[var(--cream)]/40">{b.date} • {b.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => showToast("Restore initiated")} className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">Restore</button>
                <button onClick={() => showToast("Backup downloaded")} className="text-xs text-[var(--cream)]/50 hover:text-[var(--cream)] transition-colors"><Download size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FileManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [files] = useState([
    { name: "menu-data.json", size: "24 KB", modified: "2 days ago" },
    { name: "gallery-config.json", size: "8 KB", modified: "5 days ago" },
    { name: "site-seo.json", size: "3 KB", modified: "1 week ago" },
    { name: "analytics-config.js", size: "12 KB", modified: "2 weeks ago" },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">File Manager</h2>
          <p className="text-sm text-[var(--cream)]/50">Browse, upload, and manage website files</p>
        </div>
        <button onClick={() => showToast("Upload functionality requires server integration")}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        ><Upload size={16} /> Upload File</button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-[var(--gold)]/10 text-xs text-[var(--cream)]/40 uppercase tracking-wider">
          <span className="flex-1">Name</span>
          <span className="w-20 text-right">Size</span>
          <span className="w-28 text-right">Modified</span>
          <span className="w-16 text-right">Actions</span>
        </div>
        <div className="divide-y divide-[var(--gold)]/5">
          {files.map((f) => (
            <div key={f.name} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-3 flex-1">
                <FileCode size={16} className="text-[var(--gold)]/50" />
                <span className="text-sm text-[var(--cream)]">{f.name}</span>
              </div>
              <span className="w-20 text-right text-xs text-[var(--cream)]/40">{f.size}</span>
              <span className="w-28 text-right text-xs text-[var(--cream)]/40">{f.modified}</span>
              <div className="w-16 text-right flex justify-end gap-1">
                <button onClick={() => showToast("File downloaded")} className="p-1 text-[var(--cream)]/30 hover:text-[var(--gold)] transition-colors"><Download size={12} /></button>
                <button onClick={() => showToast("File deleted")} className="p-1 text-[var(--cream)]/30 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function APISettings({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [showKey, setShowKey] = useState(false);
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">API Settings</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Manage API keys and integrations</p>

      <div className="glass-card rounded-xl p-6 space-y-6">
        <div>
          <h3 className="font-serif text-base text-[var(--cream)] mb-3">API Keys</h3>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/[0.02]">
            <Key size={16} className="text-[var(--gold)]" />
            <code className="flex-1 text-sm text-[var(--cream)]/70 font-mono">
              {showKey ? "cg_api_7f3a8b2c9d1e4f5a6b7c8d9e0f1a2b3c" : "cg_api_••••••••••••••••••••••••••••••••"}
            </code>
            <button onClick={() => setShowKey(!showKey)} className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)]">{showKey ? "Hide" : "Show"}</button>
            <button onClick={() => { navigator.clipboard.writeText("cg_api_7f3a8b2c9d1e4f5a6b7c8d9e0f1a2b3c"); showToast("API key copied"); }}
              className="text-xs text-[var(--gold)] hover:text-[var(--gold-light)]"><Copy size={12} /></button>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-base text-[var(--cream)] mb-3">Integration Status</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: "Google Maps", status: "Connected" },
              { name: "Google Analytics", status: "Not configured" },
              { name: "Cloud Storage", status: "Connected" },
              { name: "CDN", status: "Active" },
            ].map((int) => (
              <div key={int.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <span className="text-sm text-[var(--cream)]/70">{int.name}</span>
                <span className={`text-xs ${int.status === "Connected" || int.status === "Active" ? "text-green-400" : "text-amber-400"}`}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => showToast("API key regenerated")} className="px-4 py-2 rounded-lg border border-[var(--gold)]/20 text-[var(--gold)] text-sm hover:bg-[var(--gold)]/5 transition-colors">
          Regenerate API Key
        </button>
      </div>
    </div>
  );
}

function PerformanceDashboard() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Performance Dashboard</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Monitor website performance metrics</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Load Time", value: "1.2s", score: "Good" },
          { label: "First Paint", value: "0.8s", score: "Good" },
          { label: "TTI", value: "1.8s", score: "Good" },
          { label: "Lighthouse", value: "92", score: "Excellent" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4">
            <p className="text-xs text-[var(--cream)]/40 mb-1">{s.label}</p>
            <p className="text-xl font-serif font-bold text-[var(--cream)]">{s.value}</p>
            <p className="text-[10px] text-green-400 mt-1">{s.score}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-8 text-center">
        <BarChart3 size={40} className="mx-auto text-[var(--gold)]/30 mb-3" />
        <p className="text-sm text-[var(--cream)]/60">Detailed performance charts require analytics integration</p>
      </div>
    </div>
  );
}

function CacheManager({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Cache Manager</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Manage application cache for optimal performance</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Page Cache", size: "2.3 MB", items: "124 pages" },
          { label: "Image Cache", size: "156 MB", items: "847 images" },
          { label: "API Cache", size: "12 MB", items: "532 entries" },
        ].map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-5">
            <p className="text-xs text-[var(--cream)]/40 mb-1">{c.label}</p>
            <p className="text-lg font-serif font-bold text-[var(--cream)]">{c.size}</p>
            <p className="text-xs text-[var(--cream)]/50">{c.items}</p>
            <button onClick={() => showToast(`${c.label} cleared`)}
              className="mt-3 text-xs text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">Clear Cache</button>
          </div>
        ))}
      </div>

      <button onClick={() => showToast("All cache cleared successfully")}
        className="w-full py-3 rounded-xl gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center justify-center gap-2"
      ><RefreshCw size={16} /> Clear All Cache</button>
    </div>
  );
}

function MaintenanceMode({ showToast, setConfirm }: {
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [emergencyShutdown, setEmergencyShutdown] = useState(false);
  const [confirmStep, setConfirmStep] = useState(0);

  const toggleMaintenance = () => {
    setConfirm({
      open: true,
      title: isEnabled ? "Disable Maintenance Mode" : "Enable Maintenance Mode",
      message: isEnabled
        ? "The website will be accessible to all visitors again."
        : "The website will show a maintenance page to all visitors.",
      onConfirm: () => {
        setIsEnabled(!isEnabled);
        showToast(isEnabled ? "Maintenance mode disabled" : "Maintenance mode enabled");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  const handleEmergencyShutdown = () => {
    if (confirmStep === 0) {
      setConfirmStep(1);
      setConfirm({
        open: true, title: "⚠️ Emergency Shutdown", message: "This will immediately take the website offline. Are you sure?",
        danger: true,
        onConfirm: () => {
          setConfirmStep(2);
          setConfirm({
            open: true, title: "⚠️⚠️ Final Confirmation", message: "Type 'SHUTDOWN' to confirm emergency shutdown.",
            danger: true,
            onConfirm: () => {
              setEmergencyShutdown(true);
              setConfirmStep(0);
              showToast("EMERGENCY SHUTDOWN ACTIVATED — Website is offline");
              setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
            },
          });
        },
      });
    }
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Maintenance Mode</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Control website availability and perform maintenance</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className={`glass-card rounded-xl p-6 ${isEnabled ? "border-amber-500/30" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-base text-[var(--cream)]">Maintenance Mode</h3>
            <div className={`w-3 h-3 rounded-full ${isEnabled ? "bg-amber-400" : "bg-green-400"}`} />
          </div>
          <p className="text-sm text-[var(--cream)]/60 mb-4">
            {isEnabled ? "Website is currently in maintenance mode. Visitors see a maintenance page." : "Website is live and accessible to all visitors."}
          </p>
          <button onClick={toggleMaintenance}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isEnabled ? "border border-green-500/30 text-green-400 hover:bg-green-500/10" : "border border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
            }`}
          >{isEnabled ? "Disable Maintenance" : "Enable Maintenance"}</button>
        </div>

        <div className={`glass-card rounded-xl p-6 ${emergencyShutdown ? "border-red-500/30" : ""}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-base text-[var(--cream)]">Emergency Shutdown</h3>
            <Power size={16} className={emergencyShutdown ? "text-red-400" : "text-[var(--cream)]/30"} />
          </div>
          <p className="text-sm text-[var(--cream)]/60 mb-4">
            {emergencyShutdown
              ? "⚠️ Emergency shutdown is ACTIVE. Website is completely offline."
              : "Immediately take the entire website offline. Requires multiple confirmations."}
          </p>
          <button onClick={handleEmergencyShutdown} disabled={emergencyShutdown}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              emergencyShutdown
                ? "bg-red-500/10 text-red-400 cursor-not-allowed"
                : "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
            }`}
          >
            {emergencyShutdown ? "Shutdown Active" : "Initiate Emergency Shutdown"}
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-serif text-base text-[var(--cream)] mb-4">Maintenance Log</h3>
        <div className="space-y-2 text-xs text-[var(--cream)]/50">
          {[
            "2026-07-12 14:30 — System health check passed",
            "2026-07-12 08:00 — Daily backup completed",
            "2026-07-11 22:00 — Cache cleared automatically",
            "2026-07-11 16:45 — Security scan completed (0 threats)",
          ].map((log, i) => (
            <p key={i} className="font-mono">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevSettings({ showToast, setConfirm }: {
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const handleResetSetup = () => {
    setConfirm({
      open: true, title: "Reset Setup Wizard", message: "This will reset the initial setup wizard, allowing creation of a new administrator account.",
      danger: true,
      onConfirm: () => {
        showToast("Setup wizard has been reset. Redirecting...");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  const handleExport = () => {
    showToast("Website data exported successfully");
  };

  const handleImport = () => {
    showToast("Import functionality ready — select a file to upload");
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Developer Settings</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Advanced configuration and system tools</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-serif text-base text-[var(--cream)]">System Tools</h3>
          {[
            { icon: RotateCcw, label: "Reset Initial Setup Wizard", desc: "Allow creation of new admin account", action: handleResetSetup, danger: true },
            { icon: Download, label: "Export Website Data", desc: "Download complete website data as JSON", action: handleExport },
            { icon: ImportIcon, label: "Import Website Data", desc: "Restore website from exported data", action: handleImport },
          ].map((tool) => (
            <button key={tool.label} onClick={tool.action}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all text-left group ${
                tool.danger
                  ? "border-red-500/10 hover:border-red-500/30 bg-red-500/[0.02] hover:bg-red-500/[0.05]"
                  : "border-[var(--gold)]/10 hover:border-[var(--gold)]/30 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >
              <tool.icon size={18} className={tool.danger ? "text-red-400" : "text-[var(--gold)]"} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${tool.danger ? "text-red-400" : "text-[var(--cream)]"}`}>{tool.label}</p>
                <p className="text-xs text-[var(--cream)]/40 mt-0.5">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-serif text-base text-[var(--cream)]">Environment</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-[var(--cream)]/70">App Version</span>
              <span className="text-xs text-[var(--cream)] font-mono">1.0.0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-[var(--cream)]/70">Environment</span>
              <span className="text-xs text-green-400 font-mono">Production</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-[var(--cream)]/70">Node Version</span>
              <span className="text-xs text-[var(--cream)] font-mono">20.x</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <span className="text-xs text-[var(--cream)]/70">Framework</span>
              <span className="text-xs text-[var(--cream)] font-mono">Next.js 16</span>
            </div>
          </div>

          <button onClick={() => showToast("Configuration exported")}
            className="w-full py-2.5 rounded-lg border border-[var(--gold)]/10 text-sm text-[var(--gold)] hover:bg-[var(--gold)]/5 transition-colors"
          >Export Configuration</button>
        </div>
      </div>
    </div>
  );
}
