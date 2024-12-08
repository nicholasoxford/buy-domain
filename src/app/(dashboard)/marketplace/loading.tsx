import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Section skeleton */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-lg p-8">
        <div className="h-10 w-72 bg-slate-800/50 rounded animate-pulse" />
        <div className="h-6 w-96 bg-slate-800/50 rounded animate-pulse" />

        <div className="mt-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-12 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-12 w-40 bg-slate-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Results skeleton */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse" />
        </div>

        <div className="divide-y divide-slate-800">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-6 w-48 bg-slate-800/50 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-slate-800/50 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-slate-800/50 rounded-full animate-pulse" />
                  </div>
                  <div className="h-6 w-24 bg-slate-800/50 rounded animate-pulse" />
                </div>
                <div className="h-8 w-28 bg-slate-800/50 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
