import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      data-section-index="1"
      className="flex min-h-screen items-center justify-center px-6"
      style={{ fontFamily: t.font }}
    >
      <div className="max-w-2xl text-center">
        <ScrollWords
          text={t.about.heading}
          className="mb-6 block text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        />
        <ScrollWords
          text={t.about.body}
          className="block text-lg leading-relaxed opacity-90 sm:text-xl"
        />
      </div>
    </section>
  );
}
