"use client";

import type { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = "" }: Props) {
  return (
    <div className={`glass rounded-2xl p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-white/80 mb-4">{title}</h3>
      {children}
    </div>
  );
}
