"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do deliverable file downloads work after purchase?",
      a: "Upon completing payment, you receive instant access to your deliverable source ZIP package containing all source code, Figma design system files, and documentation. Downloads are also available anytime in your Customer Dashboard.",
    },
    {
      q: "What licenses are included with Prime Tools digital assets?",
      a: "Every product includes an Enterprise Royalty-Free License, granting you rights to build unlimited commercial SaaS applications, client websites, or internal business tools without recurring fees.",
    },
    {
      q: "Can I manage store categories, products, and branding without editing code?",
      a: "Yes! Everything is editable live through the Prime Tools Admin Control Panel (`/admin`). You can manage categories, create products, configure payment gateways, and change branding settings live.",
    },
    {
      q: "What payment methods are supported at checkout?",
      a: "We support Stripe, PayPal, JazzCash, EasyPaisa, Apple Pay, and Google Pay, configured directly from your Admin Control Panel.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="glass" size="md" dot>
            Frequently Asked Questions
          </Badge>
          <h2 className="font-serif italic font-bold text-4xl text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                variant="white"
                className="border border-slate-200 overflow-hidden transition-all shadow-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-sky-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180 text-sky-600" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
