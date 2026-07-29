"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Box, Layout, Image as ImageIcon, Code, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { useSiteConfig } from "../../context/SiteConfigContext";

export interface CategoriesSectionProps {
  onSelectCategory?: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  const { config } = useSiteConfig();

  if (config.categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="primary" size="md" dot>
            Asset Taxonomies
          </Badge>
          <h2 className="font-serif italic font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
            Browse Store Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.categories.map((cat, idx) => (
            <Card
              key={idx}
              hoverEffect
              variant="white"
              onClick={() => onSelectCategory && onSelectCategory(cat)}
              className="p-6 border border-slate-200 cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg font-mono">
                  {cat.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {cat}
                  </h3>
                  <span className="text-xs text-slate-400">Explore digital tools →</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
