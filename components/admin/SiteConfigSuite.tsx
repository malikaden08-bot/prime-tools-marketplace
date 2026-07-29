"use client";

import React, { useState } from "react";
import { 
  Globe, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Save, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  DollarSign
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { useSiteConfig } from "../../context/SiteConfigContext";
import { useToast } from "../../context/ToastContext";

export const SiteConfigSuite: React.FC = () => {
  const { config, updateConfig, toggleGateway, updateGatewayDetails } = useSiteConfig();
  const toast = useToast();

  const [siteName, setSiteName] = useState(config.siteName);
  const [logoText, setLogoText] = useState(config.logoText);
  const [tagline, setTagline] = useState(config.tagline);
  const [noticeBanner, setNoticeBanner] = useState(config.noticeBanner);
  const [contactEmail, setContactEmail] = useState(config.contactEmail);
  const [commissionRate, setCommissionRate] = useState(config.commissionRate.toString());

  const handleSaveGeneralConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      siteName,
      logoText,
      tagline,
      noticeBanner,
      contactEmail,
      commissionRate: parseFloat(commissionRate) || 85,
    });
    toast.success("Site Settings Saved", `Updated brand settings for ${siteName}.`);
  };

  return (
    <div className="space-y-8">
      {/* General Site Branding & Identity Controls */}
      <Card variant="white" className="p-6 border border-slate-200/80 dark:border-slate-800 dark:bg-slate-900 shadow-soft">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-500" />
              General Brand & Identity Configuration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changes applied here will immediately update the logo, brand name, header notice, and footer across the site.
            </p>
          </div>
          <Badge variant="glass" size="sm" dot>Live Sync</Badge>
        </div>

        <form onSubmit={handleSaveGeneralConfig} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Store Brand Name
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full h-11 px-4 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Logo Monogram Text / Letter
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full h-11 px-4 text-xs font-serif font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tagline Subtitle
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full h-11 px-4 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Top Announcement Banner Message
            </label>
            <input
              type="text"
              value={noticeBanner}
              onChange={(e) => setNoticeBanner(e.target.value)}
              className="w-full h-11 px-4 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Support Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full h-11 px-4 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Author Commission Rate (%)
              </label>
              <input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
                className="w-full h-11 px-4 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" type="submit" leftIcon={<Save className="w-4 h-4" />}>
              Save Brand Settings
            </Button>
          </div>
        </form>
      </Card>

      {/* Payment Gateway Configuration Suite */}
      <Card variant="white" className="p-6 border border-slate-200/80 dark:border-slate-800 dark:bg-slate-900 shadow-soft">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              Payment Gateways & Credentials Management
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure active checkout payment providers (Stripe, PayPal, JazzCash, EasyPaisa, Apple Pay, Google Pay).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.paymentGateways.map((gw) => (
            <div
              key={gw.id}
              className={`p-4 rounded-2xl border transition-all ${
                gw.enabled
                  ? "bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700"
                  : "bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{gw.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    toggleGateway(gw.id);
                    toast.info("Gateway Status Changed", `${gw.name} is now ${!gw.enabled ? "Enabled" : "Disabled"}`);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  {gw.enabled ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-slate-400" />
                  )}
                  <span>{gw.enabled ? "Active" : "Disabled"}</span>
                </button>
              </div>

              {(gw.id === "stripe" || gw.id === "paypal" || gw.id === "jazzcash" || gw.id === "easypaisa") && (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase">
                    {gw.id === "stripe" ? "API Key / Public Key" : "Merchant Account ID"}
                  </label>
                  <input
                    type="text"
                    value={gw.apiKey || gw.merchantId || ""}
                    onChange={(e) =>
                      updateGatewayDetails(
                        gw.id,
                        gw.id === "stripe" ? { apiKey: e.target.value } : { merchantId: e.target.value }
                      )
                    }
                    placeholder="Enter credential..."
                    className="w-full h-9 px-3 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
