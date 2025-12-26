import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useLandingContext } from "../../context/LandingContext";
import { useThemeContext } from "../../context/ThemeContext";
import { VendooInput, VendooTextarea } from "../../widgets/VendooInput";
import VendooLabel from "../../widgets/VendooLabel";
import VendooButton from "../../widgets/VendooButton";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  AccentColorDark,
  AccentColorWhite,
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  BorderColorDark,
  BorderColorWhite,
} from "../../utils/constants/colors";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const publicContext = useLandingContext();
  const currentTheme = useThemeContext();

  useEffect(() => {
    publicContext.setSelectedLandingNavLink("Contact");
  }, [publicContext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: [0.22, 1, 0.36, 1],
  //     },
  //   },
  // };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@vendoo.com",
      href: "mailto:support@vendoo.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+961 71330986",
      href: "tel:+96171330986",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Baabda, Mont-Liban, LB",
      href: "#",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: currentTheme.isDark
          ? SecondaryColorDark
          : SecondaryColorWhite,
      }}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
                borderColor: currentTheme.isDark
                  ? AccentColorDark
                  : AccentColorWhite,
              }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6"
            >
              Contact Us
            </span>
          </motion.div>

          <h2
            style={{
              color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Get in Touch
          </h2>

          <p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Have a question or need help? Our team is here to assist you with
            anything related to your Vendoo experience.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                backgroundColor: currentTheme.isDark
                  ? PrimaryColorDark
                  : PrimaryColorWhite,
                borderColor: currentTheme.isDark
                  ? BorderColorDark
                  : BorderColorWhite,
              }}
              className="rounded-3xl shadow-2xl p-8 md:p-10 border-2 relative overflow-hidden"
            >
              {/* Decorative element */}
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-5 rounded-bl-full"
                style={{
                  background: `radial-gradient(circle at top right, ${
                    currentTheme.isDark ? AccentColorDark : AccentColorWhite
                  }, transparent)`,
                }}
              />

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle
                      size={64}
                      style={{
                        color: currentTheme.isDark
                          ? AccentColorDark
                          : AccentColorWhite,
                      }}
                    />
                  </motion.div>
                  <h3
                    style={{
                      color: currentTheme.isDark
                        ? TextColorDark
                        : TextColorWhite,
                    }}
                    className="text-2xl font-bold mt-6 mb-2"
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      color: currentTheme.isDark
                        ? MutedTextColorDark
                        : MutedTextColorWhite,
                    }}
                    className="text-center"
                  >
                    We'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <motion.div>
                    <VendooLabel text="Full Name" htmlFor="name" />
                    <VendooInput
                      id="name"
                      value={name}
                      name="contact-name"
                      type="text"
                      placeholder="John Doe"
                      onChange={(e: any) => setName(e.target.value)}
                      isFullWidth
                    />
                  </motion.div>

                  <motion.div>
                    <VendooLabel text="Email Address" htmlFor="email" />
                    <VendooInput
                      id="email"
                      value={email}
                      name="contact-email"
                      type="email"
                      onChange={(e: any) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      isFullWidth
                    />
                  </motion.div>

                  <motion.div>
                    <VendooLabel text="Your Message" htmlFor="message" />
                    <VendooTextarea
                      id="message"
                      value={message}
                      name="message"
                      placeholder="Tell us how we can help you..."
                      onChange={(e: any) => setMessage(e.target.value)}
                      isFullWidth
                      rows={6}
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VendooButton
                      className="w-full flex items-center justify-center gap-2"
                      children={
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send size={18} />
                        </span>
                      }
                      type="submit"
                    />
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                // variants={itemVariants}
                style={{
                  backgroundColor: currentTheme.isDark
                    ? PrimaryColorDark
                    : PrimaryColorWhite,
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                }}
                className="block p-6 rounded-2xl border-2 transition-all duration-300 group"
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    style={{
                      backgroundColor: currentTheme.isDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.03)",
                    }}
                    className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  >
                    <method.icon
                      size={24}
                      style={{
                        color: currentTheme.isDark
                          ? AccentColorDark
                          : AccentColorWhite,
                      }}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3
                      style={{
                        color: currentTheme.isDark
                          ? TextColorDark
                          : TextColorWhite,
                      }}
                      className="font-semibold text-lg mb-1"
                    >
                      {method.title}
                    </h3>
                    <p
                      style={{
                        color: currentTheme.isDark
                          ? MutedTextColorDark
                          : MutedTextColorWhite,
                      }}
                      className="text-sm"
                    >
                      {method.detail}
                    </p>
                  </div>
                </div>

                {/* Hover indicator */}
                <motion.div
                  className="mt-4 h-1 rounded-full origin-left"
                  style={{
                    backgroundColor: currentTheme.isDark
                      ? AccentColorDark
                      : AccentColorWhite,
                    scaleX: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
                />
              </motion.a>
            ))}

            {/* Additional Info Card */}
            <motion.div
              // variants={itemVariants}
              style={{
                backgroundColor: currentTheme.isDark
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(0, 0, 0, 0.02)",
                borderColor: currentTheme.isDark
                  ? BorderColorDark
                  : BorderColorWhite,
              }}
              className="p-6 rounded-2xl border-2"
            >
              <h3
                style={{
                  color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                }}
                className="font-semibold text-lg mb-3"
              >
                Response Time
              </h3>
              <p
                style={{
                  color: currentTheme.isDark
                    ? MutedTextColorDark
                    : MutedTextColorWhite,
                }}
                className="text-sm leading-relaxed"
              >
                We typically respond within{" "}
                <span className="font-semibold">24 hours</span> on business
                days. For urgent matters, please call us directly.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-sm mb-4"
          >
            Looking for immediate assistance?
          </p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <a
              href="#"
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Visit our Help Center →
            </a>
            <span
              style={{
                color: currentTheme.isDark ? BorderColorDark : BorderColorWhite,
              }}
            >
              |
            </span>
            <a
              href="#"
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Check FAQs →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
