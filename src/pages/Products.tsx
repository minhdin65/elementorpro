import { Link } from "react-router-dom";
import { products, type Product } from "../data/products";
import { ChevronRight } from "lucide-react";

function ProductCard({ p }: { p: Product }) {
  const displayPrice = p.promoPrice ?? p.price;
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      {/* Visual header */}
      <div
        className="h-36 flex items-center justify-center"
        style={
          p.imageType === "gradient" && p.gradientFrom && p.gradientTo
            ? { background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }
            : { backgroundColor: "#f1f5f9" }
        }
      >
        {p.imageUrl ? (
          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-2xl font-bold tracking-tight">{p.name}</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">{p.shortDesc}</p>

        {/* Price: $X.XX || Free for members */}
        <p className="text-sm mb-4">
          <span className="text-emerald-600 font-semibold">Price: ${displayPrice.toFixed(2)}</span>
          <span className="text-slate-400 mx-1">||</span>
          <span className="text-red-600 font-medium">Free for members</span>
        </p>

        {/* Purchase button */}
        <Link
          to={`${p.checkoutPath ?? "/checkout"}?product=${p.id}`}
          className="w-full inline-flex items-center justify-center py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors mb-3"
        >
          ${displayPrice.toFixed(2)} – Purchase
        </Link>

        {/* View details */}
        <Link
          to={p.detailPath}
          className="inline-flex items-center gap-1 text-slate-700 font-medium text-sm hover:text-indigo-600 transition-colors"
        >
          VIEW DETAILS <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export default function Products() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Products</h1>
        <p className="text-slate-600">Professional Elementor plugins and add-ons for your WordPress site.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
