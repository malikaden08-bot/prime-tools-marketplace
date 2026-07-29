"use client";

import React from "react";
import Link from "next/link";
import { useSiteConfig } from "../../context/SiteConfigContext";

export const Footer: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <footer className="w-full bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-serif italic text-xl font-bold shadow-md">
                {config.logoText || "P"}
              </div>
              <span className="font-serif italic font-bold text-xl text-white">
                {config.siteName}
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Premium digital assets, source code templates, and high-performance UI toolkits for professional engineers.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/marketplace" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">UI Toolkits</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Next.js Starters</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">3D Icon Packs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Account & Admin</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Customer Sign In</Link></li>
              <li><Link href="/auth/admin-login" className="hover:text-white transition-colors">Admin Login Portal</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Admin Control Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">License Agreement</Link></li>
              <li><a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors">Support Email</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {config.siteName} Inc. All rights reserved.</p>
          <p className="font-mono text-[11px]">System Status: All Services Operational (99.98%)</p>
        </div>
      </div>
    </footer>
  );
};
