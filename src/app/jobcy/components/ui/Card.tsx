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
    default: "bg-[var(--surface)] shadow-md border border-[var(--border)]",
    elevated: "bg-[var(--surface)] shadow-xl border border-[var(--border)]",
    outlined: "bg-[var(--surface)] border-2 border-[var(--border)]",
    gradient: "bg-[var(--surface-secondary)] border border-[var(--border)] shadow-lg",
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
    <div className={cn("px-6 py-4 border-b border-[var(--border)]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-bold text-[var(--foreground)]", className)} {...props}>
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
    <div className={cn("px-6 py-4 border-t border-[var(--border)]", className)} {...props}>
      {children}
    </div>
  );
}

