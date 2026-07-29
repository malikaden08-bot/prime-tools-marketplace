"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ShoppingBag, 
  Bell, 
  Sparkles, 
  User, 
  Command, 
  ArrowRight, 
  LogOut, 
  Shield, 
  Settings, 
  ChevronDown,
  UserCheck,
  Lock
} from "lucide-react";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useSiteConfig } from "../../context/SiteConfigContext";

export interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSearchClick,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems, openCart } = useCart();
  const { config } = useSiteConfig();

  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  const displayCartCount = cartCount !== undefined ? cartCount : cartItems.length;
  const handleCartClick = onOpenCart || openCart;

  return (
    <header className="sticky top-0 z-40 w-full glass-header transition-all border-b border-slate-200/80 bg-white/90">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
          New Release
        </span>
        <span>{config.noticeBanner}</span>
        <Link href="/marketplace" className="underline underline-offset-2 flex items-center gap-1 hover:text-slate-200">
          Explore Assets <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-serif italic text-xl font-bold shadow-md transition-transform group-hover:scale-105">
              {config.logoText || "P"}
            </div>
            <div className="flex flex-col">
              <span className="font-serif italic font-bold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                {config.siteName}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase -mt-1">
                {config.tagline}
              </span>
            </div>
          </Link>

          {/* Quick Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <button
              onClick={onSearchClick}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-slate-500 text-sm hover:bg-slate-100 hover:border-slate-300 transition-all shadow-inner"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search digital tools, components, code...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-medium text-slate-400 bg-white border border-slate-200 rounded-md shadow-xs">
                <Command className="w-3 h-3" /> K
              </kbd>
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-3">
            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={handleCartClick}
              className="relative p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {displayCartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

            {/* Authenticated User Menu or Sign In */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-slate-100 transition-colors border border-slate-200/80 bg-white shadow-xs"
                >
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-sky-600 leading-tight">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Popover */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-premium p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-3 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge
                          variant={user.role === "Admin" ? "primary" : "accent"}
                          size="sm"
                          dot
                        >
                          Role: {user.role}
                        </Badge>
                      </div>
                    </div>

                    <Link
                      href="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>Admin Control Panel</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-sky-500" />
                      <span>Customer Dashboard</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/admin-login">
                  <Button variant="ghost" size="sm" leftIcon={<Lock className="w-3.5 h-3.5 text-amber-500" />}>
                    Admin Login
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="primary" size="sm">
                    Customer Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
