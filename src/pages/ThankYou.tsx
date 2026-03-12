import { Link, useSearchParams } from "react-router-dom";
import { CircleCheck, Download, Home } from "lucide-react";
import { products } from "../data/products";
import { PRODUCT } from "./Product";

const CUSTOMER_KEY = "checkout_customer";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const productFromList = products.find((p) => p.id === productId);
  const product = productFromList ?? { name: PRODUCT.name, downloadUrl: "/downloads/elementor-pro.zip" };
  const downloadUrl = productFromList?.downloadUrl ?? "/downloads/elementor-pro.zip";
  let customerName = "";
  try {
    const stored = sessionStorage.getItem(CUSTOMER_KEY);
    if (stored) {
      const { name } = JSON.parse(stored);
      customerName = name || "";
      sessionStorage.removeItem(CUSTOMER_KEY);
    }
  } catch (_) {}

  return (
    <div className="max-w-xl mx-auto py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
        <CircleCheck className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Thank You{customerName ? `, ${customerName}` : ""}!
        </h1>
        <p className="text-slate-600 mb-2">
          We sincerely appreciate your trust in us. Your payment was successful and your order has been confirmed.
        </p>
        <p className="text-slate-600 mb-8">
          Thank you for choosing <strong>{product.name}</strong>. We hope it helps you build amazing websites!
        </p>

        <div className="space-y-4 mb-10">
          <p className="text-sm font-semibold text-slate-700">Download your product</p>
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            Download {product.name}
          </a>
          <p className="text-xs text-slate-500">
            You will also receive an email with the download link. Please check your inbox.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
