"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  XCircle, 
  FileText, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  User, 
  CreditCard, 
  DollarSign, 
  ArrowRight,
  Download
} from "lucide-react";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Modal } from "../ui/Modal";
import { useToast } from "../../context/ToastContext";

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  productTitle: string;
  amount: number;
  gateway: "Stripe" | "PayPal" | "JazzCash" | "EasyPaisa";
  date: string;
  status: "Completed" | "Processing" | "Refunded" | "Cancelled";
  timeline: { step: string; timestamp: string; done: boolean }[];
  billingAddress: string;
}

// Clean Orders Inventory State
const INITIAL_ORDERS: AdminOrder[] = [];

export const OrderManagementSuite: React.FC = () => {
  const toast = useToast();

  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Filtered Orders List
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === "All" || ord.status === statusFilter;
    const matchesSearch =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Refund Order Handler
  const handleRefund = (id: string, customerName: string) => {
    setOrders(
      orders.map((ord) => {
        if (ord.id === id) {
          const updated: AdminOrder = {
            ...ord,
            status: "Refunded",
            timeline: [
              ...ord.timeline,
              { step: "Refund Issued by Admin", timestamp: new Date().toLocaleString(), done: true },
            ],
          };
          toast.success("Order Refunded", `Issued full refund for ${id} (${customerName})`);
          if (selectedOrder?.id === id) setSelectedOrder(updated);
          return updated;
        }
        return ord;
      })
    );
  };

  // Cancel Order Handler
  const handleCancel = (id: string) => {
    setOrders(
      orders.map((ord) => {
        if (ord.id === id) {
          const updated: AdminOrder = { ...ord, status: "Cancelled" };
          toast.error("Order Cancelled", `Order ${id} marked as Cancelled.`);
          if (selectedOrder?.id === id) setSelectedOrder(updated);
          return updated;
        }
        return ord;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 text-xs font-medium rounded-xl bg-white border border-slate-200 text-slate-900"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 text-xs font-bold rounded-xl bg-white border border-slate-200 text-slate-900 cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Refunded">Refunded</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <Badge variant="glass" size="md" dot>
          {filteredOrders.length} Orders Listed
        </Badge>
      </div>

      {/* Orders Directory Table */}
      <Card variant="white" className="p-0 border border-slate-200/80 overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Order Reference</th>
              <th className="p-4">Customer Details</th>
              <th className="p-4">Product Purchased</th>
              <th className="p-4">Gateway</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredOrders.map((ord) => (
              <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono font-bold text-slate-900">{ord.id}</td>
                <td className="p-4">
                  <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                  <span className="text-[10px] text-slate-500">{ord.customerEmail}</span>
                </td>
                <td className="p-4 font-semibold text-slate-800">{ord.productTitle}</td>
                <td className="p-4">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {ord.gateway}
                  </span>
                </td>
                <td className="p-4 font-bold text-slate-900">${ord.amount.toFixed(2)}</td>
                <td className="p-4">
                  <Badge
                    variant={
                      ord.status === "Completed"
                        ? "success"
                        : ord.status === "Refunded"
                        ? "warning"
                        : "outline"
                    }
                    size="sm"
                    dot
                  >
                    {ord.status}
                  </Badge>
                </td>
                <td className="p-4 text-right space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => setSelectedOrder(ord)}
                  >
                    View Timeline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Order Detail & Timeline Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="lg"
        title={`Order Details ${selectedOrder?.id}`}
        description={`Purchased by ${selectedOrder?.customerName}`}
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText className="w-4 h-4" />}
              onClick={() => toast.success("Invoice PDF Downloaded", `#INV-${selectedOrder?.id}.pdf saved.`)}
            >
              Download PDF Invoice
            </Button>

            <div className="flex items-center gap-2">
              {selectedOrder?.status === "Completed" && (
                <Button
                  variant="danger"
                  size="sm"
                  leftIcon={<RotateCcw className="w-4 h-4" />}
                  onClick={() => selectedOrder && handleRefund(selectedOrder.id, selectedOrder.customerName)}
                >
                  Issue Refund
                </Button>
              )}
              <Button variant="primary" size="sm" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer & Billing Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Customer Email</span>
                <span className="font-bold text-slate-900">{selectedOrder.customerEmail}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Payment Gateway</span>
                <span className="font-bold text-slate-900">{selectedOrder.gateway}</span>
              </div>
              <div className="col-span-2 border-t border-slate-200/60 pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Billing Address</span>
                <span className="text-slate-700 font-medium">{selectedOrder.billingAddress}</span>
              </div>
            </div>

            {/* Interactive Order Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Order Audit & Security Timeline
              </h4>
              <div className="space-y-3">
                {selectedOrder.timeline.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{item.step}</span>
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
