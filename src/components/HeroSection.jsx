import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-6 text-center"
      style={{ fontFamily: t.font }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        style={{
          textShadow: "0 2px 30px rgba(10,22,40,0.5)",
        }}
      >
        {t.hero.title}
      </motion.h1>
    </section>
  );
}
