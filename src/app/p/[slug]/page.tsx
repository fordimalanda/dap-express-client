import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { OrderForm } from "@/components/product/OrderForm";
import { formatPrice } from "@/lib/utils";
import { Star, ShieldCheck, ShoppingCart, ArrowDown } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: "Produit non trouvé | Dap-Express" };
  }
  return {
    title: `${product.name} | Dap-Express`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
      {/* Product Header / Title for Mobile */}
      <div className="mb-6 lg:hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-500">(148 avis vérifiés)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
          {product.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Media & Description */}
        <div className="lg:col-span-6 space-y-6">
          <ProductGallery
            images={product.images}
            productName={product.name}
            originalPrice={product.originalPrice}
            price={product.price}
          />

          {/* Desktop Title & Details */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-500">(148 avis vérifiés)</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
            <span className="text-3xl sm:text-4xl font-black text-[#FF6B00]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through font-semibold">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="ml-auto bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                Économisez {discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm text-gray-700 leading-relaxed bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-2">Description du produit</h3>
            <p>{product.description}</p>
          </div>

          {/* Features */}
          <ProductFeatures features={product.features} />

          {/* Mobile Jump to order form */}
          <div className="lg:hidden">
            <a
              href="#order-section"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#FF6B00] text-white font-black rounded-2xl text-center shadow-lg uppercase"
            >
              Commander maintenant
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>

        {/* Right Column: Direct Purchase Form */}
        <div className="lg:col-span-6 lg:sticky lg:top-6">
          <OrderForm product={product} />
        </div>
      </div>
    </div>
  );
}
