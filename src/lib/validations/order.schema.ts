import { z } from "zod";

export const orderFormSchema = z.object({
  customerFirstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères"),
  customerLastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères"),
  customerPhone: z
    .string()
    .min(8, "Veuillez entrer un numéro de téléphone valide")
    .regex(/^[0-9+\s()-]+$/, "Format de numéro invalide"),
  deliveryCity: z
    .string()
    .min(2, "Veuillez préciser la ville de livraison"),
  deliveryAddress: z
    .string()
    .min(4, "Veuillez préciser l'adresse détaillée ou le repère"),
  quantity: z
    .number()
    .min(1, "La quantité minimale est 1")
    .max(10, "La quantité maximale par commande est 10")
    .default(1),
  notes: z.string().optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
