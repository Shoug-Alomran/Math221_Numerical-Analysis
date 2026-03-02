(function () {
  const EMAIL = "inquiry@shoug-tech.com";
  const MAIN_WEBSITE = "https://shoug-tech.com/";
  const COPYRIGHT_TEXT = "© 2026 Shoug Fawaz Alomran · All rights reserved";
  const NAV_KEY = "math221_nav_collapsed";
  const TOC_KEY = "math221_toc_collapsed";

  function stripTrailingSlash(pathname) {
    if (!pathname) return "";
    return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }

  function getBase() {
    try {
      if (typeof __md_get === "function") {
        const base = __md_get("__base") || "";
        return stripTrailingSlash(base);
      }
    } catch (_) {}

    const logo = document.querySelector("a.md-header__button.md-logo, a.md-header__button[href]");
    if (logo) {
      try {
        const u = new URL(logo.getAttribute("href") || "", window.location.href);
        return stripTrailingSlash(u.pathname);
      } catch (_) {}
    }

    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length ? `/${parts[0]}` : "";
  }

  function toUrl(path) {
    const base = getBase();
    const clean = String(path || "").replace(/^\/+/, "");
    return `${base ? `${base}/` : "/"}${clean}`;
  }

  function getStoredFlag(key) {
    try {
      return window.localStorage.getItem(key) === "1";
    } catch (_) {
      return false;
    }
  }

  function setStoredFlag(key, value) {
    try {
      window.localStorage.setItem(key, value ? "1" : "0");
    } catch (_) {}
  }

  function setToggleState(bodyClass, isCollapsed, button, expandedLabel, collapsedLabel) {
    document.body.classList.toggle(bodyClass, isCollapsed);
    if (!button) return;
    button.classList.toggle("is-active", isCollapsed);
    button.setAttribute("aria-pressed", isCollapsed ? "true" : "false");
    button.textContent = isCollapsed ? collapsedLabel : expandedLabel;
  }

  function addLayoutToggles() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;

    let navToggle = headerInner.querySelector("#layoutToggleNav");
    let tocToggle = headerInner.querySelector("#layoutToggleToc");

    if (!navToggle) {
      navToggle = document.createElement("button");
      navToggle.type = "button";
      navToggle.id = "layoutToggleNav";
      navToggle.className = "layout-toggle";
      navToggle.setAttribute("aria-label", "Toggle left navigation sidebar");
      headerInner.appendChild(navToggle);
    }

    if (!tocToggle) {
      tocToggle = document.createElement("button");
      tocToggle.type = "button";
      tocToggle.id = "layoutToggleToc";
      tocToggle.className = "layout-toggle";
      tocToggle.setAttribute("aria-label", "Toggle right table of contents sidebar");
      headerInner.appendChild(tocToggle);
    }

    let navCollapsed = getStoredFlag(NAV_KEY);
    let tocCollapsed = getStoredFlag(TOC_KEY);

    setToggleState("nav-collapsed", navCollapsed, navToggle, "Hide Left Nav", "Show Left Nav");
    setToggleState("toc-collapsed", tocCollapsed, tocToggle, "Hide TOC", "Show TOC");

    navToggle.onclick = function () {
      navCollapsed = !document.body.classList.contains("nav-collapsed");
      setStoredFlag(NAV_KEY, navCollapsed);
      setToggleState("nav-collapsed", navCollapsed, navToggle, "Hide Left Nav", "Show Left Nav");
    };

    tocToggle.onclick = function () {
      tocCollapsed = !document.body.classList.contains("toc-collapsed");
      setStoredFlag(TOC_KEY, tocCollapsed);
      setToggleState("toc-collapsed", tocCollapsed, tocToggle, "Hide TOC", "Show TOC");
    };
  }

  function addHeaderCTA() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner || headerInner.querySelector("a.header-cta")) return;

    const cta = document.createElement("a");
    cta.className = "header-cta";
    cta.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Math 221 Project Inquiry")}`;
    cta.textContent = "Contact";
    cta.setAttribute("aria-label", "Contact project owner");
    headerInner.appendChild(cta);
  }

  function addFooterBlock() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;

    footer.querySelectorAll(".custom-footer").forEach((node) => node.remove());

    const meta = footer.querySelector(".md-footer-meta");
    const block = document.createElement("section");
    block.className = "custom-footer";

    block.innerHTML = `
      <div class="custom-footer__inner">
        <div class="custom-footer__left">
          <div class="custom-footer__brand">Math 221</div>
          <div class="custom-footer__title">Numerical Analysis Project</div>
          <div class="custom-footer__subtitle">Analytical methods for root-finding, convergence behavior, and numerical stability.</div>

          <div class="custom-footer__equations">
            <span class="eq-chip">x_(n+1)=x_n-f(x_n)/f'(x_n)</span>
            <span class="eq-chip">x_(n+1)=(a+b)/2</span>
            <span class="eq-chip">error &lt; 10^-6</span>
          </div>

          <label class="custom-footer__label" for="footerEmail">Get project updates</label>
          <div class="custom-footer__form">
            <input class="custom-footer__input" id="footerEmail" type="email" placeholder="Email address" autocomplete="email" inputmode="email" />
            <button class="custom-footer__button" type="button" id="footerSubscribeBtn">Subscribe</button>
          </div>
          <div class="custom-footer__note">By entering your email, you agree to be contacted about this course project.</div>
        </div>

        <div class="custom-footer__right">
          <div class="footer-col">
            <div class="footer-col__title">Explore</div>
            <a class="footer-link" href="${toUrl("")}">Home</a>
            <a class="footer-link" href="${toUrl("abstract/")}">Abstract</a>
            <a class="footer-link" href="${toUrl("introduction/")}">Introduction</a>
            <a class="footer-link" href="${toUrl("methods/")}">Methods</a>
            <a class="footer-link" href="${toUrl("results/")}">Results</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Project</div>
            <a class="footer-link" href="${toUrl("comparison/")}">Comparison</a>
            <a class="footer-link" href="${toUrl("applications/")}">Applications</a>
            <a class="footer-link" href="${toUrl("conclusion/")}">Conclusion</a>
            <a class="footer-link" href="${toUrl("references/")}">References</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Policies</div>
            <a class="footer-link" href="${toUrl("privacy-notice/")}">Privacy Notice</a>
            <a class="footer-link" href="${toUrl("academic-disclaimer/")}">Academic Disclaimer</a>
            <a class="footer-link" href="${toUrl("copyright/")}">Copyright</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Resources</div>
            <a class="footer-link" href="${toUrl("report/")}">Report page</a>
            <a class="footer-link" href="${toUrl("report/PDF-Report.pdf")}">PDF report</a>
            <a class="footer-link" href="${MAIN_WEBSITE}" target="_blank" rel="noopener">shoug-tech.com</a>
            <a class="footer-link" href="mailto:${EMAIL}">${EMAIL}</a>
          </div>
        </div>
      </div>
    `;

    if (meta) footer.insertBefore(block, meta);
    else footer.prepend(block);

    const btn = footer.querySelector("#footerSubscribeBtn");
    const input = footer.querySelector("#footerEmail");

    function subscribe() {
      const value = (input?.value || "").trim();
      const subject = "Math 221 Project Updates - Subscribe";
      const body = [
        "Hello,",
        "",
        "Please add me to updates for the Math 221 Numerical Analysis project.",
        value ? `Email: ${value}` : "",
        "",
        "Thank you."
      ]
        .filter(Boolean)
        .join("\n");

      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    if (btn) btn.addEventListener("click", subscribe);
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          subscribe();
        }
      });
    }
  }

  function replaceBuiltWithText() {
    const footerMeta = document.querySelector(".md-footer-meta");
    if (!footerMeta) return;

    const copyright = footerMeta.querySelector(".md-copyright");
    if (!copyright) return;
    copyright.innerHTML = "";

    const legal = document.createElement("div");
    legal.className = "custom-copyright";
    legal.textContent = COPYRIGHT_TEXT;
    copyright.appendChild(legal);

    const custom = document.createElement("div");
    custom.className = "custom-built-with";
    custom.style.marginTop = "0.2rem";
    custom.textContent = "Made by Blueprint by ShougTech";
    copyright.appendChild(custom);
  }

  function run() {
    addLayoutToggles();
    addHeaderCTA();
    addFooterBlock();
    replaceBuiltWithText();
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
