document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));

  const hero = document.querySelector(".hero");
  if (hero) {
    let offset = 0;
    const animate = () => {
      offset += 0.4;
      hero.style.backgroundPosition = `${offset}px 0px`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
});
