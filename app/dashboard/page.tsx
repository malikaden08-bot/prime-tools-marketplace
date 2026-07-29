"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Download, 
  Heart, 
  FileText, 
  Star, 
  Bell, 
  User, 
  Settings, 
  LifeBuoy, 
  ArrowRight,
  ExternalLink,
  Shield,
  Key
} from "lucide-react";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { PageTransition } from "../../components/layout/PageTransition";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";

type DashboardTab = 
  | "overview" 
  | "orders" 
  | "downloads" 
  | "wishlist" 
  | "invoices" 
  | "reviews" 
  | "notifications" 
  | "profile" 
  | "settings" 
  | "support";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "orders", label: "My Orders", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "downloads", label: "Downloads Library", icon: <Download className="w-4 h-4" /> },
    { id: "wishlist", label: "Saved Wishlist", icon: <Heart className="w-4 h-4 text-rose-500" /> },
    { id: "invoices", label: "Tax Invoices", icon: <FileText className="w-4 h-4" /> },
    { id: "reviews", label: "My Reviews", icon: <Star className="w-4 h-4 text-amber-500" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4 text-sky-500" /> },
    { id: "profile", label: "Account Profile", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "Preferences", icon: <Settings className="w-4 h-4" /> },
    { id: "support", label: "Support Tickets", icon: <LifeBuoy className="w-4 h-4" /> },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
        <Header />

        <main className="flex-1 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200">
            <div>
              <Badge variant="primary" size="md" dot className="mb-2">
                Customer Account Portal
              </Badge>
              <h1 className="font-serif italic font-bold text-4xl text-slate-900">
                Welcome, {user?.name || "Valued Customer"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage your digital tool licenses, downloads, invoices, and support tickets.
              </p>
            </div>

            <Link href="/marketplace">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Asset Store
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card variant="white" className="p-3 border border-slate-200 shadow-soft space-y-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as DashboardTab)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </Card>
            </div>

            {/* View Panel */}
            <div className="lg:col-span-9 space-y-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card variant="white" className="p-5 border border-slate-200 shadow-soft">
                      <span className="text-xs font-bold text-slate-400 uppercase">Purchased Assets</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
                    </Card>

                    <Card variant="white" className="p-5 border border-slate-200 shadow-soft">
                      <span className="text-xs font-bold text-slate-400 uppercase">Active Licenses</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">12</h3>
                    </Card>

                    <Card variant="white" className="p-5 border border-slate-200 shadow-soft">
                      <span className="text-xs font-bold text-slate-400 uppercase">Total Spend</span>
                      <h3 className="text-2xl font-bold text-sky-600 font-mono mt-1">$1,248.00</h3>
                    </Card>
                  </div>

                  <Card variant="white" className="p-6 border border-slate-200 shadow-soft space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                      Recent Purchased Deliverables
                    </h3>
                    <p className="text-xs text-slate-500">
                      Access source code packages and Figma UI kits from your purchases.
                    </p>
                  </Card>
                </div>
              )}

              {activeTab !== "overview" && (
                <Card variant="white" className="p-8 border border-slate-200 shadow-soft text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {activeTab.toUpperCase()} Section Ready
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    All account data and assets update dynamically upon checkout.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
