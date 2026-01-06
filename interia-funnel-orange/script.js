(() => {
  const $ = (sel, root=document) => root.querySelector(sel);

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const burger = $(".hamburger");
  const mobileMenu = $("#mobileMenu");
  if (burger && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.hidden = true;
      burger.setAttribute("aria-expanded", "false");
    };
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.hidden = isOpen;
    });
    mobileMenu.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.matches("a")) closeMenu();
    });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  const counter = document.querySelector("[data-count]");
  if (counter && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const target = Number(counter.getAttribute("data-count")) || 0;
    const duration = 650;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      counter.textContent = String(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
      else counter.textContent = String(target);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) { requestAnimationFrame(tick); io.disconnect(); }
    }, { threshold: 0.5 });

    io.observe(counter);
  }

  const form = $("#leadForm");
  const toast = $("#toast");
  if (form && toast) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const need = String(data.get("need") || "").trim();

      if (!name || !email || !need) {
        toast.textContent = "Quick one — fill in name, email, and what you need most.";
        toast.hidden = false;
        return;
      }
      toast.textContent = "✅ Sent! Next step: add your calendar link (Calendly) or CRM form action.";
      toast.hidden = false;
      form.reset();
      setTimeout(() => { toast.hidden = true; }, 5200);
    });
  }
})();