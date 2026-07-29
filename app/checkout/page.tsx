"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, CreditCard, ArrowRight, Download, CheckCircle2, FileText, Sparkles } from "lucide-react";

import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { PageTransition } from "../../components/layout/PageTransition";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { PaymentGateways } from "../../components/payment/PaymentGateways";
import { RobotPackageScanner } from "../../components/animation/RobotPackageScanner";

import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, promoDiscount, grandTotal, promoCode, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();

  const [selectedGateway, setSelectedGateway] = useState<string>("stripe");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [purchasedOrder, setPurchasedOrder] = useState<any>(null);

  const handleCompleteCheckout = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: user ? user.name : "Guest Customer",
          customerEmail: user ? user.email : "guest@primetools.design",
          items: cartItems.map((i) => ({ id: i.id, title: i.title, price: i.price })),
          totalAmount: grandTotal,
          gateway: selectedGateway.toUpperCase(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPurchasedOrder(data.order);
        setIsSuccess(true);
        clearCart();
        toast.success("Payment Verified", "Order package generated successfully!");
      }
    } catch (e) {
      toast.error("Checkout Error", "Failed to process order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
        <Header />

        <main className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {!isSuccess ? (
            <div className="space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <Badge variant="primary" size="md" dot>
                  Encrypted 256-Bit Checkout
                </Badge>
                <h1 className="font-serif italic font-bold text-4xl text-slate-900 tracking-tight">
                  Complete Secure Order
                </h1>
                <p className="text-xs text-slate-500">
                  Instant deliverable source ZIP package & lifetime license keys.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                  <PaymentGateways
                    selectedGateway={selectedGateway}
                    onSelectGateway={setSelectedGateway}
                  />

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full h-14 text-sm font-bold shadow-lg"
                    isLoading={isProcessing}
                    onClick={handleCompleteCheckout}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Pay ${grandTotal.toFixed(2)} & Instant Download
                  </Button>
                </div>

                <div className="lg:col-span-5">
                  <Card variant="white" className="p-6 border border-slate-200/80 shadow-soft space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                      Order Items Summary ({cartItems.length})
                    </h3>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{item.title}</span>
                          <span className="font-mono text-slate-900">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-semibold">
                      <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Discount ({promoCode})</span>
                          <span>-${promoDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                        <span>Total Due</span>
                        <span className="text-sky-600 font-mono">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
              <RobotPackageScanner isScanning={false} scanSuccess={true} />

              <div className="space-y-2">
                <Badge variant="success" size="md" dot>
                  Purchase Verified
                </Badge>
                <h1 className="font-serif italic font-bold text-4xl text-slate-900">
                  Thank You for Your Order!
                </h1>
                <p className="text-xs text-slate-500">
                  Order ID: <span className="font-mono font-bold text-slate-900">{purchasedOrder?.id}</span>
                </p>
              </div>

              <Card variant="white" className="p-6 border border-slate-200 shadow-soft text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">License Security Token</span>
                  <code className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg">
                    {purchasedOrder?.downloadToken}
                  </code>
                </div>

                <div className="space-y-2">
                  {purchasedOrder?.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Format: Deliverable Source ZIP</span>
                      </div>

                      <Link href={`/download/${purchasedOrder?.id}`}>
                        <Button variant="primary" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                          Download ZIP
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="md">
                    Go to Customer Dashboard
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="primary" size="md">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
