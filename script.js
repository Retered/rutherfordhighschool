document.documentElement.classList.add("js-enabled");

const hero = document.querySelector(".hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && !reduceMotion) {
  const orbCount = 5;
  for (let i = 0; i < orbCount; i += 1) {
    const orb = document.createElement("span");
    orb.className = "orb";
    const size = 120 + i * 35;
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${8 + i * 18}%`;
    orb.style.top = `${10 + (i % 3) * 24}%`;
    orb.style.opacity = `${0.18 + i * 0.08}`;
    orb.style.animationDelay = `${i * 0.6}s`;
    hero.appendChild(orb);
  }
}

const animatedElements = document.querySelectorAll(
  ".hero-content, main > .section, .card, .tips-list li"
);

if (!reduceMotion && "IntersectionObserver" in window) {
  animatedElements.forEach((element, index) => {
    element.classList.add("reveal");
    if (element.matches(".card, .tips-list li")) {
      element.style.setProperty("--reveal-delay", `${index * 80}ms`);
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
    { threshold: 0.14, rootMargin: "0px 0px -25px 0px" }
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("is-visible"));
}
