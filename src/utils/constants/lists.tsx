// Service landing list
import {
  BarChart3,
  Bell,
  CreditCard,
  Database,
  Globe,
  Heart,
  Layers,
  LayoutDashboard,
  LineChart,
  MapPin,
  MessageSquare,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import type { Testimonial } from "../../models/Testimonial";

import type { Pricing } from "../../models/Pricing";
import type Feature from "../../models/Feature";

// Nav LINKS
export const navLinks = ["Home", "Features", "Pricing", "About", "Contact"];

// Features List
export const featuresList: Feature[] = [
  {
    FeatureIcon: ShoppingBag,
    title: "Buy & Sell Platform",
    desc: "A modern marketplace where users can easily list, browse, and purchase products in seconds.",
  },
  {
    FeatureIcon: Smartphone,
    title: "Mobile-First Experience",
    desc: "Built with a mobile-first approach using Flutter for smooth and responsive app performance.",
  },
  {
    FeatureIcon: Globe,
    title: "Web Access",
    desc: "Access the platform from any browser with a responsive and fast web version powered by React.",
  },
  {
    FeatureIcon: Search,
    title: "Smart Product Search",
    desc: "Find items quickly using advanced filters, keyword matching, and intelligent search ranking.",
  },
  {
    FeatureIcon: Heart,
    title: "Favorites & Wishlists",
    desc: "Save products you love for later with a personalized wishlist synced across devices.",
  },
  {
    FeatureIcon: UserCheck,
    title: "User Authentication",
    desc: "Secure registration and login with JWT, email verification, and social sign-in options.",
  },
  {
    FeatureIcon: MapPin,
    title: "Location-Based Listings",
    desc: "Discover items near you with accurate geolocation and area-based recommendations.",
  },
  {
    FeatureIcon: MessageSquare,
    title: "In-App Chat",
    desc: "Buyers and sellers can communicate instantly inside the app for smooth transactions.",
  },
  {
    FeatureIcon: CreditCard,
    title: "Secure Payments",
    desc: "Integrated payment gateways for safe and fast transactions between users.",
  },
  {
    FeatureIcon: ShieldCheck,
    title: "Verified Sellers",
    desc: "Build trust in the marketplace with identity checks and verified seller badges.",
  },
  {
    FeatureIcon: Bell,
    title: "Push Notifications",
    desc: "Stay updated with instant alerts for new offers, messages, and price changes.",
  },
  {
    FeatureIcon: Database,
    title: "Robust Backend",
    desc: "Powered by optimized SQL databases for reliable, scalable, and secure data handling.",
  },
  {
    FeatureIcon: Truck,
    title: "Delivery Management",
    desc: "Track orders and deliveries with real-time updates for both buyers and sellers.",
  },
  {
    FeatureIcon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Monitor user growth, sales trends, and engagement with real-time business insights.",
  },
  {
    FeatureIcon: Settings,
    title: "Admin Control Panel",
    desc: "Manage users, listings, and reports through a powerful and easy-to-use admin dashboard.",
  },
];

// Pricing List
export const pricingList: Pricing[] = [
  {
    name: "Starter",
    price: "Free",
    desc: "Perfect for new users testing Vendoo.",
    features: [
      "List up to 5 items per month",
      "Basic seller dashboard",
      "Limited analytics",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    desc: "Best for active sellers growing their shop.",
    features: [
      "Unlimited listings",
      "Advanced analytics",
      "Priority support",
      "Access to seller tools",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$19.99/mo",
    desc: "For small stores or power sellers.",
    features: [
      "Everything in Pro",
      "Multi-store management",
      "Team collaboration",
      "API access",
    ],
    highlighted: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "OMG 3anjad Vendoo 8ayyarle sh8le 180°. El inventory management la 7ala ossa, rayya7tne to the max! 💯",
    name: "Sarah K.",
    title: "Vintage Shop Owner",
    stars: 5,
  },
  {
    id: "2",
    quote:
      "Tbh kent ktir khayef en2ol sh8le online, bas Vendoo sahhala 3layye level 999. Ma bya3ate double b 3 months. Literally.",
    name: "Mark A.",
    title: "Handmade Crafts Seller",
    stars: 5,
  },
  {
    id: "3",
    quote:
      "El Analytics hene el game changer. A5iran sert efham el customers shu baddon w jib bde3a 3al asas. No cap.",
    name: "Elena R.",
    title: "Boutique Owner",
    stars: 5,
  },
  {
    id: "4",
    quote:
      "Bro sh8lkon fire 🔥. El support team de8re btrodd, w kel shi wade7 w sahel, ma btdi3. Keep it up!",
    name: "Georges N.",
    title: "Electronics Shop Owner",
    stars: 5,
  },
  {
    id: "5",
    quote:
      "Serle shahrayn bas fat7a el store, wel orders ma 3am twa2ef! El platform ktir sari3a w ma bta3le2. Big W.",
    name: "Nour F.",
    title: "Fashion Designer",
    stars: 5,
  },
  {
    id: "5",
    quote:
      "A7la shi enno all-in-one. El fawater, el orders, el customers... Ma 3edt b7aje la 10 apps tenye. Sh8l ndif. GG.",
    name: "Karim H.",
    title: "Supplements Seller",
    stars: 5,
  },
];
export const howItWorksSteps = [
  {
    FeatureIcon: Store, // Changed from FaStore
    title: "Set Up Your Store",
    description:
      "Create your beautiful, custom storefront in just a few clicks.",
  },
  {
    FeatureIcon: ShoppingCart, // Changed from FaShoppingCart
    title: "Add Your Products",
    description:
      "Upload product images and descriptions with our easy-to-use editor.",
  },
  {
    FeatureIcon: LineChart, // Changed from FaChartLine
    title: "Start Selling",
    description: "Go live and watch the sales (and data) roll in.",
  },
];

export const privacyList = [
  {
    title: "1. Information We Collect",
    description:
      "  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This may include your name, email, phone number, and payment details. We alsocollect usage data such as your device type, browser, and pagesvisited.",
  },
  {
    title: "2. How We Use Your Information",
    description: (
      <>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>To process orders and deliver your purchases</li>
          <li>To personalize your shopping experience</li>
          <li>
            To send updates, offers, and promotional materials (only if you opt
            in)
          </li>
          <li>To improve our website’s functionality and security</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Protect Your Data",
    description: `"We use secure servers, encryption, and access controls to protect your
          data from unauthorized access, alteration, or disclosure. However, no
          online system is completely secure, and we cannot guarantee absolute
          protection."`,
  },
  {
    title: "4. Sharing of Information",
    description: ` We do not sell or rent your personal information. We may share data
          with trusted third-party service providers that help us operate the
          platform (e.g., payment processors or delivery partners) — but only
          for legitimate business purposes.
      `,
  },
  {
    title: " 5. Your Rights & Choices",
    description: (
      <>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Access, correct, or delete your personal data</li>
          <li>Opt out of promotional emails at any time</li>
          <li>Request details about how your data is used</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Cookies & Tracking",
    description: ` We use cookies and similar technologies to enhance your browsing
          experience, analyze traffic, and improve performance. You can manage
          or disable cookies through your browser settings.`,
  },
  {
    title: "7. Changes to This Policy",
    description: ` We may update this Privacy Policy occasionally. The latest version
          will always be available on this page, and any significant changes
          will be communicated to you directly or via email.`,
  },
  {
    title: "8. Contact Us",
    description: (
      <>
        For questions or requests related to your data, please contact us at{" "}
        <span className="text-primary font-medium">privacy@vendoo.com</span>.
      </>
    ),
  },
];

export const termsConditionsList = [
  {
    title: "1. Acceptance of Terms",
    description: ` By accessing or using Vendoo, you agree to be bound by these Terms
              of Service and our Privacy Policy. If you do not agree, please
              discontinue using our platform.`,
  },
  {
    title: "2. Account Registration",
    description: `You may need to create an account to access certain features. You
              are responsible for keeping your login information secure and for
              all activities that occur under your account.`,
  },
  {
    title: "3. Prohibited Activities",
    description: (
      <>
        <ul className="list-disc pl-6 space-y-1">
          <li>Posting or selling illegal or counterfeit items</li>
          <li>Engaging in fraudulent or deceptive activity</li>
          <li>Interfering with the functionality or security of the website</li>
          <li>Violating any applicable laws or third-party rights</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Payments & Fees",
    description: `Certain services on Vendoo may involve payments. By purchasing or
              subscribing, you agree to provide accurate billing information and
              authorize Vendoo to charge applicable fees.`,
  },
  {
    title: "5. Limitation of Liability",
    description: `Vendoo is not liable for any damages arising from your use or
              inability to use the platform, including loss of data, profits, or
              business opportunities.`,
  },
  {
    title: "6. Termination",
    description: `We may suspend or terminate your account at any time if we believe
              you have violated these Terms or engaged in harmful activities.`,
  },
  {
    title: "7. Changes to These Terms",
    description: `Vendoo may update these Terms from time to time. Continued use of
              our services after changes means you accept the new Terms.`,
  },
  {
    title: "8. Contact Us",
    description: (
      <>
        If you have any questions about these Terms, please contact us at{" "}
        <span className="text-primary font-medium">support@vendoo.com</span>
      </>
    ),
  },
];

export const dashboardNavList = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: ShoppingCart, label: "Orders", id: "orders", badge: "12" },
  { icon: Package, label: "Products", id: "products" },
  { icon: Layers, label: "Categories", id: "categories" },
  { icon: Users, label: "Customers", id: "customers" },
  // { icon: TrendingUp, label: "Analytics", id: "analytics" },
];
