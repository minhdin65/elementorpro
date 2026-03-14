import { useEffect } from "react";

// Replace with your image URL or add public/info-hero.jpg
const INFO_IMAGE = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80";

export default function Info() {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-50 bg-slate-900"
      style={{ minHeight: "100vh" }}
    >
      <img
        src={INFO_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}
