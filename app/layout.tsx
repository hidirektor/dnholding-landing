import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "DN Holding",
  description: "DN Holding — Geleceği İnşa Ediyoruz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
