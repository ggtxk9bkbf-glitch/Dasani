import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

const BOTTLE_IMAGES = [
  "images/bottle-330.png",
  "images/bottle-600.png",
  "images/bottle-8l.png",
  "images/bottle-5gal.png",
];

function BottleFallback({ large }) {
  const h = large ? "300px" : "150px";
  return (
    <svg
      viewBox="0 0 60 140"
      style={{ height: h, width: "auto" }}
      role="img"
      aria-label="Dasani bottle placeholder"
    >
      <path
        d="M24 6h12v8c0 3 6 6 6 14v90a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V28c0-8 6-11 6-14V6Z"
        fill="var(--color-light)"
        opacity="0.25"
        stroke="var(--color-light)"
        strokeWidth="2"
      />
      <rect
        x="18"
        y="60"
        width="24"
        height="22"
        fill="var(--color-accent)"
        opacity="0.55"
      />
    </svg>
  );
}

function ProductModal({ product, font, onClose }) {
  const [failed, setFailed] = useState(false);
  const { name, size, description, image } = product;

  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} ${size}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        fontFamily: font,
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          textAlign: "center",
          color: "var(--color-white)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "1.5rem",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "var(--color-white)",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
            transition: "background 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
        >
          ✕
        </button>

        {failed ? (
          <BottleFallback large />
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}${image}`}
            alt={`${name} ${size}`}
            onError={() => setFailed(true)}
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        )}

        <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-light)" }}>
          {name} <span style={{ color: "var(--color-white)" }}>{size}</span>
        </h3>
        <p style={{ fontSize: "1rem", opacity: 0.85, lineHeight: 1.6 }}>{description}</p>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ size, image, onClick }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
      style={{ minWidth: "160px", cursor: "pointer" }}
    >
      {failed ? (
        <BottleFallback />
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${image}`}
          alt={`Dasani ${size}`}
          onError={() => setFailed(true)}
          style={{ height: "150px", objectFit: "contain", pointerEvents: "none" }}
        />
      )}
      <ScrollWords
        text={size}
        className="block font-bold"
        style={{ fontSize: "1.2rem" }}
      />
    </button>
  );
}

export default function ProductsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null); // index of open product, or null

  return (
    <section
      id="products"
      data-section-index="2"
      className="flex min-h-screen flex-col items-center justify-center px-6 pt-[5vh] pb-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-5xl text-center">
        <ScrollWords
          text={t.products.heading}
          className="mb-14 block font-extrabold"
          style={{
            color: "var(--color-light)",
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        />

        <div className="flex flex-wrap justify-center" style={{ gap: "2rem" }}>
          {t.products.sizes.map((size, i) => (
            <ProductCard
              key={size}
              size={size}
              image={BOTTLE_IMAGES[i]}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <ProductModal
            product={{
              name: t.products.name,
              size: t.products.sizes[active],
              description: t.products.descriptions[active],
              image: BOTTLE_IMAGES[active],
            }}
            font={t.font}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
