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
    <Card variant="elevated" hover className={cn("animate-fadeInUp", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-2">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-semibold",
                trend.positive ? "text-green-400" : "text-red-400"
              )}>
                <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
                <span>{trend.value}%</span>
                <span className="ml-1 text-gray-500 font-normal">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"
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

