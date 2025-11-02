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
    default: "bg-white shadow-sm border border-gray-200",
    elevated: "bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow",
    outlined: "bg-white border-2 border-gray-300",
    gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-md",
  };

  const hoverStyles = hover ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer" : "";

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
    <div className={cn("px-6 py-4 border-b border-gray-200", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-bold text-gray-900", className)} {...props}>
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
    <div className={cn("px-6 py-4 border-t border-gray-200 bg-gray-50", className)} {...props}>
      {children}
    </div>
  );
}

