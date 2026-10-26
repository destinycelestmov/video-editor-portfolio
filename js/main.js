/* ==========================================================================
   RENDERING: builds the page from data.js and runs the folders and the cover TV.
   You normally do not need to edit this file.
   ========================================================================== */
const $ = id => document.getElementById(id);
const el = (tag, props = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v; else if (k === "text") n.textContent = v; else n.setAttribute(k, v);
  }
  kids.flat().forEach(c => n.append(c));
  return n;
};
const isPh = s => /^\[.*\]$/.test(s);
const phText = s => isPh(s) ? el("span", { class: "ph", text: s }) : document.createTextNode(s);
const safeUrl = u => /^(https?:\/\/)/i.test(u);

/* Cover */
$("issue").textContent = site.issue;
site.name.forEach((line, i) => $("name").append(el("span", { class: "nameLine", "aria-hidden": "true", style: "--i:" + i, text: line })));
$("coverTitle").textContent = site.coverTitle;
$("tagline").replaceChildren(phText(site.tagline));

/* About */
const a = site.about;
$("photo").append(
  a.photo ? el("img", { src: a.photo, alt: "Portrait of " + site.name.join(" "), loading: "lazy" }) : el("div", { class: "img", text: "Portrait placeholder. Add a photo path in site.about.photo." }),
  el("figcaption", { text: a.photoCaption })
);
$("aboutIntro").replaceChildren(phText(a.intro));
a.blocks.forEach(b => $("aboutCols").append(el("section", {}, el("h3", { text: b.title }), el("p", {}, phText(b.text)))));
$("aboutCols").append(el("section", {}, el("h3", { text: a.skillsTitle }),
  el("ul", { class: "skills" }, a.skills.map(s => el("li", {}, phText(s))))));

/* Work: folders */
$("workNote").replaceChildren(phText(site.workNote));
const offsets = [2, 58, 24, 68, 40];
const rots = [-.5, .4, -.3, .5, -.4];
const folders = [];

function projectCard(p) {
  const ok = p.url && safeUrl(p.url);
  const media = p.image ? el("img", { src: p.image, alt: p.title + " cover", loading: "lazy", width: 800, height: 600 })
                        : el("div", { class: "noimg", text: "Image placeholder" });
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clip = p.loop ? el("video", Object.assign({ src: p.loop, poster: p.image || "", muted: "", loop: "", playsinline: "", preload: "auto", "aria-label": p.title + " preview" }, rm ? { controls: "" } : { autoplay: "" })) : null;
  if (clip) { clip.muted = true; clip.defaultMuted = true; }
  const vid = !clip && ok && (p.url.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || [])[1];
  const thumb = clip ? (ok ? el("a", { class: "thumb video", style: p.ratio ? "aspect-ratio:" + p.ratio : "", href: p.url, target: "_blank", rel: "noopener noreferrer", "aria-label": "Watch " + p.title + " in full (opens in a new tab)" }, clip) : el("div", { class: "thumb video", style: p.ratio ? "aspect-ratio:" + p.ratio : "" }, clip))
                  : vid ? el("div", { class: "thumb video" }, el("iframe", { "data-src": "https://drive.google.com/file/d/" + vid + "/preview", title: p.title + " video", allow: "autoplay; fullscreen", allowfullscreen: "", referrerpolicy: "no-referrer" }))
                  : ok ? el("a", { class: "thumb", href: p.url, target: "_blank", rel: "noopener noreferrer", tabindex: "-1", "aria-hidden": "true" }, media)
                   : el("div", { class: "thumb" }, media);
  const meta = [p.role, p.year].filter(Boolean).join(", ");
  return el("article", { class: "proj" },
    thumb,
    el("h4", {}, phText(p.title)),
    meta ? el("p", { class: "meta" }, phText(meta)) : "",
    p.description ? el("p", {}, phText(p.description)) : "",
    ok ? el("a", { class: "view", href: p.url, target: "_blank", rel: "noopener noreferrer" },
           "View project", el("span", { class: "sr", style: "position:absolute;left:-9999px", text: " (" + p.title + ", opens in a new tab)" }))
       : el("span", { class: "nolink", text: "No link added yet" })
  );
}

categories.forEach((cat, i) => {
  const bid = "tab-" + cat.id, pid = "panel-" + cat.id;
  const btn = el("button", { class: "fbtn", type: "button", id: bid, "aria-expanded": "false", "aria-controls": pid },
    el("span", { class: "tabname", text: cat.title }),
    el("span", { class: "lip" }, el("span", { text: cat.projects.length + (cat.projects.length === 1 ? " project" : " projects") }), el("span", { class: "state", text: "Open folder" }))
  );
  const panel = el("div", { class: "panel", id: pid, role: "region", "aria-labelledby": bid, inert: "" },
    el("div", { class: "pin" }, el("div", { class: "sheet" },
      cat.description ? el("p", { class: "fdesc" }, phText(cat.description)) : "",
      el("div", { class: "projects" }, cat.projects.map(projectCard)),
      cat.footer ? el("p", { class: "fdesc ffoot" }, phText(cat.footer)) : "")));
  const f = el("article", { class: "folder", "data-open": "false",
    style: `--c:${cat.color};--t:${cat.text};--off:${offsets[i % 5]}%;--rot:${rots[i % 5]}deg` }, el("h3", { style: "margin:0" }, btn), panel);
  btn.addEventListener("click", () => setOpen(f, f.dataset.open !== "true"));
  folders.push(f);
  $("cabinet").append(f);
});

