export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  price: number;
  originalPrice?: number;
  detailPath: string;
  checkoutPath?: string;
  downloadUrl?: string;
  imageType: "gradient" | "image";
  imageUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
  promoPrice?: number;
  promoEndDate?: string;
}

export const products: Product[] = [
  {
    id: "elementor",
    name: "Elementor",
    downloadUrl: "/downloads/elementor.zip",
    shortDesc: "THE #1 NO CODE DRAG & DROP WORDPRESS WEBSITE BUILDER POWERING OVER 18M WEBSITES WORLDWIDE, NOW WITH AI.",
    price: 4.99,
    detailPath: "/product",
    checkoutPath: "/checkout",
    imageType: "gradient",
    gradientFrom: "#7c3aed",
    gradientTo: "#ec4899",
  },
  {
    id: "elementor-pro",
    name: "Elementor Pro",
    downloadUrl: "/downloads/elementor-pro.zip",
    shortDesc: "THE #1 NO CODE DRAG & DROP WORDPRESS WEBSITE BUILDER POWERING OVER 18M WEBSITES WORLDWIDE, NOW WITH AI.",
    price: 0.1,
    originalPrice: 4.99,
    detailPath: "/product",
    checkoutPath: "/checkout",
    imageType: "gradient",
    gradientFrom: "#6366f1",
    gradientTo: "#8b5cf6",
    promoPrice: 0.1,
    promoEndDate: "05/15",
  },
  {
    id: "elementor-connector",
    name: "Elementor Connector",
    downloadUrl: "/downloads/elementor-connector.zip",
    shortDesc: "Elementor Connector is a lightweight add-on that bridges your WordPress site with Elementor to streamline your workflow and enhance design capabilities.",
    price: 4.99,
    detailPath: "/product",
    checkoutPath: "/checkout",
    imageType: "gradient",
    gradientFrom: "#7c3aed",
    gradientTo: "#0ea5e9",
  },
];
