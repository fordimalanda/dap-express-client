"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, PhoneCall, Package, Home, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "DAP-REF-EXPRESS";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
        <CheckCircle className="h-12 w-12" />
      </div>

      <span className="inline-block rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
        Commande enregistrée avec succès
      </span>

      <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
        Merci pour votre confiance !
      </h1>

      <p className="mt-3 text-base text-gray-600">
        Votre commande n° <strong className="text-gray-900">{order?.orderNumber || orderNumber}</strong> a bien été transmise à notre équipe de préparation.
      </p>

      {/* Next Steps Box */}
      <div className="mt-8 rounded-3xl bg-white border border-gray-200/80 p-6 text-left shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <Package className="h-5 w-5 text-[#FF6B00]" /> Prochaines étapes de livraison :
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#FF6B00]">
              1
            </div>
            <p>
              <strong>Confirmation téléphonique :</strong> Notre service logistique va vous appeler dans les prochaines minutes pour confirmer vos disponibilités et l'adresse.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#FF6B00]">
              2
            </div>
            <p>
              <strong>Expédition & Livraison :</strong> Le coursier se déplacera avec votre colis sous 24h à 48h.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-[#FF6B00]">
              3
            </div>
            <p>
              <strong>Paiement en espèces :</strong> Vous inspectez votre commande et vous payez directement à la réception.
            </p>
          </div>
        </div>

        {order && (
          <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-3xl text-sm">
            <div className="flex justify-between font-medium text-gray-700">
              <span>Client :</span>
              <span className="font-bold text-gray-900">{order.customerFirstName} {order.customerLastName}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700 mt-1">
              <span>Téléphone :</span>
              <span className="font-bold text-gray-900">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700 mt-1">
              <span>Ville / Quartier :</span>
              <span className="font-bold text-gray-900">{order.deliveryCity} - {order.deliveryAddress}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700 mt-1">
              <span>Montant à régler au coursier :</span>
              <span className="font-black text-[#FF6B00] text-base">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-gray-800 transition"
        >
          <Home className="h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
