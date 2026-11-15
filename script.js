document.documentElement.classList.add("js-enabled");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = document.querySelector(".hero");

if (hero && !reduceMotion) {
  for (let i = 0; i < 6; i += 1) {
    const orb = document.createElement("span");
    const size = 115 + i * 32;
    orb.className = "orb";
    orb.setAttribute("aria-hidden", "true");
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${5 + i * 17}%`;
    orb.style.top = `${12 + (i % 3) * 26}%`;
    orb.style.opacity = `${0.12 + i * 0.035}`;
    orb.style.animationDelay = `${i * -1.1}s`;
    hero.appendChild(orb);
  }
}

const animatedElements = document.querySelectorAll(
  ".hero-content, main > section, .story-copy, .story-panel, .article-block > p, .card, .tips-list li"
);

if (!reduceMotion && "IntersectionObserver" in window) {
  animatedElements.forEach((element, index) => {
    element.classList.add("reveal");
    if (element.matches(".card, .tips-list li, .article-block > p")) {
      element.style.setProperty("--reveal-delay", `${(index % 5) * 90}ms`);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("is-visible"));
}

const intro = document.querySelector(".intro-overlay");
if (intro && reduceMotion) intro.remove();
