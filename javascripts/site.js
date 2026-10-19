/* Math 221 · Numerical Analysis — interaction layer.
   Global handlers are bound once; page-level effects re-run on every
   Material instant-navigation swap via `document$`. */
(function () {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  root.classList.add("sx-js");

  /* ---------- once: scroll progress + header state ---------------------- */

  function bindScroll() {
    let ticking = false;

    function update() {
      ticking = false;
      const header = document.querySelector(".sx-header");
      const bar = document.querySelector(".sx-progress");
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar)
        bar.style.setProperty(
          "--p",
          max > 0 ? Math.min(y / max, 1).toFixed(4) : 0,
        );
      if (header) header.classList.toggle("is-scrolled", y > 8);
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    window.addEventListener("resize", update, { passive: true });
    update();
    return update;
  }

  /* ---------- once: ⌘K / Ctrl+K opens search ---------------------------- */

  function bindSearchHotkey() {
    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        const toggle = document.getElementById("__search");
        if (!(toggle instanceof HTMLInputElement)) return;
        event.preventDefault();
        toggle.checked = !toggle.checked;
        toggle.dispatchEvent(new Event("change"));
        if (toggle.checked) {
          const input = document.querySelector(".md-search__input");
          if (input instanceof HTMLInputElement)
            window.setTimeout(() => input.focus(), 30);
        }
      }
    });
  }

  /* ---------- once: lightbox -------------------------------------------- */

  let lightbox;

  function getLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement("div");
    lightbox.className = "sx-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.innerHTML =
      '<figure><img alt=""><figcaption></figcaption></figure>';
    lightbox.addEventListener("click", closeLightbox);
    document.body.appendChild(lightbox);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeLightbox();
    });
    return lightbox;
  }

  function openLightbox(src, caption) {
    const box = getLightbox();
    const img = box.querySelector("img");
    img.src = src;
    img.alt = caption || "";
    box.querySelector("figcaption").textContent = caption || "";
    box.classList.add("is-open");
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("is-open");
  }

  function bindLightbox() {
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const shot = target.closest(".sx-shot[data-full]");
      if (shot) {
        openLightbox(
          shot.getAttribute("data-full"),
          shot.getAttribute("data-caption"),
        );
        return;
      }

      const img = target.closest(".md-typeset img[data-zoomable]");
      if (img instanceof HTMLImageElement && !img.closest("a")) {
        openLightbox(img.currentSrc || img.src, img.alt);
      }
    });
  }

  /* ---------- once: cursor spotlight on cards --------------------------- */

  function bindSpotlight() {
    if (reduceMotion) return;
    document.addEventListener(
      "pointermove",
      function (event) {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const card = target.closest(
          ".sx-card, .md-typeset .grid.cards > ul > li",
        );
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
  }

  /* ---------- per page -------------------------------------------------- */

  let observer;

  function revealOnScroll() {
    if (observer) observer.disconnect();

    // Auto-reveal the main blocks of documentation pages.
    document
      .querySelectorAll(
        ".md-content .md-typeset > .grid, .md-content .md-typeset > .md-typeset__scrollwrap, .md-content .md-typeset > .callout-critical",
      )
      .forEach((el) => el.classList.add("sx-reveal"));

    document
      .querySelectorAll(".md-typeset .grid.cards > ul > li")
      .forEach((li, i) => {
        li.classList.add("sx-reveal");
        li.style.setProperty("--d", String(i % 4));
      });

    const targets = document.querySelectorAll(
      ".sx-reveal:not(.is-in), .sx-timeline, [data-count]",
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-in");
          if (el.hasAttribute("data-count")) countUp(el);
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
  }

  function countUp(el) {
    const end = Number(el.getAttribute("data-count"));
    if (!Number.isFinite(end)) return;
    const duration = 1400;
    const start = performance.now();
    el.textContent = "0";

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = String(Math.round(end * eased));
      if (t < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function cloneMarquees() {
    document.querySelectorAll(".sx-marquee").forEach((marquee) => {
      if (marquee.dataset.cloned) return;
      const track = marquee.querySelector(".sx-marquee__track");
      if (!track) return;
      const copy = track.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy
        .querySelectorAll("button")
        .forEach((btn) => btn.setAttribute("tabindex", "-1"));
      marquee.appendChild(copy);
      marquee.dataset.cloned = "1";
    });
  }

  function markZoomableImages() {
    document.querySelectorAll(".md-content .md-typeset img").forEach((img) => {
      if (!img.closest("a")) img.setAttribute("data-zoomable", "");
    });
  }

  // The header lives outside Material's swapped container, so keep its
  // active states in sync with the current URL ourselves.
  function syncHeaderNav() {
    const here = new URL(window.location.href);
    const path = here.pathname.replace(/index\.html$/, "");

    document.querySelectorAll(".sx-nav__item").forEach((item) => {
      let active = false;
      item.querySelectorAll(".sx-menu__link").forEach((link) => {
        const linkPath = new URL(link.href, here).pathname.replace(
          /index\.html$/,
          "",
        );
        const match = linkPath === path;
        link.classList.toggle("is-active", match);
        if (match) active = true;
      });
      item.classList.toggle("is-active", active);
    });

    // Close any dropdown left open by keyboard focus after navigation.
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && focused.closest(".sx-menu"))
      focused.blur();
  }

  let refreshScroll = function () {};

  function onPage() {
    syncHeaderNav();
    cloneMarquees();
    markZoomableImages();
    revealOnScroll();
    closeLightbox();
    refreshScroll();
  }

  refreshScroll = bindScroll();
  bindSearchHotkey();
  bindLightbox();
  bindSpotlight();

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(onPage);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onPage);
  } else {
    onPage();
  }
})();
