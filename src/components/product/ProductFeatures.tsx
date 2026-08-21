import React from "react";
import { CheckCircle2, ShieldCheck, Truck, Clock } from "lucide-react";

interface ProductFeaturesProps {
  features?: string[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  const defaultTrustItems = [
    {
      icon: Truck,
      title: "Livraison Rapide 24-48h",
      desc: "Expédition immédiate partout dans le pays",
    },
    {
      icon: ShieldCheck,
      title: "Paiement à la Livraison",
      desc: "Payez en espèces après vérification du colis",
    },
    {
      icon: Clock,
      title: "Service Client 7j/7",
      desc: "Assistance téléphonique et WhatsApp",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Product Specific Features */}
      {features && features.length > 0 && (
        <div className="rounded-2xl bg-orange-50/70 border border-orange-200/60 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-[#FF6B00]">★</span> Points Forts du Produit :
          </h3>
          <ul className="space-y-2.5">
            {features.map((feat, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {defaultTrustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center sm:flex-col sm:items-start p-3.5 rounded-xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="p-2 rounded-lg bg-orange-100 text-[#FF6B00] mr-3 sm:mr-0 sm:mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
