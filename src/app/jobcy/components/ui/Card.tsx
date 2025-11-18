"use client";

import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  hover?: boolean;
  children: ReactNode;
}

export function Card({ variant = 'default', hover = false, className, children, ...props }: CardProps) {
  const baseStyles = "rounded-2xl transition-all duration-300";
  
  const variants = {
    default: "bg-[#1a1a1a] shadow-lg border border-gray-700",
    elevated: "bg-[#1a1a1a] shadow-xl border border-gray-700 hover:shadow-2xl hover:border-gray-600 transition-all",
    outlined: "bg-[#1a1a1a] border-2 border-gray-600",
    gradient: "bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/30 shadow-lg",
  };

  const hoverStyles = hover ? "hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer hover:border-gray-600" : "";

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-700", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-bold text-white", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-700 bg-[#0a0a0a]", className)} {...props}>
      {children}
    </div>
  );
}

