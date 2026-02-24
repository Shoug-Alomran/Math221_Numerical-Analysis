(function () {
  const EMAIL = "inquiry@shoug-tech.com";

  // Normalize: remove trailing slash except for "/"
  function stripTrailingSlash(p) {
    if (!p) return "";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  // Best-effort base path detection for GitHub Pages + MkDocs Material
  function getBase() {
    // 1) Try MkDocs Material helper if present
    try {
      if (typeof __md_get === "function") {
        const b = __md_get("__base") || "";
        return stripTrailingSlash(b);
      }
    } catch (e) {}

    // 2) Most reliable: use the header logo link (points to site root)
    const logo = document.querySelector('a.md-header__button.md-logo, a.md-header__button[href]');
    if (logo) {
      const href = logo.getAttribute("href");
      try {
        const u = new URL(href, window.location.href);
        return stripTrailingSlash(u.pathname);
      } catch (e) {}
    }

    // 3) Fallback: try to infer from pathname (repo root is first segment)
    // If you are on "/REPO/some/page/", base is "/REPO"
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length > 0) return "/" + parts[0];

    return "";
  }

  function url(path) {
    const base = getBase();
    const clean = String(path || "").replace(/^\/+/, ""); // no leading slash
    // base may be "" (root) or "/repo"
    return (base ? base + "/" : "/") + clean;
  }

  function addHeaderCTA() {
    const headerInner = document.querySelector(".md-header__inner");
    if (!headerInner) return;

    // Prevent duplicates
    if (headerInner.querySelector("a.header-cta")) return;

    const cta = document.createElement("a");
    cta.className = "header-cta";
    cta.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Math 221 Project Inquiry")}`;
    cta.textContent = "Contact Us";
    cta.setAttribute("aria-label", "Contact Us");

    headerInner.appendChild(cta);
  }

  function addFooterBlock() {
    const footer = document.querySelector(".md-footer");
    if (!footer) return;

    // Remove any existing custom footer (handles instant navigation + theme reload quirks)
    footer.querySelectorAll(".custom-footer").forEach((n) => n.remove());

    const meta = footer.querySelector(".md-footer-meta");

    const block = document.createElement("section");
    block.className = "custom-footer";

    block.innerHTML = `
      <div class="custom-footer__inner">
        <div class="custom-footer__left">
          <div class="custom-footer__brand">Math 221</div>
          <div class="custom-footer__title">Numerical Analysis Project</div>
          <div class="custom-footer__subtitle">
            Bisection • Newton–Raphson • Secant — methods, results, and applications.
          </div>

          <div class="custom-footer__signup">
            <label class="custom-footer__label" for="footerEmail">Get updates in your inbox</label>
            <div class="custom-footer__form">
              <input
                class="custom-footer__input"
                id="footerEmail"
                type="email"
                placeholder="Email address"
                autocomplete="email"
                inputmode="email"
              />
              <button class="custom-footer__button" type="button" id="footerSubscribeBtn">
                Subscribe
              </button>
            </div>
            <div class="custom-footer__note">
              By entering your email, you agree to be contacted regarding this course project.
            </div>
          </div>
        </div>

        <div class="custom-footer__right">
          <div class="footer-col">
            <div class="footer-col__title">Quick links</div>
            <a class="footer-link" href="${url("")}">Home</a>
            <a class="footer-link" href="${url("abstract/")}">Abstract</a>
            <a class="footer-link" href="${url("introduction/")}">Introduction</a>
            <a class="footer-link" href="${url("methods/")}">Methods</a>
            <a class="footer-link" href="${url("results/")}">Results</a>
            <a class="footer-link" href="${url("comparison/")}">Comparison of Methods</a>
            <a class="footer-link" href="${url("applications/")}">Applications</a>
            <a class="footer-link" href="${url("conclusion/")}">Conclusion</a>
            <a class="footer-link" href="${url("references/")}">References</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Policies</div>
            <a class="footer-link" href="${url("privacy-notice/")}">Privacy Notice</a>
            <a class="footer-link" href="${url("academic-disclaimer/")}">Academic Disclaimer</a>
            <a class="footer-link" href="${url("copyright/")}">Copyright</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Report</div>
            <a class="footer-link" href="${url("report/")}">Report page</a>
            <a class="footer-link" href="${url("report/PDF-Report.pdf")}">PDF Report</a>
          </div>

          <div class="footer-col">
            <div class="footer-col__title">Contact</div>
            <a class="footer-link" href="mailto:${EMAIL}">${EMAIL}</a>
          </div>
        </div>
      </div>
    `;

    // Insert above default Material footer meta
    if (meta) footer.insertBefore(block, meta);
    else footer.prepend(block);

    // Subscribe button: opens email reliably (forms + mailto are inconsistent)
    const btn = footer.querySelector("#footerSubscribeBtn");
    const input = footer.querySelector("#footerEmail");

    function subscribe() {
      const v = (input?.value || "").trim();
      const subject = "Math 221 Project Updates — Subscribe";
      const body =
        "Hello,\n\nPlease add me to updates for the Math 221 Numerical Analysis project.\n\n" +
        (v ? `Email: ${v}\n\n` : "") +
        "Thank you.";
      window.location.href =
        `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    if (btn) btn.addEventListener("click", subscribe);
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          subscribe();
        }
      });
    }
  }

  function run() {
    addHeaderCTA();
    addFooterBlock();
  }

  // Material instant navigation
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();