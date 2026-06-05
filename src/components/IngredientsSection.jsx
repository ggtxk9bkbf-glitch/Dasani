import { useLanguage } from "../context/LanguageContext.jsx";
import ScrollWords from "./ScrollWords.jsx";

export default function IngredientsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="ingredients"
      data-section-index="3"
      className="flex min-h-screen items-center justify-center px-6 py-20"
      style={{ fontFamily: t.font }}
    >
      <div className="w-full max-w-4xl text-center">
        <ScrollWords
          text={t.ingredients.heading}
          className="mb-14 block text-3xl font-extrabold sm:text-5xl"
          style={{ color: "var(--color-light)" }}
        />

        <div className="flex flex-wrap justify-center gap-5">
          {t.ingredients.minerals.map((mineral) => (
            <div
              key={mineral.name}
              className="flex w-36 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <ScrollWords
                text={mineral.value}
                className="block text-3xl font-extrabold"
                style={{ color: "var(--color-accent)" }}
              />
              <ScrollWords
                text={t.ingredients.unit}
                className="block text-xs font-semibold opacity-70"
              />
              <ScrollWords
                text={mineral.name}
                className="mt-1 block text-base font-bold"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
