"use client";
import { X, Menu } from "lucide-react";
import { useContext } from "react";
import { MobileMenuContext } from "@/components/dashboard/DashboardLayout";

export default function MobileMenuButton() {
  const { isOpen, setIsOpen } = useContext(MobileMenuContext);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  );
}
