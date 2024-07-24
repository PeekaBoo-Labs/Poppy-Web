import "../globals.css";
import type { Metadata } from "next";
import { font } from "@/lib/constants/fonts";
import NavBar from "@/components/NavBar";
import Footer from "@/components/general/Footer";
import AIContextProvider from "@/lib/ai/ai-context";

export const metadata: Metadata = {
  title: "Poppy: AI Screening",
  description:
    "Learn more about your sexual health profile with our AI screening application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body className="h-screen">
        <AIContextProvider>
          <div className="mx-auto flex h-full max-w-[1300px] flex-col px-[35px] pb-8">
            <NavBar />
            {children}
            {/* <Footer /> */}
          </div>
        </AIContextProvider>
      </body>
    </html>
  );
}
