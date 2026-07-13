"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Utensils,
  Wine,
  Image as ImageIcon,
  Calendar,
  Star,
  FileText,
  Settings,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  Mail,
  LogOut,
  Menu,
  X,
  Plus,
  Edit3,
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
  Search,
  Eye,
  CheckCircle,
  AlertTriangle,
  Upload,
  Link,
  Sparkles,
  Home,
} from "lucide-react";
import { foodMenu } from "@/data/foodMenu";
import { beverageMenu } from "@/data/beverageMenu";
import { events } from "@/data/events";
import { reviews } from "@/data/reviews";
import { formatPrice } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import type { MenuItem } from "@/data/foodMenu";
import type { Event } from "@/data/events";
import type { Review } from "@/data/reviews";

// Types
type DashboardSection =
  | "overview"
  | "food-menu"
  | "beverage-menu"
  | "gallery"
  | "events"
  | "reviews"
  | "hours"
  | "contact"
  | "settings"
  | "seo"
  | "analytics"
  | "users"
  | "security"
  | "backup"
  | "file-manager"
  | "api"
  | "performance"
  | "cache"
  | "maintenance"
  | "developer-settings";

interface NavItem {
  id: DashboardSection;
  label: string;
  icon: React.ElementType;
  category: "content" | "system" | "developer";
}

const adminNavItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, category: "content" },
  { id: "food-menu", label: "Food Menu", icon: Utensils, category: "content" },
  { id: "beverage-menu", label: "Beverage Menu", icon: Wine, category: "content" },
  { id: "gallery", label: "Gallery", icon: ImageIcon, category: "content" },
  { id: "events", label: "Events", icon: Calendar, category: "content" },
  { id: "reviews", label: "Reviews", icon: Star, category: "content" },
  { id: "hours", label: "Opening Hours", icon: Clock, category: "content" },
  { id: "contact", label: "Contact", icon: MapPin, category: "content" },
  { id: "seo", label: "SEO", icon: Globe, category: "system" },
  { id: "analytics", label: "Analytics", icon: BarChart3, category: "system" },
];

const developerNavItems: NavItem[] = [
  { id: "users", label: "User Management", icon: Users, category: "developer" },
  { id: "security", label: "Security", icon: Shield, category: "developer" },
  { id: "backup", label: "Backup & Restore", icon: Database, category: "developer" },
  { id: "file-manager", label: "File Manager", icon: FileCode, category: "developer" },
  { id: "api", label: "API Settings", icon: Settings, category: "developer" },
  { id: "performance", label: "Performance", icon: BarChart3, category: "developer" },
  { id: "cache", label: "Cache Manager", icon: RefreshCw, category: "developer" },
  { id: "maintenance", label: "Maintenance", icon: AlertTriangle, category: "developer" },
  { id: "developer-settings", label: "Dev Settings", icon: Settings, category: "developer" },
];

// Notification component
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

// Stat card
function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub?: string }) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-full gold-bg flex items-center justify-center">
          <Icon size={18} className="text-[var(--warm-black)]" />
        </div>
      </div>
      <p className="text-2xl font-serif font-bold text-[var(--cream)]">{value}</p>
      <p className="text-xs text-[var(--cream)]/50 mt-1">{label}</p>
      {sub && <p className="text-[10px] text-[var(--gold)]/60 mt-0.5">{sub}</p>}
    </div>
  );
}

