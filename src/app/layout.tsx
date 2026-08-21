import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dap-Express | Boutique & Livraison Express",
  description: "Commandez en ligne et payez à la livraison partout. Service rapide et fiable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 antialiased flex flex-col justify-between">
        {/* Top promo announcement bar */}
        <div className="bg-gradient-to-r from-orange-600 to-[#FF6B00] text-white text-center py-2 px-4 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
          🔥 Offre Limitée : Livraison Gratuite & Paiement après réception du colis !
        </div>
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-6 mt-12 text-center text-xs text-gray-500">
          <div className="max-w-5xl mx-auto px-4">
            <p className="font-semibold text-gray-700">Dap-Express © {new Date().getFullYear()} - Tous droits réservés.</p>
            <p className="mt-1">Paiement sécurisé à la livraison • Service Client 7j/7</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
