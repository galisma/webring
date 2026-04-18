function normalizeUrl(url) {
  try {
    const u = new URL(url, window.location.href);
    let path = u.pathname.replace(/\/+/g, "/").replace(/\/$/, "");
    if (path === "") path = "/";
    if (path.endsWith("/index.html")) path = path.slice(0, -"/index.html".length) || "/";
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    return host + path.toLowerCase();
  } catch {
    return null;
  }
}

function wireRing() {
  const links = window.ringLinks;

  if (!Array.isArray(links) || links.length === 0) {
    console.error("ringLinks missing or empty — is links.js loaded?");
    return;
  }

  const current = normalizeUrl(window.location.href);
  const index = links.findIndex(l => normalizeUrl(l) === current);

  if (index === -1) {
    console.warn("current page not found in ring:", current);
    return;
  }

  const n = links.length;
  const prev = links[(index - 1 + n) % n];
  const next = links[(index + 1) % n];

  const prevEl = document.getElementById("ring_previous");
  const nextEl = document.getElementById("ring_next");

  if (prevEl) prevEl.href = prev;
  if (nextEl) nextEl.href = next;

  console.log({ current: links[index], prev, next });
}

wireRing();