function setOpen(target, open) {
  folders.forEach(f => {
    const o = f === target && open;
    f.dataset.open = o;
    f.querySelector(".fbtn").setAttribute("aria-expanded", o);
    f.querySelector(".state").textContent = o ? "Close folder" : "Open folder";
    const p = f.querySelector(".panel");
    o ? p.removeAttribute("inert") : p.setAttribute("inert", "");
    p.querySelectorAll("video[autoplay]").forEach(vd => o ? vd.play().catch(() => {}) : vd.pause());
    if (o) p.querySelectorAll("iframe[data-src]").forEach(fr => { fr.src = fr.dataset.src; fr.removeAttribute("data-src"); });
  });
}

/* Contact */
const c = site.contact;
$("invite").replaceChildren(phText(c.invite));
const rows = [
  ["Email", c.email, c.email && "mailto:" + c.email, "[you@example.com]"],
  ["Phone", c.phone, c.phone && "tel:" + c.phone.replace(/[^\d+]/g, ""), "[Phone number]"],
  ["Instagram", c.instagram, c.instagram, "[Instagram URL]"],
  ["LinkedIn", c.linkedin, c.linkedin, "[LinkedIn URL]"],
  ["Behance", c.behance, c.behance, "[Behance URL]"],
  ...c.other.map(o => [o.label, o.url, o.url, "[URL]"])
];
rows.forEach(([label, val, href, ph]) => {
  if (!val) return; // empty fields are hidden
  const good = val && (/^(mailto:|tel:)/.test(href) || safeUrl(href));
  const plain = val ? val.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "";
  const shown = good ? (label === "Instagram" ? "@" + plain.split("/").pop() : plain) : ph;
  const val_el = good
    ? el("a", /^(mailto:|tel:)/.test(href) ? { href } : { href, target: "_blank", rel: "noopener noreferrer" }, shown)
    : el("span", { class: "ph", text: shown });
  $("clist").append(el("li", {}, el("span", { text: label }), val_el));
});
if (c.location) $("clist").append(el("li", {}, el("span", { text: "Location" }), el("span", { text: c.location })));
$("copy").textContent = "© " + new Date().getFullYear() + " " + site.name.join(" ") + ". All rights reserved.";

/* ===== Cover TV: cycles 2-second clips of every project that has a "loop" video, with a channel-change static burst between them ===== */
(function () {
  const clips = categories.flatMap(c => c.projects).filter(p => p.loop);
  const tv = $("tv"); if (!tv || !clips.length) return;
  const srcs = clips.map(p => p.loop);
  const vids = [$("chA"), $("chB")], noise = $("noise"), osd = $("osd"), ctx = noise.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = 0, ch = 0, visible = true, timer = null, raf = 0, paused = reduce;
  const pad = n => String(n + 1).padStart(2, "0");
  const load = (v, i) => { v.src = srcs[i]; v.currentTime = 0; v.load(); };
  load(vids[0], 0); if (clips[0].image) vids[0].poster = clips[0].image;
  osd.textContent = "CH " + pad(0);
  function drawNoise() {
    const w = noise.width, h = noise.height, img = ctx.createImageData(w, h), d = img.data;
    const band = Math.floor(Math.random() * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4; let v = Math.random() * 255;
      if (Math.abs(y - band) < 5) v = v * .4 + 150;
      d[o] = v; d[o + 1] = v * .96; d[o + 2] = v * .88; d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  function burst(ms) {
    noise.classList.add("on"); const t0 = performance.now();
    const tick = () => { drawNoise(); if (performance.now() - t0 < ms) raf = requestAnimationFrame(tick); else noise.classList.remove("on"); };
    cancelAnimationFrame(raf); tick();
  }
  function next() {
    if (!visible || paused || document.hidden) return;
    const nextI = (ch + 1) % srcs.length, a = vids[cur], b = vids[1 - cur];
    load(b, nextI);
    burst(420);
    setTimeout(() => {
      b.currentTime = 0; b.play().catch(() => {});
      a.classList.remove("on"); b.classList.add("on");
      setTimeout(() => a.pause(), 450);
      cur = 1 - cur; ch = nextI;
      osd.textContent = "CH " + pad(ch); osd.classList.add("on"); setTimeout(() => osd.classList.remove("on"), 1300);
    }, 260);
  }
  const loop = () => { clearInterval(timer); timer = setInterval(next, 2000); };
  const io = new IntersectionObserver(es => { visible = es[0].isIntersecting;
    if (visible && !paused) vids[cur].play().catch(() => {}); else vids[cur].pause(); }, { threshold: .15 });
  io.observe(tv);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && !paused && visible) vids[cur].play().catch(() => {}); });
  const btn = $("tvPause");
  if (reduce) { btn.textContent = "Play channels"; btn.setAttribute("aria-pressed", "true"); }
  btn.addEventListener("click", () => {
    paused = !paused; btn.setAttribute("aria-pressed", paused);
    btn.textContent = paused ? "Play channels" : "Pause channels";
    if (paused) { vids[cur].pause(); clearInterval(timer); } else { vids[cur].play().catch(() => {}); loop(); }
  });
  if (!reduce) { vids[cur].play().catch(() => {}); loop(); }
})();
