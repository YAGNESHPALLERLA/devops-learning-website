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
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-semibold",
                trend.positive ? "text-green-600" : "text-red-600"
              )}>
                <span className="mr-1">{trend.positive ? "↑" : "↓"}</span>
                <span>{trend.value}%</span>
                <span className="ml-1 text-gray-500 font-normal">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-md"
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

