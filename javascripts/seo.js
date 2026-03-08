(function () {
  const removableParams = ["q", "query", "search"];

  function stripEmptySearchParams() {
    const url = new URL(window.location.href);
    let changed = false;

    removableParams.forEach((key) => {
      if (url.searchParams.has(key) && !url.searchParams.get(key).trim()) {
        url.searchParams.delete(key);
        changed = true;
      }
    });

    if (!changed) return;

    const cleanSearch = url.searchParams.toString();
    const nextUrl = `${url.pathname}${cleanSearch ? `?${cleanSearch}` : ""}${url.hash}`;
    window.history.replaceState({}, document.title, nextUrl);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", stripEmptySearchParams, { once: true });
  } else {
    stripEmptySearchParams();
  }
})();
