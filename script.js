// Add reveal-on-scroll animations while keeping the page visible without JavaScript.
document.documentElement.classList.add("js-enabled");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animatedElements = document.querySelectorAll(
  ".hero-content, main > .section, .card, .tips-list li"
);

if (!reduceMotion && "IntersectionObserver" in window) {
  animatedElements.forEach((element, index) => {
    element.classList.add("reveal");

    if (element.matches(".card, .tips-list li")) {
      element.style.setProperty("--reveal-delay", `${(index % 5) * 70}ms`);
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
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
} else {
  // Older browsers and reduced-motion users get the complete, non-animated page.
  animatedElements.forEach((element) => element.classList.add("is-visible"));
}
