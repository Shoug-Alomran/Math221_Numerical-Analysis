/* Math 221 — live root-finding visuals for the home page.
   The three runs mirror Project.m exactly: same function, starting values,
   tolerance and stopping rules, so every number shown matches Octave. */
(function () {
  "use strict";

  const SVG = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const f = (x) => x * x - 4;
  const df = (x) => 2 * x;
  const TOL = 1e-6;
  const MAX_ITER = 50;
  const ROOT = 2;

  /* ---------- the three algorithms (as in Project.m) --------------------- */

  function bisection(a, b) {
    const steps = [];
    for (let k = 1; k <= MAX_ITER; k++) {
      const p = (a + b) / 2;
      steps.push({ a, b, x: p });
      if (f(a) * f(p) < 0) b = p;
      else a = p;
      if (Math.abs(f(p)) < TOL || (b - a) / 2 < TOL) break;
    }
    return steps;
  }

  function newton(x0) {
    const steps = [];
    for (let k = 1; k <= MAX_ITER; k++) {
      const x1 = x0 - f(x0) / df(x0);
      steps.push({ from: x0, x: x1 });
      if (Math.abs(x1 - x0) < TOL) break;
      x0 = x1;
    }
    return steps;
  }

  function secant(x0, x1) {
    const steps = [];
    for (let k = 1; k <= MAX_ITER; k++) {
      const x2 = x1 - (f(x1) * (x1 - x0)) / (f(x1) - f(x0));
      steps.push({ prev: x0, from: x1, x: x2 });
      if (Math.abs(x2 - x1) < TOL) break;
      x0 = x1;
      x1 = x2;
    }
    return steps;
  }

  const METHODS = {
    bisection: { label: "Bisection", cls: "m1", start: 3, steps: bisection(1, 3) },
    newton: { label: "Newton–Raphson", cls: "m2", start: 3, steps: newton(3) },
    secant: { label: "Secant", cls: "m3", start: 3, steps: secant(1, 3) },
  };
  const ORDER = ["bisection", "newton", "secant"];

  /* ---------- helpers ---------------------------------------------------- */

  function el(name, attrs, parent) {
    const node = document.createElementNS(SVG, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    if (parent) parent.appendChild(node);
    return node;
  }

  // Round first so tiny negatives don't print as "-0.000000".
  const fmt = (v) => (Math.abs(v) < 5e-7 ? 0 : v).toFixed(6);
  const sub = (n) => String(n).replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[d]);

  /* ---------- hero solver ------------------------------------------------ */

  // Plot window in maths coordinates and in SVG units.
  const X0 = 0.4, X1 = 3.6, Y0 = -5, Y1 = 9;
  const W = 520, H = 300, PL = 36, PR = 14, PT = 14, PB = 28;
  const sx = (x) => PL + ((x - X0) / (X1 - X0)) * (W - PL - PR);
  const sy = (y) => PT + ((Y1 - y) / (Y1 - Y0)) * (H - PT - PB);

  function drawAxes(svg) {
    const grid = el("g", { class: "sx-plot__grid" }, svg);
    for (let x = 0.5; x <= X1; x += 0.5) {
      el("line", { x1: sx(x), x2: sx(x), y1: PT, y2: H - PB, class: Number.isInteger(x) ? "is-major" : "" }, grid);
    }
    for (let y = -4; y <= Y1; y += 2) {
      el("line", { x1: PL, x2: W - PR, y1: sy(y), y2: sy(y), class: y % 4 === 0 ? "is-major" : "" }, grid);
    }

    const axes = el("g", { class: "sx-plot__axes" }, svg);
    el("line", { x1: PL, x2: W - PR, y1: sy(0), y2: sy(0) }, axes);
    el("line", { x1: PL, x2: PL, y1: PT, y2: H - PB }, axes);

    const ticks = el("g", { class: "sx-plot__ticks" }, svg);
    for (let x = 1; x <= 3; x++) {
      el("text", { x: sx(x), y: H - PB + 17, "text-anchor": "middle" }, ticks).textContent = x;
    }
    for (let y = -4; y <= 8; y += 4) {
      el("text", { x: PL - 8, y: sy(y) + 3.5, "text-anchor": "end" }, ticks).textContent = y;
    }

    let d = "";
    for (let i = 0; i <= 120; i++) {
      const x = X0 + ((X1 - X0) * i) / 120;
      d += (i ? "L" : "M") + sx(x).toFixed(2) + " " + sy(f(x)).toFixed(2);
    }
    el("path", { d, class: "sx-plot__curve", pathLength: 1 }, svg);
    const label = el("text", { x: sx(3.1), y: sy(f(3.1)) - 10, class: "sx-plot__fn", "text-anchor": "end" }, svg);
    label.textContent = "f(x) = x² − 4";

    el("circle", { cx: sx(ROOT), cy: sy(0), r: 13, class: "sx-plot__root-halo" }, svg);
    el("circle", { cx: sx(ROOT), cy: sy(0), r: 4, class: "sx-plot__root" }, svg);
    const rootLabel = el("text", { x: sx(ROOT) + 9, y: sy(0) + 17, class: "sx-plot__root-label" }, svg);
    rootLabel.textContent = "x* = 2";

    return el("g", { class: "sx-plot__layer" }, svg);
  }

  function drawStep(layer, method, step, index, current) {
    const g = el("g", { class: "sx-plot__step sx-plot__step--" + method + (current ? " is-current" : "") }, layer);
    const n = index + 1;

    if (method === "bisection") {
      el("rect", { x: sx(step.a), y: PT, width: sx(step.b) - sx(step.a), height: H - PT - PB, class: "sx-plot__band" }, g);
      el("line", { x1: sx(step.a), x2: sx(step.a), y1: PT, y2: H - PB, class: "sx-plot__guide" }, g);
      el("line", { x1: sx(step.b), x2: sx(step.b), y1: PT, y2: H - PB, class: "sx-plot__guide" }, g);
      el("circle", { cx: sx(step.a), cy: sy(f(step.a)), r: 3.5, class: "sx-plot__pt" }, g);
      el("circle", { cx: sx(step.b), cy: sy(f(step.b)), r: 3.5, class: "sx-plot__pt" }, g);
      el("line", { x1: sx(step.x), x2: sx(step.x), y1: PT + 6, y2: sy(0), class: "sx-plot__line" }, g);
      if (current) {
        el("text", { x: sx(step.a), y: PT + 12, "text-anchor": "middle", class: "sx-plot__tag" }, g).textContent = "a";
        el("text", { x: sx(step.b), y: PT + 12, "text-anchor": "middle", class: "sx-plot__tag" }, g).textContent = "b";
      }
    } else {
      const fx = f(step.from);
      if (method === "secant") {
        el("circle", { cx: sx(step.prev), cy: sy(f(step.prev)), r: 3.5, class: "sx-plot__pt" }, g);
      }
      // Tangent (Newton) or secant line from the current point down to y = 0.
      const startX = method === "secant" ? Math.min(step.prev, step.from, step.x) : step.from;
      const endX = method === "secant" ? Math.max(step.prev, step.from, step.x) : step.x;
      const slope = method === "secant" ? (fx - f(step.prev)) / (step.from - step.prev) : df(step.from);
      const line = (x) => fx + slope * (x - step.from);
      el("line", { x1: sx(startX), y1: sy(line(startX)), x2: sx(endX), y2: sy(line(endX)), class: "sx-plot__line", pathLength: 1 }, g);
      el("circle", { cx: sx(step.from), cy: sy(fx), r: 3.5, class: "sx-plot__pt" }, g);
      el("line", { x1: sx(step.x), x2: sx(step.x), y1: sy(0), y2: sy(f(step.x)), class: "sx-plot__guide" }, g);
    }

    el("circle", { cx: sx(step.x), cy: sy(0), r: 4.5, class: "sx-plot__hit" }, g);
    if (current) {
      const t = el("text", { x: sx(step.x), y: sy(0) - 10, "text-anchor": "middle", class: "sx-plot__tag" }, g);
      t.textContent = "x" + sub(n);
    }
  }

  function formulaFor(method, step, n) {
    const x = "x" + sub(n);
    if (method === "bisection") {
      return `${x} = (a + b) / 2 = (${fmt(step.a)} + ${fmt(step.b)}) / 2 = <b>${fmt(step.x)}</b>`;
    }
    if (method === "newton") {
      return `${x} = ${fmt(step.from)} − ${fmt(f(step.from))} / ${fmt(df(step.from))} = <b>${fmt(step.x)}</b>`;
    }
    return `${x} = x${sub(n - 1)} − f·Δx/Δf = <b>${fmt(step.x)}</b>`;
  }

  function initSolver(root) {
    const svg = root.querySelector("[data-solver-plot]");
    const log = root.querySelector("[data-solver-log]");
    const formula = root.querySelector("[data-solver-formula]");
    const status = root.querySelector("[data-solver-status]");
    const tabs = root.querySelectorAll("[data-method]");
    const layer = drawAxes(svg);

    let method = "newton";
    let k = -1;
    let timer = 0;
    let auto = !reduceMotion;

    function render() {
      const { steps, cls } = METHODS[method];
      root.dataset.current = method;
      layer.textContent = "";
      for (let i = 0; i <= k; i++) drawStep(layer, method, steps[i], i, i === k);

      tabs.forEach((tab) => {
        const on = tab.dataset.method === method;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });

      const done = k === steps.length - 1;
      status.textContent = done ? "converged" : k < 0 ? "ready" : "iterating";
      root.classList.toggle("is-done", done);

      formula.innerHTML = k < 0 ? `start · x${sub(0)} = ${fmt(METHODS[method].start)}` : formulaFor(method, steps[k], k + 1);
      formula.className = "sx-solver__formula is-" + cls;

      let rows = "";
      const from = Math.max(0, k - 3);
      for (let i = from; i <= k; i++) {
        const s = steps[i];
        rows += `<div class="sx-solver__row${i === k ? " is-current" : ""}"><span>n=${i + 1}</span><span>x=${fmt(s.x)}</span><span>f(x)=${fmt(f(s.x))}</span></div>`;
      }
      if (done) {
        rows += `<div class="sx-solver__row is-done"><span>✓</span><span>root ≈ ${fmt(steps[k].x)}</span><span>${steps.length} iteration${steps.length > 1 ? "s" : ""}</span></div>`;
      }
      log.innerHTML = rows || `<div class="sx-solver__row is-idle"><span>›</span><span>press step to iterate</span></div>`;
    }

    function select(next) {
      method = next;
      k = -1;
      render();
    }

    function step() {
      const last = METHODS[method].steps.length - 1;
      if (k < last) k += 1;
      render();
      return k >= last;
    }

    function tick() {
      const finished = step();
      if (finished) {
        timer = window.setTimeout(() => {
          select(ORDER[(ORDER.indexOf(method) + 1) % ORDER.length]);
          timer = window.setTimeout(tick, 900);
        }, 2800);
      } else {
        timer = window.setTimeout(tick, 1250);
      }
    }

    function stopAuto() {
      auto = false;
      window.clearTimeout(timer);
    }

    tabs.forEach((tab) =>
      tab.addEventListener("click", () => {
        stopAuto();
        select(tab.dataset.method);
      })
    );
    root.querySelector("[data-solver-step]").addEventListener("click", () => {
      stopAuto();
      if (k === METHODS[method].steps.length - 1) k = -1;
      step();
    });
    root.querySelector("[data-solver-replay]").addEventListener("click", () => {
      stopAuto();
      select(method);
      auto = !reduceMotion;
      if (auto) timer = window.setTimeout(tick, 500);
    });

    if (auto) {
      select(method);
      timer = window.setTimeout(tick, 1200);
    } else {
      k = METHODS[method].steps.length - 1;
      render();
    }

    return stopAuto;
  }

  /* ---------- error-vs-iteration chart ----------------------------------- */

  function initErrPlot(svg) {
    const EW = 640, EH = 340, L = 58, R = 18, T = 18, B = 40;
    const FLOOR = -16; // log10 floor: errors of exactly 0 sit here
    const NMAX = 6;
    const ex = (n) => L + (n / NMAX) * (EW - L - R);
    const ey = (lg) => T + (-lg / -FLOOR) * (EH - T - B);
    const lg = (e) => (e <= 0 ? FLOOR : Math.max(FLOOR, Math.log10(e)));

    const grid = el("g", { class: "sx-errplot__grid" }, svg);
    const labels = el("g", { class: "sx-errplot__ticks" }, svg);
    for (let p = 0; p >= FLOOR; p -= 4) {
      el("line", { x1: L, x2: EW - R, y1: ey(p), y2: ey(p) }, grid);
      const t = el("text", { x: L - 10, y: ey(p) + 4, "text-anchor": "end" }, labels);
      t.innerHTML = p === 0 ? "10<tspan dy='-6' font-size='9'>0</tspan>" : `10<tspan dy="-6" font-size="9">${p}</tspan>`;
    }
    for (let n = 0; n <= NMAX; n++) {
      el("line", { x1: ex(n), x2: ex(n), y1: T, y2: EH - B, class: "is-minor" }, grid);
      el("text", { x: ex(n), y: EH - B + 20, "text-anchor": "middle" }, labels).textContent = n;
    }
    el("text", { x: (L + EW - R) / 2, y: EH - 4, "text-anchor": "middle", class: "sx-errplot__axis" }, svg).textContent = "iteration n";
    el("text", { x: 14, y: (T + EH - B) / 2, "text-anchor": "middle", class: "sx-errplot__axis", transform: `rotate(-90 14 ${(T + EH - B) / 2})` }, svg).textContent = "|xₙ − 2|";

    el("rect", { x: L, y: ey(FLOOR) - 6, width: EW - L - R, height: 6, class: "sx-errplot__floor" }, svg);
    el("text", { x: EW - R - 4, y: ey(FLOOR) - 10, "text-anchor": "end", class: "sx-errplot__floor-label" }, svg).textContent = "exact (error = 0)";

    ORDER.forEach((key, idx) => {
      const { steps, cls, label } = METHODS[key];
      const pts = [[0, lg(Math.abs(METHODS[key].start - ROOT))]].concat(
        steps.map((s, i) => [i + 1, lg(Math.abs(s.x - ROOT))])
      );
      const d = pts.map((p, i) => (i ? "L" : "M") + ex(p[0]).toFixed(1) + " " + ey(p[1]).toFixed(1)).join("");
      const g = el("g", { class: "sx-errplot__series is-" + cls, style: `--i: ${idx}` }, svg);
      el("path", { d, pathLength: 1 }, g);
      pts.forEach((p) => {
        const c = el("circle", { cx: ex(p[0]), cy: ey(p[1]), r: 4 }, g);
        const err = p[0] === 0 ? Math.abs(METHODS[key].start - ROOT) : Math.abs(steps[p[0] - 1].x - ROOT);
        el("title", {}, c).textContent = `${label} · n=${p[0]} · error ${err === 0 ? "0" : err.toExponential(2)}`;
      });
    });
  }

  /* ---------- per page --------------------------------------------------- */

  let stopSolver = null;

  function onPage() {
    if (stopSolver) stopSolver();
    stopSolver = null;

    const solver = document.querySelector("[data-solver]");
    if (solver && !solver.dataset.ready) {
      solver.dataset.ready = "1";
      stopSolver = initSolver(solver);
    }

    const errplot = document.querySelector("[data-errplot]");
    if (errplot && !errplot.dataset.ready) {
      errplot.dataset.ready = "1";
      initErrPlot(errplot);
    }
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(onPage);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onPage);
  } else {
    onPage();
  }
})();
