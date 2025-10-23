import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobcy Portal - OHG365",
  description: "Jobcy portal for freshers & experience",
};

export default function JobcyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">

      {/* Jobcy Content */}
      <main className="relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
