import { useEffect, useRef, useState } from "react";

/**
 * Core feature: a fixed fullscreen background video whose currentTime is
 * scrubbed by the page scroll position. The 10s clip is mapped linearly to
 * the full scroll range (the four 100vh sections each cover a 2.5s slice).
 *
 * Degrades gracefully: if Dasani.mp4 is missing or fails to decode, an
 * animated gradient stands in so the page remains usable.
 */
export default function VideoScroll() {
  const videoRef = useRef(null);
  const rafRef = useRef(0);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const scrub = () => {
      rafRef.current = 0;
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, progress));

      try {
        video.currentTime = clamped * duration;
      } catch {
        setFallback(true);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(scrub);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {!fallback && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={`${import.meta.env.BASE_URL}videos/Dasani.mp4`}
          muted
          playsInline
          preload="auto"
          onError={() => setFallback(true)}
        />
      )}

      {fallback && (
        <div
          className="h-full w-full animate-pulse"
          style={{
            background:
              "linear-gradient(160deg, var(--color-dark) 0%, var(--color-primary) 55%, var(--color-accent) 100%)",
          }}
        />
      )}

      {/* Readability scrim over whichever background is showing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,22,40,0.45) 0%, rgba(10,22,40,0.25) 50%, rgba(10,22,40,0.65) 100%)",
        }}
      />
    </div>
  );
}
