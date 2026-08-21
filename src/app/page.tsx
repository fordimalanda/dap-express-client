import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold text-[#FF6B00] mb-6">
        <Star className="h-4 w-4 fill-[#FF6B00]" />
        Plateforme E-commerce & Vente Directe Express
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
        Bienvenue sur <span className="text-[#FF6B00]">Dap-Express</span>
      </h1>
      
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Découvrez nos produits vedettes soigneusement sélectionnés avec livraison express à domicile et paiement à la réception.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/p/pack-ecouteurs-pro-max"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-[#E05E00] transition-all"
        >
          <ShoppingBag className="h-5 w-5" />
          Découvrir le Produit Vedette
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <Truck className="h-8 w-8 text-[#FF6B00] mb-3" />
          <h3 className="font-bold text-gray-900">Livraison 24h-48h</h3>
          <p className="text-sm text-gray-500 mt-1">Expédition directe et rapide chez vous ou sur votre lieu de travail.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-emerald-600 mb-3" />
          <h3 className="font-bold text-gray-900">Paiement à la Livraison</h3>
          <p className="text-sm text-gray-500 mt-1">Vérifiez la conformité de votre colis avant de régler le livreur.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <Star className="h-8 w-8 text-amber-500 mb-3" />
          <h3 className="font-bold text-gray-900">Qualité Garantie</h3>
          <p className="text-sm text-gray-500 mt-1">Tous nos produits sont vérifiés et garantis par notre équipe.</p>
        </div>
      </div>
    </div>
  );
}
