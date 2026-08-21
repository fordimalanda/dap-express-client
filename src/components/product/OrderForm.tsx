"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "@/lib/validations/order.schema";
import { submitOrder } from "@/lib/api";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, ShoppingBag, Plus, Minus } from "lucide-react";

interface OrderFormProps {
  product: Product;
}

export function OrderForm({ product }: OrderFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      quantity: 1,
      customerFirstName: "",
      customerLastName: "",
      customerPhone: "",
      deliveryCity: "",
      deliveryAddress: "",
      notes: "",
    },
  });

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(newQty);
    setValue("quantity", newQty);
  };

  const totalPrice = product.price * quantity;

  const onSubmit = async (values: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await submitOrder({
        productId: product.id,
        quantity: values.quantity,
        customerFirstName: values.customerFirstName,
        customerLastName: values.customerLastName,
        customerPhone: values.customerPhone,
        deliveryCity: values.deliveryCity,
        deliveryAddress: values.deliveryAddress,
        notes: values.notes,
      });

      if (res.success && res.order) {
        // Enregistrer temporairement dans le session storage pour la page de remerciement
        sessionStorage.setItem("last_order", JSON.stringify(res.order));
        router.push(`/thank-you?orderId=${res.order.id}&orderNumber=${res.order.orderNumber}`);
      } else {
        alert(res.message || "Une erreur est survenue lors de la commande.");
      }
    } catch (err: any) {
      console.error(err);
      alert("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="order-section" className="rounded-3xl border-2 border-[#FF6B00]/40 bg-white p-6 sm:p-8 shadow-xl shadow-orange-500/5">
      <div className="text-center pb-6 border-b border-gray-100">
        <span className="inline-block bg-orange-100 text-[#FF6B00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          ⚡ Offre Spéciale & Paiement à la Réception
        </span>
        <h2 className="text-2xl font-black text-gray-900">
          Commandez maintenant en 30 secondes !
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Remplissez le formulaire ci-dessous. Pas besoin de carte bancaire, vous payez lors de la livraison.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
        {/* Quantity Selector */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Quantité</span>
            <div className="text-sm font-semibold text-gray-900">Sélectionnez le nombre d'articles</div>
          </div>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 active:scale-95"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-extrabold text-base w-6 text-center text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            placeholder="Ex: Jean"
            required
            error={errors.customerFirstName?.message}
            {...register("customerFirstName")}
          />
          <Input
            label="Nom"
            placeholder="Ex: Dupont"
            required
            error={errors.customerLastName?.message}
            {...register("customerLastName")}
          />
        </div>

        {/* Phone Field */}
        <Input
          label="Numéro de Téléphone (WhatsApp de préférence)"
          placeholder="Ex: 07 12 34 56 78"
          type="tel"
          required
          error={errors.customerPhone?.message}
          {...register("customerPhone")}
        />

        {/* City & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Ville de livraison"
            placeholder="Ex: Abidjan / Dakar / Lomé"
            required
            error={errors.deliveryCity?.message}
            {...register("deliveryCity")}
          />
          <Input
            label="Quartier / Adresse précise"
            placeholder="Ex: Cocody Angré 8ème tranche"
            required
            error={errors.deliveryAddress?.message}
            {...register("deliveryAddress")}
          />
        </div>

        <Textarea
          label="Instructions complémentaires (Optionnel)"
          placeholder="Repère, créneau horaire préféré pour la livraison..."
          {...register("notes")}
        />

        {/* Summary Card */}
        <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-200">
          <div className="flex justify-between items-center text-sm text-gray-700">
            <span>Prix unitaire :</span>
            <span className="font-bold">{formatPrice(product.price)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-700 mt-1">
            <span>Livraison :</span>
            <span className="text-emerald-700 font-bold">GRATUITE (Promo)</span>
          </div>
          <div className="border-t border-orange-200/80 my-2 pt-2 flex justify-between items-center">
            <span className="text-base font-extrabold text-gray-900">Total à payer :</span>
            <span className="text-2xl font-black text-[#FF6B00]">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="xl"
          isLoading={isSubmitting}
          className="w-full text-lg shadow-xl shadow-orange-500/25 uppercase tracking-wider font-black py-5 h-auto animate-pulse hover:animate-none"
        >
          <ShoppingBag className="h-6 w-6 mr-2" />
          CONFIRMER MA COMMANDE • {formatPrice(totalPrice)}
        </Button>

        <div className="flex items-center justify-center gap-6 pt-2 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1">
            <Truck className="h-4 w-4 text-emerald-600" /> Livraison 24h-48h
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Paiement à la réception
          </span>
        </div>
      </form>
    </div>
  );
}
