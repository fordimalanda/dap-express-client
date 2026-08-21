# 🛍️ Dap-Express Client (Landing & Tunnel d'Achat Express)

Application Web Client ultra-rapide développée avec **Next.js (App Router)**, **Tailwind CSS**, **React Hook Form** et **Zod**, optimisée pour les campagnes publicitaires (TikTok Ads, Facebook Ads, Google Ads).

## 🚀 Fonctionnalités
- Page produit dynamique (`/p/[slug]`) avec galerie interactive, avis et description attractive.
- Formulaire de commande directe (Cash On Delivery / Paiement à la livraison) sans création de compte.
- Validation instantanée avec Zod & React Hook Form.
- Soumission en temps réel vers l'API Backend Dap-Express.
- Page de remerciement et confirmation (`/thank-you`).

## 🛠️ Installation & Démarrage

```bash
# Installation des dépendances
npm install

# Lancement en mode développement (Port 3001)
npm run dev

# Build de production
npm run build
npm start
```

## ⚙️ Configuration (.env)
Copiez `.env.example` vers `.env.local` et configurez l'URL de votre API :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```
