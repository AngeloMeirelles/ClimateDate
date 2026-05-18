"use client";

import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = "" }: Props) {
  return (
    <div className={`bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </div>
  );
}
