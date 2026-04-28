document.documentElement.classList.add("js");

const sections = document.querySelectorAll(".content-section");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const updateScrollProgress = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  document.documentElement.style.setProperty(
    "--scroll-progress",
    Math.min(Math.max(progress, 0), 1).toString(),
  );
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

if (prefersReducedMotion) {
  sections.forEach((section) => {
    section.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  sections.forEach((section) => {
    revealObserver.observe(section);
  });
}

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-active", entry.isIntersecting);
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => {
  activeObserver.observe(section);
});
