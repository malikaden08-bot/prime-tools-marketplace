"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface PaymentGatewayConfig {
  id: string;
  name: string;
  enabled: boolean;
  apiKey?: string;
  merchantId?: string;
}

export interface SiteConfig {
  siteName: string;
  logoText: string;
  tagline: string;
  noticeBanner: string;
  contactEmail: string;
  commissionRate: number;
  categories: string[];
  paymentGateways: PaymentGatewayConfig[];
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "Prime Tools",
  logoText: "P",
  tagline: "Digital Assets & Software Tools",
  noticeBanner: "Prime Motion System 2.0 is now live.",
  contactEmail: "support@primetools.com",
  commissionRate: 85,
  categories: [],
  paymentGateways: [
    { id: "stripe", name: "Stripe", enabled: true, apiKey: "pk_live_prime_stripe_key_8829" },
    { id: "paypal", name: "PayPal", enabled: true, merchantId: "paypal_merchant_prime_001" },
    { id: "jazzcash", name: "JazzCash", enabled: true, merchantId: "jazzcash_merchant_9912" },
    { id: "easypaisa", name: "EasyPaisa", enabled: true, merchantId: "easypaisa_merchant_7734" },
    { id: "applepay", name: "Apple Pay", enabled: true },
    { id: "googlepay", name: "Google Pay", enabled: true },
  ],
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  addCategory: (name: string) => void;
  editCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
  toggleGateway: (gatewayId: string) => void;
  updateGatewayDetails: (gatewayId: string, details: Partial<PaymentGatewayConfig>) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem("prime_tools_site_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...parsed, categories: parsed.categories || [] });
      } catch (e) {}
    }
  }, []);

  const saveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem("prime_tools_site_config", JSON.stringify(newConfig));
  };

  const updateConfig = (updates: Partial<SiteConfig>) => {
    saveConfig({ ...config, ...updates });
  };

  const addCategory = (name: string) => {
    const trimmed = name.trim();
    if (trimmed && !config.categories.includes(trimmed)) {
      saveConfig({ ...config, categories: [...config.categories, trimmed] });
    }
  };

  const editCategory = (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    saveConfig({
      ...config,
      categories: config.categories.map((c) => (c === oldName ? trimmed : c)),
    });
  };

  const deleteCategory = (name: string) => {
    saveConfig({
      ...config,
      categories: config.categories.filter((c) => c !== name),
    });
  };

  const toggleGateway = (gatewayId: string) => {
    saveConfig({
      ...config,
      paymentGateways: config.paymentGateways.map((g) =>
        g.id === gatewayId ? { ...g, enabled: !g.enabled } : g
      ),
    });
  };

  const updateGatewayDetails = (gatewayId: string, details: Partial<PaymentGatewayConfig>) => {
    saveConfig({
      ...config,
      paymentGateways: config.paymentGateways.map((g) =>
        g.id === gatewayId ? { ...g, ...details } : g
      ),
    });
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        addCategory,
        editCategory,
        deleteCategory,
        toggleGateway,
        updateGatewayDetails,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
};
