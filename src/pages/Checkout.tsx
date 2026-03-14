import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PRODUCT } from "./Product";
import { products } from "../data/products";

const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "";
const currency = "USD";

const CUSTOMER_KEY = "checkout_customer";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });
  const productId = searchParams.get("product");
  const productFromList = products.find((p) => p.id === productId);
  const product = productFromList
    ? { name: productFromList.name, price: productFromList.promoPrice ?? productFromList.price }
    : PRODUCT;

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isFormValid = customer.name.trim().length > 0 && isValidEmail(customer.email);
  if (!clientId) {
    return (
      <div className="max-w-2xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <p className="text-amber-800 font-medium">PayPal is not configured</p>
          <p className="text-sm text-amber-700 mt-2">
            Add <code className="bg-amber-100 px-1 rounded">VITE_PAYPAL_CLIENT_ID</code> to your <code className="bg-amber-100 px-1 rounded">.env</code> file and restart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Order summary */}
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">{product.name}</p>
              <p className="text-sm text-slate-500">One-time purchase</p>
            </div>
            <p className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Customer info */}
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Your Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              {touched.name && !customer.name.trim() && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={customer.email}
                onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              {touched.email && !isValidEmail(customer.email) && (
                <p className="text-red-500 text-sm mt-1">
                  {!customer.email ? "Email is required" : "Please enter a valid email"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment - PayPal */}
        <div className="p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Payment</h2>
          {!isFormValid ? (
            <div className="rounded-xl p-8 border-2 border-dashed border-slate-200 bg-slate-50 text-center">
              <p className="text-slate-600 font-medium">Please fill in your name and email above to proceed with payment.</p>
            </div>
          ) : (
          <div className="rounded-xl overflow-hidden min-h-[200px]">
            <PayPalScriptProvider
              options={{
                clientId,
                currency,
                intent: "capture",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                }}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: currency,
                          value: product.price.toFixed(2),
                        },
                        description: `${product.name} - One-time purchase`,
                      },
                    ],
                  });
                }}
                onApprove={async (_data, actions) => {
                  if (!actions.order) return;
                  const details = await actions.order.capture();
                  try {
                    sessionStorage.setItem(CUSTOMER_KEY, JSON.stringify({ name: customer.name.trim(), email: customer.email.trim() }));
                  } catch (_) {}
                  window.location.hash = `#/thank-you?product=${productId || "elementor-pro"}`;
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                }}
              />
            </PayPalScriptProvider>
          </div>
          )}
          <p className="text-xs text-slate-500 mt-4 text-center">
            Secure payment via PayPal • 100% original product • Instant download after purchase
          </p>
        </div>
      </div>
    </div>
  );
}
