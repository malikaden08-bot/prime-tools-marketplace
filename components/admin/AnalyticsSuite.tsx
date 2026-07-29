"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Percent, 
  FileSpreadsheet, 
  FileText, 
  ArrowUpRight, 
  ArrowDownRight, 
  Eye, 
  Sparkles, 
  Globe, 
  Download,
  Calendar,
  Layers
} from "lucide-react";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { useToast } from "../../context/ToastContext";

export const AnalyticsSuite: React.FC = () => {
  const toast = useToast();

  // Real-time Active Visitors Counter Simulation
  const [activeVisitors, setActiveVisitors] = useState(342);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      setActiveVisitors((prev) => Math.max(310, prev + delta));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Export PDF Handler
  const handleExportPDF = () => {
    toast.success("PDF Report Exported", "Aura_Marketplace_Analytics_Q1_2026.pdf generated.");
  };

  // Export Excel Handler
  const handleExportExcel = () => {
    toast.success("Excel Spreadsheet Exported", "Marketplace_Revenue_Data_2026.xlsx downloaded.");
  };

  const topProducts = [
    { rank: 1, title: "Linear Design System 3.0", category: "UI Kits", revenue: "$380,780", sales: 4820 },
    { rank: 2, title: "Next.js SaaS CreatorOS Template", category: "Templates", revenue: "$642,510", sales: 6490 },
    { rank: 3, title: "Apex 3D Glass Objects Pack", category: "3D Assets", revenue: "$157,290", sales: 3210 },
    { rank: 4, title: "Geometria Minimalist Icon System", category: "Icons", revenue: "$62,060", sales: 2140 },
  ];

  const topCategories = [
    { category: "UI Kits & Design Systems", pct: 40, rev: "$193,160" },
    { category: "3D Motion Assets", pct: 25, rev: "$120,725" },
    { category: "Next.js Templates", pct: 20, rev: "$96,580" },
    { category: "Icon Systems & Graphics", pct: 15, rev: "$72,435" },
  ];

  const monthlyReports = [
    { month: "January 2026", orders: 1840, conversion: "4.5%", revenue: "$52,400.00" },
    { month: "February 2026", orders: 2110, conversion: "4.7%", revenue: "$68,100.00" },
    { month: "March 2026", orders: 2890, conversion: "5.1%", revenue: "$94,200.00" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Toolbar & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" size="md" dot>
              Real-Time Dashboard • {activeVisitors} Live Visitors
            </Badge>
          </div>
          <h2 className="font-serif italic font-bold text-3xl text-slate-900">
            Advanced Analytics & Reports
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
            onClick={handleExportExcel}
          >
            Export Excel (.xlsx)
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<FileText className="w-4 h-4" />}
            onClick={handleExportPDF}
          >
            Export PDF Report
          </Button>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card variant="white" className="p-5 border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Gross Revenue
          </span>
          <h3 className="text-2xl font-bold text-slate-900">$482,900</h3>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% YoY
          </span>
        </Card>

        <Card variant="white" className="p-5 border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Orders
          </span>
          <h3 className="text-2xl font-bold text-slate-900">12,450</h3>
          <span className="text-[11px] text-sky-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
          </span>
        </Card>

        <Card variant="white" className="p-5 border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Unique Visitors
          </span>
          <h3 className="text-2xl font-bold text-slate-900">450,000+</h3>
          <span className="text-[11px] text-purple-600 font-bold flex items-center gap-1 mt-1">
            <Globe className="w-3.5 h-3.5" /> 150+ Countries
          </span>
        </Card>

        <Card variant="white" className="p-5 border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Conversion Rate
          </span>
          <h3 className="text-2xl font-bold text-slate-900">4.85%</h3>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +0.6% vs avg
          </span>
        </Card>

        <Card variant="white" className="p-5 border border-slate-200/80 shadow-soft">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Avg Order Value
          </span>
          <h3 className="text-2xl font-bold text-slate-900">$38.78</h3>
          <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-1">
            <Sparkles className="w-3.5 h-3.5" /> High Margin
          </span>
        </Card>
      </div>

      {/* Interactive Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8-Column Revenue & Conversion Funnel Chart */}
        <Card variant="white" className="lg:col-span-8 p-6 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue & Conversion Funnel</h3>
              <p className="text-xs text-slate-500">Visitor-to-checkout conversion performance</p>
            </div>
            <Badge variant="glass" size="sm" dot>Live Performance</Badge>
          </div>

          {/* Conversion Funnel Bar Grid */}
          <div className="space-y-4 pt-2">
            {[
              { stage: "Marketplace Visitors", count: "450,000", pct: "100%", color: "bg-slate-900" },
              { stage: "Product Detail Previews", count: "185,000", pct: "41.1%", color: "bg-sky-600" },
              { stage: "Added Asset to Cart", count: "42,000", pct: "9.3%", color: "bg-indigo-600" },
              { stage: "Completed Checkout", count: "21,825", pct: "4.85%", color: "bg-emerald-600" },
            ].map((funnel, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{funnel.stage}</span>
                  <span>{funnel.count} ({funnel.pct})</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: funnel.pct }}
                    transition={{ duration: 0.8, delay: idx * 0.15 }}
                    className={`h-full ${funnel.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right 4-Column Category Revenue Distribution */}
        <Card variant="white" className="lg:col-span-4 p-6 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Top Category Revenue</h3>
          <div className="space-y-4 pt-2">
            {topCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>{cat.category}</span>
                  <span className="font-bold text-slate-900">{cat.rev}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.pct}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-slate-900 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Products & Monthly Financial Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Products Table */}
        <Card variant="white" className="lg:col-span-7 p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Top Performing Products</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Product Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Sales</th>
                <th className="p-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {topProducts.map((p) => (
                <tr key={p.rank}>
                  <td className="p-3 font-bold text-slate-900">#{p.rank}</td>
                  <td className="p-3 font-bold">{p.title}</td>
                  <td className="p-3 text-slate-500">{p.category}</td>
                  <td className="p-3 font-semibold">{p.sales.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold text-emerald-600">{p.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Monthly Reports Table */}
        <Card variant="white" className="lg:col-span-5 p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Monthly Financial Reports</h3>
          <div className="space-y-3">
            {monthlyReports.map((rep, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{rep.month}</span>
                  <span className="text-slate-500">{rep.orders} Orders • Conv: {rep.conversion}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{rep.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
