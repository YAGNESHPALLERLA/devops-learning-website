import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobcy Portal",
  description: "Jobcy portal for freshers & experience",
};

export default function JobcyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
