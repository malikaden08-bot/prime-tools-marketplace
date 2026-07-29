"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Shield, 
  ShieldAlert, 
  Lock, 
  Key, 
  Download, 
  ShoppingBag, 
  Search, 
  Check, 
  X, 
  AlertTriangle,
  History,
  Mail,
  Calendar,
  DollarSign
} from "lucide-react";

import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Modal } from "../ui/Modal";
import { useToast } from "../../context/ToastContext";
import { UserRole } from "../../context/AuthContext";

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  totalSpent: number;
  totalOrders: number;
  joinedDate: string;
  status: "Active" | "Banned";
  purchaseHistory: { orderId: string; title: string; price: number; date: string }[];
  downloadLogs: { fileName: string; date: string; ip: string }[];
  activityLogs: { action: string; timestamp: string; ip: string }[];
}

// Clean Customer Directory State
const INITIAL_CUSTOMERS: AdminCustomer[] = [];

export const CustomerManagementSuite: React.FC = () => {
  const toast = useToast();

  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle Ban/Unban Customer
  const handleToggleBan = (id: string, name: string) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === id) {
          const newStatus = c.status === "Active" ? "Banned" : "Active";
          toast.error(
            newStatus === "Banned" ? "Customer Banned" : "Customer Unbanned",
            `Account status for "${name}" set to ${newStatus}.`
          );
          const updated = { ...c, status: newStatus as "Active" | "Banned" };
          if (selectedCustomer?.id === id) setSelectedCustomer(updated);
          return updated;
        }
        return c;
      })
    );
  };

  // Toggle Role (Customer vs Admin)
  const handleToggleRole = (id: string, name: string) => {
    setCustomers(
      customers.map((c) => {
        if (c.id === id) {
          const newRole: UserRole = c.role === "Admin" ? "Customer" : "Admin";
          toast.success("Role Updated", `Promoted "${name}" to ${newRole}.`);
          const updated = { ...c, role: newRole };
          if (selectedCustomer?.id === id) setSelectedCustomer(updated);
          return updated;
        }
        return c;
      })
    );
  };

  // Trigger Password Reset Email
  const handleTriggerPasswordReset = (email: string) => {
    toast.info("Password Reset Emailed", `Instructions sent to ${email}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Search & Count */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-xs font-medium rounded-xl bg-white border border-slate-200 text-slate-900"
          />
        </div>

        <Badge variant="glass" size="md" dot>
          {filteredCustomers.length} Active Accounts
        </Badge>
      </div>

      {/* Customer Directory Table */}
      <Card variant="white" className="p-0 border border-slate-200/80 overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">Customer Profile</th>
              <th className="p-4">Role</th>
              <th className="p-4">Purchases</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                    <div>
                      <span className="font-bold text-slate-900 block">{c.name}</span>
                      <span className="text-[10px] text-slate-500">{c.email}</span>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <Badge variant={c.role === "Admin" ? "primary" : "outline"} size="sm">
                    {c.role}
                  </Badge>
                </td>

                <td className="p-4 font-semibold text-slate-700">
                  {c.totalOrders} Orders
                </td>

                <td className="p-4 font-bold text-slate-900">
                  ${c.totalSpent.toFixed(2)}
                </td>

                <td className="p-4">
                  <Badge variant={c.status === "Active" ? "success" : "warning"} size="sm" dot>
                    {c.status}
                  </Badge>
                </td>

                <td className="p-4 text-right space-x-1">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(c)}>
                    Profile & Logs
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Customer Profile & Activity Log Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        maxWidth="xl"
        title={`Customer Profile: ${selectedCustomer?.name}`}
        description={`Member since ${selectedCustomer?.joinedDate}`}
        footer={
          <div className="flex items-center justify-between w-full">
            <Button
              variant="danger"
              size="sm"
              leftIcon={<ShieldAlert className="w-4 h-4" />}
              onClick={() => selectedCustomer && handleToggleBan(selectedCustomer.id, selectedCustomer.name)}
            >
              {selectedCustomer?.status === "Active" ? "Ban Account" : "Unban Account"}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Lock className="w-4 h-4" />}
                onClick={() => selectedCustomer && handleTriggerPasswordReset(selectedCustomer.email)}
              >
                Reset Password
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedCustomer(null)}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        {selectedCustomer && (
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
            {/* Header Info */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedCustomer.name}</h4>
                  <span className="text-xs text-slate-500 block">{selectedCustomer.email}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleRole(selectedCustomer.id, selectedCustomer.name)}
              >
                Role: {selectedCustomer.role} (Click to Switch)
              </Button>
            </div>

            {/* Purchase History */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Purchase History ({selectedCustomer.purchaseHistory.length} items)
              </h4>
              <div className="space-y-2">
                {selectedCustomer.purchaseHistory.map((ph, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs font-medium">
                    <span className="font-bold text-slate-900">{ph.title}</span>
                    <span className="text-slate-500">${ph.price.toFixed(2)} • {ph.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Logs */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Download Audit Logs
              </h4>
              <div className="space-y-2">
                {selectedCustomer.downloadLogs.map((dl, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{dl.fileName}</span>
                    <span className="text-slate-500">{dl.date} • IP: {dl.ip}</span>
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
