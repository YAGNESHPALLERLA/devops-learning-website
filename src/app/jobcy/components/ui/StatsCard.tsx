"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "./Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  gradient?: string;
  className?: string;
}

export function StatsCard({ title, value, icon, trend, gradient, className }: StatsCardProps) {
  return (
    <Card variant="elevated" hover className={className}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--foreground-muted)] mb-1">{title}</p>
            <p className="text-3xl font-bold text-[var(--foreground)] mb-2">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-medium",
                trend.positive ? "text-green-500" : "text-[var(--danger-light)]"
              )}>
                <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
                <span>{trend.value}%</span>
                <span className="ml-1 text-[var(--foreground-dim)]">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--primary)]"
            )}
            style={gradient ? { background: gradient } : undefined}
            >
              <div className="text-white">{icon}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

