document.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector(".intro-screen");
  const enterButton = document.querySelector(".intro-enter");
  const motionOkay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dismissIntro = () => {
    if (!intro || intro.classList.contains("is-gone")) return;
    intro.classList.add("is-gone");
    window.setTimeout(() => intro.setAttribute("aria-hidden", "true"), 850);
    try {
      sessionStorage.setItem("rutherford-intro-seen", "true");
    } catch (error) {
      // The welcome screen still works when storage is disabled.
    }
  };

  let hasSeenIntro = false;
  try {
    hasSeenIntro = sessionStorage.getItem("rutherford-intro-seen") === "true";
  } catch (error) {
    hasSeenIntro = false;
  }

  if (hasSeenIntro) {
    intro?.classList.add("is-gone");
    intro?.setAttribute("aria-hidden", "true");
  } else {
    enterButton?.addEventListener("click", dismissIntro);
    window.setTimeout(dismissIntro, motionOkay ? 6500 : 1500);
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -35px 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.setProperty("--delay", `${index * 100}ms`);
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const progress = document.querySelector(".scroll-progress");
  let framePending = false;
  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${Math.min(percent, 100)}%`;
    framePending = false;
  };

  window.addEventListener("scroll", () => {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateScrollProgress);
    }
  }, { passive: true });
  updateScrollProgress();

  if (motionOkay && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const art = document.querySelector(".hero-art");
    art?.addEventListener("pointermove", (event) => {
      const bounds = art.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      const logo = art.querySelector(".hero-logo");
      if (logo) logo.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
    });
    art?.addEventListener("pointerleave", () => {
      const logo = art.querySelector(".hero-logo");
      if (logo) logo.style.transform = "";
    });
  }
});
