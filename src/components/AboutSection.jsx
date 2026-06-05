import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center px-6"
      style={{ fontFamily: t.font }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl text-center"
      >
        <h2
          className="mb-6 text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        >
          {t.about.heading}
        </h2>
        <p className="text-lg leading-relaxed opacity-90 sm:text-xl">
          {t.about.body}
        </p>
      </motion.div>
    </section>
  );
}
