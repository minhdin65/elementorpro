import { Link } from "react-router-dom";
import { Star, ShoppingCart, Check, Shield } from "lucide-react";

export const PRODUCT = {
  id: "elementor-pro",
  name: "Elementor Pro",
  price: 0.1,
  originalPrice: 4.99,
  desc: "The #1 no-code drag & drop WordPress website builder. 100+ Pro widgets, Theme Builder, WooCommerce, Forms & more.",
  promoEndDate: "05/15",
};

export default function Product() {
  return (
    <div className="space-y-12">
      {/* YouTube Video */}
      <section className="rounded-2xl overflow-hidden bg-slate-900 aspect-video max-w-4xl mx-auto">
        <iframe
          src="https://www.youtube.com/embed/le72grP_Q6k?start=6"
          title="Elementor Pro"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full min-h-[300px]"
        />
      </section>

      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
          THE #1 NO CODE DRAG & DROP WORDPRESS WEBSITE BUILDER POWERING OVER 18M WEBSITES WORLDWIDE, NOW WITH AI.
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
          Elementor, the leading WordPress website creation platform, empowers you to build professional, pixel-perfect websites seamlessly.
        </p>
        <p className="text-slate-600 mb-2">
          Unlock all features with <strong>Elementor Pro</strong>.
        </p>
        <p className="text-sm text-slate-500">
          Need fast and secure cloud hosting for your Elementor site? Try out Elementor Hosting Powered by Google Cloud & Cloudflare. 4.9/5 TrustPilot score.
        </p>
      </section>

      {/* Product + Checkout */}
      <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-4">
              🎁 New Customer Appreciation – Only $0.10 until {PRODUCT.promoEndDate}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Elementor Pro – Page Builder</h2>
            <p className="text-slate-600 mb-6">{PRODUCT.desc}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">Original</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">GPL</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm rounded-full">Plugin</span>
            </div>
            <p className="text-sm text-slate-500">Version: Latest • Full year of updates included</p>
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-3xl font-bold text-slate-900">${PRODUCT.price.toFixed(2)}</p>
                {PRODUCT.originalPrice != null && (
                  <p className="text-lg text-slate-400 line-through">${PRODUCT.originalPrice.toFixed(2)}</p>
                )}
              </div>
              <p className="text-sm text-slate-600 mb-6">One-time purchase • Offer valid until {PRODUCT.promoEndDate}</p>
              <Link
                to="/checkout?product=elementor-pro"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" /> Checkout
              </Link>
              <p className="text-xs text-slate-500 mt-4 text-center">Secure payment via PayPal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Professional Stunning Websites */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" /> Create Professional Stunning Websites
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span><strong>Intuitive Drag & Drop Builder:</strong> Build any website with our no-code, drag-and-drop Editor. Achieve design precision with full control over layout and style.</span></li>
          <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span><strong>Pixel-Perfect Design Tools:</strong> Upload SVGs, apply masks, gradients, box shadows, headline effects, shape dividers, and use built-in CSS controls for advanced customization.</span></li>
          <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span><strong>Template Library:</strong> Apply complete website kits for instant setups, or choose from a vast library of single pages, blocks, and pop-up templates.</span></li>
          <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span><strong>Advanced Widgets:</strong> Access over 40 FREE widgets, including heading, image, text editor, video, button, gallery, carousels, and more.</span></li>
          <li className="flex gap-2"><Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> <span><strong>AI Capabilities:</strong> Revolutionize your design and content creation process with native AI integration. Instantly create sections, text, code, and images.</span></li>
        </ul>
      </section>

      {/* Key features */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">🗝️ Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {["Design System", "Responsive Design", "Mask Shapes", "CSS Transform", "Entrance Animations", "Revision History", "Developer-Friendly", "Floating Buttons", "Theme Builder [Pro]", "Popup Builder [Pro]", "Forms [Pro]", "WooCommerce Builder [Pro]", "Dynamic Content [Pro]", "Notes [Pro]", "Custom Code [Pro]", "Custom CSS [Pro]", "Motion Effects [Pro]", "Custom Fonts & Icons [Pro]"].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-slate-700 text-sm">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Elementor FREE widgets - compact */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4">😍 Elementor FREE Widgets</h2>
        <p className="text-slate-600 text-sm mb-4">Heading, Image, Text Editor, Video, Button, Link in Bio, Image Box, Testimonials, Icon, Icon Box, Social Icons, Image Gallery, Image Carousel, Icon List, Counter, Progress Bar, Nested Tabs, Nested Accordion, Toggle, Rating, Alert, HTML, Shortcode, Menu Anchor, Read More, Sidebar, Google Maps, SoundCloud, Divider, Spacer, Text Path, and more.</p>
      </section>

      {/* Enhance Your Website - Performance */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4">🚀 Enhance Your Website</h2>
        <p className="text-slate-600 text-sm mb-4">Website performance impacts your visitor&apos;s experience and search result ranking. Elementor continuously enhances performance.</p>
        <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-600">
          {["Reduced DOM Output", "Improved Media File Loading", "Reduced CSS and JS Files", "Lazy Loading", "Faster Font Loading", "Optimized Front-End Asset Loading", "Element Caching"].map((f) => (
            <div key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> {f}</div>
          ))}
        </div>
      </section>

      {/* Pro Widgets summary */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4">🔥 Elementor Pro Features</h2>
        <p className="text-slate-600 text-sm mb-4">100+ professional widgets including Posts, Share Buttons, Portfolio, Slides, Form, Login, Nav Menu, Animated Headline, Price Table, Gallery, Flip Box, Media Carousel, Testimonial Carousel, Countdown, Reviews, PayPal Button, Stripe Button, Lottie, Mega Menu, Off Canvas, and Pro Theme & WooCommerce widgets.</p>
      </section>

      {/* Security */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Security and Compliance</h2>
        <p className="text-slate-600 text-sm">Elementor holds ISO/IEC 27001, 27017, 27018, 27701, and SOC 2 Type II certifications. Bug Bounty program available. Trust Center for more information.</p>
      </section>

      {/* Testimonials */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">📣 See What Our Users Have to Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { quote: "Elementor is hands down the best page builder out there", author: "Graphicvision1" },
            { quote: "An incredibly user-friendly plugin", author: "Hyeyoga" },
            { quote: "Easily, my most used WP plugin", author: "Xander Venske" },
            { quote: "I upgraded to the Pro version and just love this plugin!", author: "Andybarn56" },
            { quote: "Excellent product with great tech support", author: "Martywilsonnj" },
          ].map(({ quote, author }) => (
            <div key={author} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm italic">&ldquo;{quote}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">— {author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout CTA */}
      <section className="bg-indigo-600 rounded-2xl p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Build professional websites with Elementor Pro!</h2>
        <p className="text-indigo-100 mb-6">Get access to 100+ widgets, Theme Builder, WooCommerce, and more.</p>
        <Link
          to="/checkout?product=elementor-pro"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" /> Go to Checkout
        </Link>
      </section>
    </div>
  );
}