// Confirm dialog
function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel = () => {},
  danger = false,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  danger?: boolean;
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
          {danger ? (
            <AlertTriangle size={20} className="text-red-400" />
          ) : (
            <CheckCircle size={20} className="text-[var(--gold)]" />
          )}
        </div>
        <h3 className="font-serif text-lg text-[var(--cream)] mb-2">{title}</h3>
        <p className="text-sm text-[var(--cream)]/60 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg text-sm border border-white/10 text-[var(--cream)]/70 hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${
              danger ? "bg-red-500 hover:bg-red-600" : "gold-bg text-[var(--warm-black)]"
            }`}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    danger?: boolean;
  }>({ open: false, title: "", message: "", onConfirm: () => {} });

  // Editable state
  const [editableFoodMenu, setEditableFoodMenu] = useState(foodMenu);
  const [editableBeverageMenu, setEditableBeverageMenu] = useState(beverageMenu);
  const [editableEvents, setEditableEvents] = useState<Event[]>([]);
  const [editableReviews, setEditableReviews] = useState(reviews);
  const [editableHours, setEditableHours] = useState({
    monday: "10:00 AM – 2:00 AM",
    tuesday: "10:00 AM – 2:00 AM",
    wednesday: "10:00 AM – 2:00 AM",
    thursday: "10:00 AM – 2:00 AM",
    friday: "10:00 AM – 2:00 AM",
    saturday: "10:00 AM – 2:00 AM",
    sunday: "10:00 AM – 2:00 AM",
  });
  const [editableContact, setEditableContact] = useState({
    address: "Ikeja City Mall, Obafemi Awolowo Way, Oregun, Ikeja 101233, Lagos, Nigeria",
    phone: "+234 903 890 0015",
    email: "info@casperandgambinis.com",
    instagram: "@casperandgambinis",
    facebook: "CasperGambinisIkeja",
    twitter: "@CandGIkeja",
  });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  }, []);
  useEffect(() => {
  async function loadEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setEditableEvents(data || []);
  }

  loadEvents();
}, []);

  // Stats
  const totalFoodItems = editableFoodMenu.reduce((sum, cat) => sum + cat.items.length, 0);
  const totalBeverageItems = editableBeverageMenu.reduce((sum, cat) => sum + cat.items.length, 0);
  const totalEvents = editableEvents.length;
  const totalReviewsCount = editableReviews.length;

  // Render section content
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection
          stats={{ totalFoodItems, totalBeverageItems, totalEvents, totalReviewsCount }}
          editableHours={editableHours}
        />;
      case "food-menu":
        return (
          <FoodMenuSection
            menu={editableFoodMenu}
            setMenu={setEditableFoodMenu}
            showToast={showToast}
            setConfirm={setConfirmDialog}
          />
        );
      case "beverage-menu":
        return (
          <BeverageMenuSection
            menu={editableBeverageMenu}
            setMenu={setEditableBeverageMenu}
            showToast={showToast}
            setConfirm={setConfirmDialog}
          />
        );
      case "gallery":
        return <GallerySection showToast={showToast} />;
      case "events":
        return (
          <EventsSection
            eventsList={editableEvents}
            setEvents={setEditableEvents}
            showToast={showToast}
            setConfirm={setConfirmDialog}
          />
        );
      case "reviews":
        return (
          <ReviewsSection
            reviewsList={editableReviews}
            showToast={showToast}
          />
        );
      case "hours":
        return (
          <HoursSection
            hours={editableHours}
            setHours={setEditableHours}
            showToast={showToast}
          />
        );
      case "contact":
        return (
          <ContactSection
            contact={editableContact}
            setContact={setEditableContact}
            showToast={showToast}
          />
        );
      case "seo":
        return <SEOSection showToast={showToast} />;
      case "analytics":
        return <AnalyticsSection />;
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
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Confirm Dialog */}
      <ConfirmDialog {...confirmDialog} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[var(--warm-black-2)] border-r border-[var(--gold)]/10 overflow-y-auto dashboard-scroll transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Logo */}
        <div className="p-4 border-b border-[var(--gold)]/10">
          <a href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-serif font-bold">
              <span className="text-gradient">C</span>
              <span className="text-[var(--cream)]">&</span>
              <span className="text-gradient">G</span>
            </span>
            <div>
              <p className="font-serif text-xs text-[var(--cream)] leading-tight">Dashboard</p>
              <p className="text-[8px] text-[var(--gold)] tracking-widest uppercase">Admin</p>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {/* Content */}
          <p className="text-[10px] text-[var(--cream)]/30 uppercase tracking-wider px-3 pt-4 pb-2 font-medium">Content</p>
          {adminNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                  : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}

          {/* System */}
          <p className="text-[10px] text-[var(--cream)]/30 uppercase tracking-wider px-3 pt-6 pb-2 font-medium">System</p>
          <button
            onClick={() => { setActiveSection("seo"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              activeSection === "seo"
                ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
            }`}
          >
            <Globe size={16} />
            SEO
          </button>
          <button
            onClick={() => { setActiveSection("analytics"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
              activeSection === "analytics"
                ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                : "text-[var(--cream)]/60 hover:text-[var(--cream)] hover:bg-white/5"
            }`}
          >
            <BarChart3 size={16} />
            Analytics
          </button>
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[var(--gold)]/10 bg-[var(--warm-black-2)]">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[var(--cream)]/50 hover:text-[var(--gold)] hover:bg-white/5 transition-all w-full"
          >
            <ExternalLink size={14} />
            View Website
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 glass-dark px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[var(--cream)]/60 hover:text-[var(--gold)] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-medium text-[var(--cream)] capitalize hidden sm:block">
              {activeSection.replace("-", " ")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-[var(--cream)]/50 hover:text-[var(--gold)] transition-colors flex items-center gap-1"
            >
              <ExternalLink size={12} />
              View Site
            </a>
            <div className="w-8 h-8 rounded-full gold-bg flex items-center justify-center">
              <span className="text-xs font-bold text-[var(--warm-black)]">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// ============= SECTIONS =============

function OverviewSection({ stats, editableHours }: {
  stats: { totalFoodItems: number; totalBeverageItems: number; totalEvents: number; totalReviewsCount: number };
  editableHours: Record<string, string>;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Dashboard Overview</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Welcome back, Administrator</p>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Utensils} label="Food Menu Items" value={stats.totalFoodItems} />
        <StatCard icon={Wine} label="Beverage Items" value={stats.totalBeverageItems} />
        <StatCard icon={Calendar} label="Events" value={stats.totalEvents} sub="Active listings" />
        <StatCard icon={Star} label="Reviews" value={stats.totalReviewsCount} />
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h3 className="font-serif text-lg text-[var(--cream)] mb-4">Quick Actions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Plus, label: "Add Menu Item", section: "food-menu" },
            { icon: Plus, label: "Create Event", section: "events" },
            { icon: Edit3, label: "Edit Hours", section: "hours" },
            { icon: Upload, label: "Upload Images", section: "gallery" },
          ].map((action) => (
            <a
              key={action.label}
              href={`#${action.section}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-[var(--gold)]/10 hover:border-[var(--gold)]/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-sm text-[var(--cream)]/70 hover:text-[var(--gold)]"
            >
              <action.icon size={16} className="text-[var(--gold)]" />
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* Business Info */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-serif text-lg text-[var(--cream)] mb-4">Business Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[var(--cream)]/40 text-xs uppercase tracking-wider mb-1">Opening Hours</p>
            <p className="text-[var(--cream)]/70">{editableHours.monday}</p>
            <p className="text-[var(--cream)]/40 text-[10px] mt-1">Daily</p>
          </div>
          <div>
            <p className="text-[var(--cream)]/40 text-xs uppercase tracking-wider mb-1">Location</p>
            <p className="text-[var(--cream)]/70 text-xs">Ikeja City Mall, Lagos</p>
            <p className="text-[var(--cream)]/40 text-[10px] mt-1">Ikeja</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodMenuSection({ menu, setMenu, showToast, setConfirm }: {
  menu: typeof foodMenu;
  setMenu: (m: typeof foodMenu) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const [editCategory, setEditCategory] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<{ catIndex: number; itemIndex: number } | null>(null);
  const [newItem, setNewItem] = useState<{ name: string; description: string; price: string }>({
    name: "",
    description: "",
    price: "",
  });

  const handleSaveItem = (catIndex: number, itemIndex: number, updatedItem: any) => {
    const newMenu = menu.map((cat, ci) => {
      if (ci !== catIndex) return cat;
      return {
        ...cat,
        items: cat.items.map((item, ii) => (ii === itemIndex ? updatedItem : item)),
      };
    });
    setMenu(newMenu);
    setEditItem(null);
    showToast("Menu item updated successfully");
  };

  const handleDeleteItem = (catIndex: number, itemIndex: number) => {
    setConfirm({
      open: true,
      title: "Delete Menu Item",
      message: "Are you sure you want to delete this item? This action cannot be undone.",
      danger: true,
      onConfirm: () => {
        const newMenu = menu.map((cat, ci) => {
          if (ci !== catIndex) return cat;
          return { ...cat, items: cat.items.filter((_, ii) => ii !== itemIndex) };
        });
        setMenu(newMenu);
        showToast("Menu item deleted");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  const handleAddItem = (catIndex: number) => {
    if (!newItem.name) return;
    const newMenu = menu.map((cat, ci) => {
      if (ci !== catIndex) return cat;
      return {
        ...cat,
        items: [...cat.items, { name: newItem.name, description: newItem.description, price: parseInt(newItem.price) || 0 }],
      };
    });
    setMenu(newMenu);
    setNewItem({ name: "", description: "", price: "" });
    showToast("Item added to menu");
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Food Menu Editor</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Manage your food menu items, prices, and descriptions</p>

      <div className="space-y-6">
        {menu.map((category, catIndex) => (
          <div key={category.title} className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[var(--gold)]">{category.title}</h3>
              <span className="text-xs text-[var(--cream)]/40">{category.items.length} items</span>
            </div>

            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--cream)] font-medium">{(item as MenuItem).name}</p>
                    {(item as MenuItem).description && (
                      <p className="text-xs text-[var(--cream)]/40 mt-0.5 truncate">{(item as MenuItem).description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {(item as MenuItem).price && (
                      <span className="text-xs text-[var(--gold)]">{formatPrice((item as MenuItem).price!)}</span>
                    )}
                    <button
                      onClick={() => handleDeleteItem(catIndex, itemIndex)}
                      className="p-1.5 rounded-lg text-[var(--cream)]/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Item Form */}
            <div className="mt-4 pt-4 border-t border-[var(--gold)]/10">
              <div className="flex flex-wrap items-end gap-2">
                <div className="flex-1 min-w-[150px]">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Item name"
                    className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-xs text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30 transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-[100px]">
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Description"
                    className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-xs text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30 transition-colors"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))}
                    placeholder="Price (NGN)"
                    className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-xs text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30 transition-colors"
                  />
                </div>
                <button
                  onClick={() => handleAddItem(catIndex)}
                  disabled={!newItem.name}
                  className="px-3 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-opacity flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeverageMenuSection({ menu, setMenu, showToast, setConfirm }: {
  menu: typeof beverageMenu;
  setMenu: (m: typeof beverageMenu) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const [newItem, setNewItem] = useState<{ name: string; description: string; price: string }>({
    name: "", description: "", price: "",
  });
  const [activeCat, setActiveCat] = useState<number | null>(null);

  const handleDelete = (catIndex: number, itemIndex: number) => {
    setConfirm({
      open: true,
      title: "Delete Item",
      message: "Delete this beverage item?",
      danger: true,
      onConfirm: () => {
        const newMenu = menu.map((cat, ci) => {
          if (ci !== catIndex) return cat;
          return { ...cat, items: cat.items.filter((_, ii) => ii !== itemIndex) };
        });
        setMenu(newMenu);
        showToast("Item deleted");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  const handleAdd = (catIndex: number) => {
    if (!newItem.name) return;
    const newMenu = menu.map((cat, ci) => {
      if (ci !== catIndex) return cat;
      return {
        ...cat,
        items: [...cat.items, { name: newItem.name, description: newItem.description, price: parseInt(newItem.price) || 0 }],
      };
    });
    setMenu(newMenu);
    setNewItem({ name: "", description: "", price: "" });
    showToast("Item added");
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Beverage Menu Editor</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Manage drinks, wines, cocktails, and more</p>

      <div className="space-y-6">
        {menu.map((category, catIndex) => (
          <div key={category.title} className="glass-card rounded-xl p-5">
            <button
              onClick={() => setActiveCat(activeCat === catIndex ? null : catIndex)}
              className="w-full flex items-center justify-between"
            >
              <h3 className="font-serif text-lg text-[var(--gold)]">{category.title}</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--cream)]/40">{category.items.length} items</span>
                <ChevronDown size={16} className={`text-[var(--cream)]/40 transition-transform ${activeCat === catIndex ? "rotate-180" : ""}`} />
              </div>
            </button>

            {activeCat === catIndex && (
              <div className="mt-4 space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--cream)] font-medium">{(item as MenuItem).name}</p>
                      {(item as MenuItem).description && (
                        <p className="text-xs text-[var(--cream)]/40 mt-0.5 truncate">{(item as MenuItem).description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {(item as MenuItem).price && (
                        <span className="text-xs text-[var(--gold)]">{formatPrice((item as MenuItem).price!)}</span>
                      )}
                      <button
                        onClick={() => handleDelete(catIndex, itemIndex)}
                        className="p-1.5 rounded-lg text-[var(--cream)]/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add */}
                <div className="mt-4 pt-4 border-t border-[var(--gold)]/10 flex flex-wrap items-end gap-2">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Name"
                    className="flex-1 min-w-[120px] bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-xs text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30"
                  />
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))}
                    placeholder="Price"
                    className="w-24 bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-xs text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30"
                  />
                  <button
                    onClick={() => handleAdd(catIndex)}
                    disabled={!newItem.name}
                    className="px-3 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GallerySection({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  const [gallery, setGallery] = useState([
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070", alt: "Restaurant interior", category: "Interior" },
    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974", alt: "Dining area", category: "Interior" },
    { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070", alt: "Grilled steak", category: "Mains" },
  ]);

  const handleDelete = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    showToast("Image removed from gallery");
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Gallery Manager</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Upload, replace, and organize gallery images</p>

      {/* Upload Area */}
      <div className="glass-card rounded-xl p-8 mb-6 text-center">
        <Upload size={32} className="mx-auto text-[var(--gold)]/40 mb-3" />
        <p className="text-sm text-[var(--cream)]/60 mb-1">Drag & drop images here</p>
        <p className="text-xs text-[var(--cream)]/30 mb-4">or click to browse (JPG, PNG, WebP)</p>
        <button
          onClick={() => showToast("Upload functionality requires a cloud storage integration")}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-xs font-medium inline-flex items-center gap-1.5"
        >
          <Upload size={14} />
          Upload Images
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {gallery.map((img, i) => (
          <div key={i} className="relative group rounded-xl overflow-hidden aspect-square">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img.src}')` }} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center gap-2">
              <button
                onClick={() => handleDelete(i)}
                className="p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <span className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/50 px-2 py-0.5 rounded-full">
              {img.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsSection({ eventsList, setEvents, showToast, setConfirm }: {
  eventsList: Event[];
  setEvents: (e: Event[]) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
  setConfirm: (c: any) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    description: string;
    date: string;
    time: string;
    type: "upcoming" | "promotion" | "announcement";
  }>({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "upcoming",
  });

  const handleDelete = (id: number) => {
    setConfirm({
      open: true,
      title: "Delete Event",
      message: "Are you sure you want to delete this event?",
      danger: true,
      onConfirm: () => {
        setEvents(eventsList.filter((e) => e.id !== id));
        showToast("Event deleted");
        setConfirm({ open: false, title: "", message: "", onConfirm: () => {} });
      },
    });
  };

  const handleCreate = async () => {
  if (!form.title) return;

  const { error } = await supabase
    .from("events")
    .insert({
      title: form.title,
      description: form.description,
      event_date: form.date || "TBD",
      event_time: form.time || "TBD",
      event_type: form.type,
    });

  if (error) {
    showToast("Failed to create event", "error");
    console.error(error);
    return;
  }

  const { data } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  setEvents(data || []);

  setForm({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "upcoming",
  });

  setShowForm(false);
  showToast("Event created successfully");
};
   

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Events Manager</h2>
          <p className="text-sm text-[var(--cream)]/50">Create and manage events, promotions, and announcements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        >
          <Plus size={16} />
          New Event
        </button>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card rounded-xl p-5 space-y-3">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Event title"
                className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Description"
                rows={3}
                className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30 resize-none"
              />
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                  placeholder="Date (e.g., Every Friday)"
                  className="flex-1 min-w-[150px] bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30"
                />
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                  placeholder="Time"
                  className="flex-1 min-w-[120px] bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2 text-sm text-[var(--cream)] placeholder:text-[var(--cream)]/30 focus:outline-none focus:border-[var(--gold)]/30"
                />
                <select
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as "upcoming" | "promotion" | "announcement" }))}
                  className="bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="promotion">Promotion</option>
                  <option value="announcement">Announcement</option>
                </select>
                <button
                  onClick={handleCreate}
                  disabled={!form.title}
                  className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium disabled:opacity-30"
                >
                  Create Event
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events List */}
      <div className="space-y-3">
        {eventsList.map((event) => (
          <div key={event.id} className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-medium text-[var(--cream)]">{event.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  event.type === "upcoming" ? "bg-blue-500/10 text-blue-400" :
                  event.type === "promotion" ? "bg-green-500/10 text-green-400" :
                  "bg-amber-500/10 text-amber-400"
                }`}>
                  {event.type}
                </span>
              </div>
              <p className="text-xs text-[var(--cream)]/50 line-clamp-1">{event.description}</p>
              <p className="text-[10px] text-[var(--cream)]/30 mt-1">{event.date} • {event.time}</p>
            </div>
            <button
              onClick={() => handleDelete(event.id)}
              className="p-1.5 rounded-lg text-[var(--cream)]/30 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ reviewsList, showToast }: {
  reviewsList: Review[];
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Reviews Management</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Guest reviews and feedback</p>

      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="text-[var(--gold)] fill-[var(--gold)]" />
            ))}
          </div>
          <span className="text-2xl font-serif font-bold text-[var(--gold)]">4.4</span>
          <span className="text-sm text-[var(--cream)]/50">Average rating • {reviewsList.length} reviews</span>
        </div>
      </div>

      <div className="space-y-3">
        {reviewsList.map((review) => (
          <div key={review.id} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-[var(--cream)]">{review.name}</p>
              <span className="text-[10px] text-[var(--cream)]/40">{review.date}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={12} className={star <= review.rating ? "text-[var(--gold)] fill-[var(--gold)]" : "text-[var(--gold)]/20"} />
              ))}
            </div>
            <p className="text-xs text-[var(--cream)]/60 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HoursSection({ hours, setHours, showToast }: {
  hours: { monday: string; tuesday: string; wednesday: string; thursday: string; friday: string; saturday: string; sunday: string };
  setHours: (h: { monday: string; tuesday: string; wednesday: string; thursday: string; friday: string; saturday: string; sunday: string }) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
  type Day = typeof days[number];

  const handleChange = (day: Day, value: string) => {
    setHours({ ...hours, [day]: value });
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Opening Hours</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Edit your restaurant&apos;s opening hours</p>

      <div className="glass-card rounded-xl p-6">
        <div className="space-y-3">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-4">
              <label className="w-24 text-sm text-[var(--cream)]/70 capitalize font-medium">{day}</label>
              <input
                type="text"
                value={hours[day]}
                onChange={(e) => handleChange(day, e.target.value)}
                className="flex-1 bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => showToast("Opening hours updated")}
          className="mt-6 px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        >
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}

function ContactSection({ contact, setContact, showToast }: {
  contact: { address: string; phone: string; email: string; instagram: string; facebook: string; twitter: string };
  setContact: (c: any) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}) {
  const handleChange = (field: string, value: string) => {
    setContact({ ...contact, [field]: value });
  };

  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Contact Information</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Update your restaurant&apos;s contact details</p>

      <div className="glass-card rounded-xl p-6 space-y-4">
        {[
          { field: "address", label: "Address", icon: MapPin, type: "text" },
          { field: "phone", label: "Phone", icon: Phone, type: "text" },
          { field: "email", label: "Email", icon: Mail, type: "email" },
          { field: "instagram", label: "Instagram", icon: MessageSquare, type: "text" },
          { field: "facebook", label: "Facebook", icon: MessageSquare, type: "text" },
          { field: "twitter", label: "Twitter", icon: MessageSquare, type: "text" },
        ].map(({ field, label, icon: Icon, type }) => (
          <div key={field} className="flex items-center gap-3">
            <Icon size={16} className="text-[var(--gold)]/50 flex-shrink-0" />
            <label className="w-20 text-xs text-[var(--cream)]/50">{label}</label>
            <input
              type={type}
              value={(contact as any)[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className="flex-1 bg-white/5 border border-[var(--gold)]/10 rounded-lg px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
            />
          </div>
        ))}
        <button
          onClick={() => showToast("Contact information updated")}
          className="mt-4 px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium flex items-center gap-1.5"
        >
          <Save size={14} /> Save Changes
        </button>
      </div>
    </div>
  );
}

function SEOSection({ showToast }: { showToast: (msg: string, type?: "success" | "error") => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">SEO Settings</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Manage search engine optimization</p>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <label className="text-xs text-[var(--cream)]/50 mb-1 block">Meta Title</label>
          <input
            type="text"
            defaultValue="Casper & Gambini's Ikeja | Luxury Restaurant & Bar"
            className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--cream)]/50 mb-1 block">Meta Description</label>
          <textarea
            defaultValue="Experience world-class dining at Casper & Gambini's Ikeja. Premium international cuisine, artisanal coffee, craft cocktails, and an extensive wine selection."
            rows={3}
            className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30 resize-none"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--cream)]/50 mb-1 block">Keywords (comma separated)</label>
          <input
            type="text"
            defaultValue="Ikeja restaurant, Lagos fine dining, Casper and Gambini's"
            className="w-full bg-white/5 border border-[var(--gold)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--gold)]/30"
          />
        </div>
        <button
          onClick={() => showToast("SEO settings saved")}
          className="px-4 py-2 rounded-lg gold-bg text-[var(--warm-black)] text-sm font-medium"
        >
          <Save size={14} className="inline mr-1.5" /> Save SEO Settings
        </button>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[var(--cream)] mb-1">Analytics Dashboard</h2>
      <p className="text-sm text-[var(--cream)]/50 mb-8">Website performance and visitor insights</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Page Views", value: "12,847", change: "+12%" },
          { label: "Unique Visitors", value: "4,231", change: "+8%" },
          { label: "Avg. Session", value: "3m 42s", change: "+5%" },
          { label: "Bounce Rate", value: "32.1%", change: "-3%" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5">
            <p className="text-xs text-[var(--cream)]/40 mb-1">{stat.label}</p>
            <p className="text-2xl font-serif font-bold text-[var(--cream)]">{stat.value}</p>
            <p className="text-xs text-green-400 mt-1">{stat.change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-xl p-8 text-center">
        <BarChart3 size={40} className="mx-auto text-[var(--gold)]/30 mb-3" />
        <p className="text-sm text-[var(--cream)]/60">
          Connect Google Analytics or similar service for detailed insights
        </p>
      </div>
    </div>
  );
}
