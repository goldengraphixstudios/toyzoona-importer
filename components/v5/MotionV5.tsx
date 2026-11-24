"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NS = "http://www.w3.org/2000/svg";

/** All homepage choreography. Runs once after hydration and cleans up on unmount. */
export default function MotionV5() {
  useEffect(() => {
    const root = document.getElementById("tz5");
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __gsap: gsap, __st: ScrollTrigger });

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer:fine)").matches;
    const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector(s) as T;
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll(s)) as T[];
    const cleanups: (() => void)[] = [];
    const on = (el: Element | null, ev: string, fn: EventListener) => {
      if (!el) return;
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };
    const every = (fn: () => void, ms: number) => {
      const id = window.setInterval(fn, ms);
      cleanups.push(() => window.clearInterval(id));
      return id;
    };
    const html = document.documentElement;
    html.classList.add("tz5-page");
    cleanups.push(() => html.classList.remove("tz5-page"));

    /* ---------- scale readout: 7-segment digits drawn in the photo's pixel space ---------- */
    const DW = 22, DH = 36, T = 5.2, PITCH = 32, X0 = 619, Y0 = 852, DP_GAP = 11;
    const digitX = [X0, X0 + PITCH, X0 + PITCH * 2 + DP_GAP, X0 + PITCH * 3 + DP_GAP];
    const MAP: Record<string, string> = { "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcdfg", " ": "" };
    const hSeg = (x1: number, x2: number, y: number) => `${x1},${y} ${x1 + T / 2},${y - T / 2} ${x2 - T / 2},${y - T / 2} ${x2},${y} ${x2 - T / 2},${y + T / 2} ${x1 + T / 2},${y + T / 2}`;
    const vSeg = (x: number, y1: number, y2: number) => `${x},${y1} ${x + T / 2},${y1 + T / 2} ${x + T / 2},${y2 - T / 2} ${x},${y2} ${x - T / 2},${y2 - T / 2} ${x - T / 2},${y1 + T / 2}`;
    const segPts = (x: number): Record<string, string> => {
      const g = 1.4, m = Y0 + DH / 2;
      return { a: hSeg(x + g, x + DW - g, Y0), g: hSeg(x + g, x + DW - g, m), d: hSeg(x + g, x + DW - g, Y0 + DH), f: vSeg(x, Y0 + g, m - g), b: vSeg(x + DW, Y0 + g, m - g), e: vSeg(x, m + g, Y0 + DH - g), c: vSeg(x + DW, m + g, Y0 + DH - g) };
    };
    const ghost = $<SVGGElement>("#segGhost"), lit = $<SVGGElement>("#segLit");
    ghost.replaceChildren(); lit.replaceChildren();
    const segEls = digitX.map((x) => {
      const p = segPts(x), o: Record<string, SVGPolygonElement> = {};
      for (const k in p) {
        const gp = document.createElementNS(NS, "polygon"); gp.setAttribute("points", p[k]); ghost.appendChild(gp);
        const lp = document.createElementNS(NS, "polygon"); lp.setAttribute("points", p[k]); lp.style.opacity = "0"; lit.appendChild(lp); o[k] = lp;
      }
      return o;
    });
    const dpX = X0 + PITCH + DW + (PITCH - DW + DP_GAP) / 2;
    const mk = (parent: SVGGElement, op?: string) => { const c = document.createElementNS(NS, "circle"); c.setAttribute("cx", String(dpX)); c.setAttribute("cy", String(Y0 + DH)); c.setAttribute("r", "3.2"); if (op !== undefined) c.style.opacity = op; parent.appendChild(c); return c; };
    mk(ghost); const dp = mk(lit, "0");
    const show = (str: string, withDp = true) => {
      str.split("").forEach((ch, i) => { const s = MAP[ch] || ""; for (const k in segEls[i]) segEls[i][k].style.opacity = s.includes(k) ? "1" : "0"; });
      dp.style.opacity = withDp ? "1" : "0";
    };
    const fmt = (v: number) => (Math.round(Math.max(0, v) * 20) / 20).toFixed(2).replace(".", "").padStart(4, " ");
    const lcdOn = $("#lcdOn"), kgTxt = $("#lcdKg"), stable = $("#lcdStable");
    const TARGET = 24.85;
    let weighing: gsap.core.Timeline | null = null;
    const weigh = () => {
      weighing?.kill();
      const o = { v: 0 }, upd = () => show(fmt(o.v));
      weighing = gsap.timeline()
        .set(stable, { opacity: 0.12 }).set(kgTxt, { opacity: 0.12 }).set(lit, { opacity: 1 })
        .to(lcdOn, { opacity: 1, duration: 0.25 })
        .call(() => show("8888")).to({}, { duration: 0.45 })
        .call(() => show("    ", false)).to({}, { duration: 0.18 })
        .call(() => show(fmt(0))).set(kgTxt, { opacity: 1 }).to({}, { duration: 0.45 })
        .to(o, { v: TARGET * 1.11, duration: 0.6, ease: "power2.out", onUpdate: upd })
        .to(o, { v: TARGET * 0.955, duration: 0.32, ease: "sine.inOut", onUpdate: upd })
        .to(o, { v: TARGET * 1.018, duration: 0.28, ease: "sine.inOut", onUpdate: upd })
        .to(o, { v: TARGET - 0.05, duration: 0.22, ease: "sine.inOut", onUpdate: upd })
        .to(o, { v: TARGET, duration: 0.18, ease: "none", onUpdate: upd })
        .call(() => show(fmt(TARGET)))
        .to(stable, { opacity: 1, duration: 0.15 })
        .call(burst)
        .to(lit, { opacity: 0.3, duration: 0.08, yoyo: true, repeat: 3 })
        .set(lit, { opacity: 1 });
    };
    show("    ", false);
    function burst() {
      if (reduce) return;
      const art = $("#art");
      for (let i = 0; i < 9; i++) {
        const s = document.createElement("span");
        s.className = "burst";
        s.innerHTML = '<svg viewBox="0 0 40 40"><use href="#glint"/></svg>';
        s.style.left = "44.8%"; s.style.top = "85%";
        art.appendChild(s);
        const ang = (i / 9) * Math.PI * 2 + gsap.utils.random(-0.3, 0.3), dist = gsap.utils.random(50, 110);
        gsap.timeline({ onComplete: () => s.remove() })
          .fromTo(s, { x: 0, y: 0, scale: 0, rotate: 0 }, { x: Math.cos(ang) * dist * 1.6, y: Math.sin(ang) * dist * 0.8, scale: gsap.utils.random(0.6, 1.2), rotate: 120, duration: 0.55, ease: "power3.out" })
          .to(s, { scale: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.4);
      }
    }

    /* ---------- phone video + clip thumbs ---------- */
    const phone = $("#phone"), pv = $<HTMLVideoElement>("#pv");
    const startPhone = () => { pv.dataset.started = "1"; pv.play().then(() => phone.classList.add("playing")).catch(() => {}); };
    on($("#pplay"), "click", startPhone);
    $$<HTMLAnchorElement>("#thumbs .thumb[data-clip]").forEach((t) =>
      on(t, "click", (e) => {
        e.preventDefault();
        $$("#thumbs .thumb").forEach((x) => x.classList.remove("on"));
        t.classList.add("on");
        pv.poster = t.dataset.poster ?? ""; pv.src = t.dataset.clip ?? ""; $("#sname").textContent = t.dataset.name ?? "";
        startPhone();
        if (!reduce) gsap.fromTo(".device", { rotate: -5, scale: 0.94 }, { rotate: 0, scale: 1, duration: 0.7, ease: "elastic.out(1,.5)" });
      })
    );

    /* ---------- auction countdown: next Saturday 11:00 PHT (UTC+8) ---------- */
    const pad = (n: number) => String(n).padStart(2, "0");
    const nextAuction = (now: Date) => {
      const pht = new Date(now.getTime() + 8 * 3600e3);
      const t = new Date(Date.UTC(pht.getUTCFullYear(), pht.getUTCMonth(), pht.getUTCDate(), 11));
      t.setUTCDate(t.getUTCDate() + ((6 - pht.getUTCDay() + 7) % 7));
      if (t <= pht) t.setUTCDate(t.getUTCDate() + 7);
      return new Date(t.getTime() - 8 * 3600e3);
    };
    const cd = $("#cd"), cdLbl = cd.querySelector(".lbl") as HTMLElement;
    const fcd = $("#fcd"), fcdL = $("#fcdL"), flive = $("#flive"), fliveT = $("#fliveT");
    const units: Record<string, HTMLElement[]> = { d: $$("[data-cd=d]"), h: $$("[data-cd=h]"), m: $$("[data-cd=m]"), s: $$("[data-cd=s]") };
    const last: Record<string, string> = {};
    const setU = (k: string, v: string) => {
      if (last[k] === v) return;
      const first = last[k] === undefined;
      last[k] = v;
      units[k].forEach((el) => {
        el.textContent = v;
        if (!first && !reduce) gsap.fromTo(el, { yPercent: -70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.34, ease: "back.out(2.2)" });
      });
    };
    let mode = "";
    const tick = () => {
      const now = new Date(), pht = new Date(now.getTime() + 8 * 3600e3);
      const day = pht.getUTCDay(), mins = pht.getUTCHours() * 60 + pht.getUTCMinutes();
      const auctionNow = day === 6 && mins >= 11 * 60 && mins < 14 * 60;
      const liveNow = day >= 1 && day <= 6 && mins >= 9 * 60 && mins < 18 * 60 + 30;
      const m = auctionNow ? "auction" : liveNow ? "live" : "off";
      if (m !== mode) {
        mode = m;
        cd.classList.toggle("now", auctionNow); fcd.classList.toggle("now", auctionNow);
        cdLbl.textContent = auctionNow ? "Bidding is on now at the warehouse" : "Next auction in";
        fcdL.textContent = auctionNow ? "Saturday auction is on now" : "Saturday auction in";
        flive.classList.toggle("on", liveNow);
        fliveT.textContent = liveNow ? "Live selling now" : "Live Mon to Sat, 9 AM";
      }
      if (auctionNow) return;
      let s = Math.max(0, Math.floor((nextAuction(now).getTime() - now.getTime()) / 1000));
      setU("d", String(Math.floor(s / 86400))); s %= 86400;
      setU("h", pad(Math.floor(s / 3600))); s %= 3600;
      setU("m", pad(Math.floor(s / 60))); setU("s", pad(s % 60));
    };
    tick(); every(tick, 1000);

    /* ---------- floating bar + progress: one passive listener, one rAF ---------- */
    const float = $("#float"), fprog = $("#fprog");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
        float.classList.toggle("show", y > 260);
        fprog.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));
    onScroll();

    /* ---------- videos only decode while on screen ---------- */
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) { if ((v.dataset.auto !== undefined && !reduce) || v.dataset.started) v.play().catch(() => {}); }
      else if (!v.paused) v.pause();
    }), { threshold: 0.2 });
    $$("video").forEach((v) => io.observe(v));
    cleanups.push(() => io.disconnect());

    /* ---------- embeds load on click, so no third-party iframes slow the page ---------- */
    const mountEmbed = (box: HTMLElement) => {
      if (box.classList.contains("loaded") || !box.dataset.embed) return;
      const f = document.createElement("iframe");
      f.src = box.dataset.embed;
      f.title = box.getAttribute("aria-label") ?? "Toyzoona video";
      f.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      box.classList.add("loaded");
      box.replaceChildren(f);
    };
    $$("[data-embed].vf").forEach((b) => on(b, "click", () => mountEmbed(b)));
    $$("[data-load]").forEach((b) => on(b, "click", () => mountEmbed($("#" + (b as HTMLElement).dataset.load))));

    /* ---------- the STAR post shows on load, at the box's real width (Facebook lays it out for that width) ---------- */
    const star = document.getElementById("starPv");
    const starFrame = star?.querySelector("iframe");
    if (star && starFrame?.dataset.src) {
      let last = 0;
      const fit = () => {
        const w = Math.min(750, Math.round(star.clientWidth));
        if (!w || Math.abs(w - last) < 40) return;
        last = w;
        starFrame.src = starFrame.dataset.src!.replace(/width=\d+/, `width=${w}`);
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(star);
      cleanups.push(() => ro.disconnect());
    }

    /* ---------- FAQ accordions ---------- */
    $$<HTMLDetailsElement>(".acc").forEach((d) => {
      const ans = d.querySelector(".ans");
      on(d.querySelector("summary"), "click", (e) => {
        if (reduce) return;
        e.preventDefault();
        if (d.open) gsap.to(ans, { height: 0, opacity: 0, paddingBottom: 0, duration: 0.3, ease: "power2.in", onComplete() { d.open = false; gsap.set(ans, { clearProps: "all" }); } });
        else { d.open = true; gsap.from(ans, { height: 0, opacity: 0, paddingBottom: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }); }
      });
    });

    if (reduce) {
      lcdOn.setAttribute("opacity", "1"); show(fmt(TARGET)); kgTxt.setAttribute("opacity", "1"); stable.setAttribute("opacity", "1");
      return () => cleanups.forEach((f) => f());
    }

    const ctx = gsap.context(() => {
      $$(".spark").forEach((s) => gsap.from(s, { scale: 0, opacity: 0, transformOrigin: s.classList.contains("r") ? "0% 100%" : "100% 100%", duration: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: s, start: "top 92%" } }));

      /* ambient: glints twinkle now and then, bokeh and clouds drift with scroll */
      const glints = $$("[data-tw]");
      const twinkleOne = () => {
        const g = gsap.utils.random(glints);
        const r = g.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        gsap.timeline().to(g, { scale: 1.6, rotate: "+=90", opacity: 1, duration: 0.35, ease: "back.out(3)" }).to(g, { scale: 0.85, opacity: Number(g.dataset.o ?? 0.9), duration: 0.6, ease: "power2.out" });
      };
      glints.forEach((g) => { g.dataset.o = getComputedStyle(g).opacity; });
      gsap.set(glints, { scale: 0.85 });
      const tw = () => { twinkleOne(); twinkleOne(); gsap.delayedCall(gsap.utils.random(0.5, 1.2), tw); };
      gsap.delayedCall(1.5, tw);
      $$("[data-par]").forEach((b) => {
        const size = b.offsetWidth || 30;
        gsap.to(b, { y: -size * 3.2, ease: "none", scrollTrigger: { trigger: b.closest("section, .band-sky, footer") ?? b, start: "top bottom", end: "bottom top", scrub: true } });
      });
      $$("[data-cloud]").forEach((c, i) => {
        gsap.to(c, { x: (i % 2 ? -1 : 1) * 160, ease: "none", scrollTrigger: { trigger: ".band-sky", start: "top bottom", end: "bottom top", scrub: 1 } });
      });

      /* ---------- HERO intro ---------- */
      const art = $("#art");
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hdr", { yPercent: -100, duration: 0.7 })
        .from(".logo", { scale: 0.4, rotate: -12, opacity: 0, duration: 0.9, ease: "elastic.out(1,.55)" }, "-=.35")
        .from(".links a, .nav .btn", { y: -20, opacity: 0, stagger: 0.06, duration: 0.5 }, "<.1")
        .from("#scene", { scale: 1.1, duration: 1.6, ease: "power2.out" }, 0)
        .from(".copy h1 .l>span", { yPercent: 110, rotate: 4, duration: 0.9, stagger: 0.12 }, 0.35)
        .from(".copy .lede", { y: 24, opacity: 0, duration: 0.7 }, "-=.5")
        .from(".ctas .btn", { y: 30, scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.7, ease: "back.out(2.2)" }, "-=.45")
        .from("#hCloud", { xPercent: -70, opacity: 0, duration: 1.6, ease: "power2.out" }, 0.3)
        .from(".star", { scale: 0, rotate: -160, opacity: 0, stagger: 0.14, duration: 0.9, ease: "back.out(2.6)" }, 0.7)
        .from("#hBear", { yPercent: 14, scaleY: 0.82, scaleX: 1.1, opacity: 0, duration: 0.9, ease: "elastic.out(1,.45)" }, 0.9)
        .add(weigh, 1.2)
        .from(".feat", { y: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.8)" }, 0.8)
        .from(".icw", { scale: 0.3, rotate: -20, stagger: 0.08, duration: 0.8, ease: "elastic.out(1,.5)" }, "<.1");
      on($("#hot"), "click", weigh);
      ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom top", onEnterBack: weigh });

      const bear = $("#hBear");
      gsap.timeline({ repeat: -1, repeatDelay: 3.4, delay: 2.6 })
        .to(bear, { rotate: -4, duration: 0.22, ease: "sine.inOut" })
        .to(bear, { rotate: 3.5, duration: 0.3, ease: "sine.inOut" })
        .to(bear, { rotate: -3, duration: 0.28, ease: "sine.inOut" })
        .to(bear, { rotate: 0, duration: 0.4, ease: "elastic.out(1,.4)" });
      on(bear, "click", () => {
        gsap.timeline()
          .to(bear, { scaleY: 0.9, scaleX: 1.06, duration: 0.12, ease: "power2.in" })
          .to(bear, { y: "-12%", scaleY: 1.06, scaleX: 0.96, duration: 0.28, ease: "power2.out" })
          .to(bear, { y: 0, scaleY: 1, scaleX: 1, duration: 0.5, ease: "bounce.out" });
      });

      const glint = $("#glint");
      const twinkle = () => {
        const s = gsap.utils.random($$(".star")), r = s.getBoundingClientRect(), ar = art.getBoundingClientRect();
        gsap.set(glint, { left: r.left - ar.left + r.width * 0.55 + "px", top: r.top - ar.top - r.height * 0.15 + "px", xPercent: -50, yPercent: -50 });
        gsap.timeline()
          .to(s, { scale: 1.25, rotate: "+=36", duration: 0.35, ease: "back.out(3)" }).to(s, { scale: 1, duration: 0.5 })
          .fromTo(glint, { opacity: 0, scale: 0.2, rotate: 0 }, { opacity: 1, scale: 1, rotate: 90, duration: 0.35 }, 0)
          .to(glint, { opacity: 0, scale: 0.3, duration: 0.35 }, 0.35);
      };
      const loop = () => { twinkle(); gsap.delayedCall(gsap.utils.random(1.8, 3.4), loop); };
      gsap.delayedCall(2.8, loop);

      gsap.to("#hCloud", { x: "14vw", duration: 38, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
      if (fine) {
        const qc = gsap.quickTo("#hCloud", "y", { duration: 1.2, ease: "power3" });
        const qs = $$(".star").map((s) => [gsap.quickTo(s, "x", { duration: 1, ease: "power3" }), gsap.quickTo(s, "y", { duration: 1, ease: "power3" })]);
        const qsx = gsap.quickTo("#scene", "x", { duration: 1.4, ease: "power3" });
        on($("#hero"), "pointermove", (e) => {
          const pe = e as PointerEvent, nx = pe.clientX / innerWidth - 0.5, ny = pe.clientY / innerHeight - 0.5;
          qc(ny * -18); qs.forEach(([x, y], i) => { x(nx * (22 + i * 8)); y(ny * (16 + i * 6)); }); qsx(nx * -10);
        });
      }
      gsap.to("#scene", { yPercent: 6, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      $$(".logo, .flogo").forEach((l) => on(l, "mouseenter", () => { gsap.fromTo(l, { rotate: 0 }, { keyframes: { rotate: [-5, 4, -2, 0] }, duration: 0.6 }); }));

      /* ---------- shelves ---------- */
      gsap.from(".shelves .shead > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".shelves", start: "top 80%" } });
      gsap.from(".shelf", { y: 90, rotate: (i: number) => [-6, 4, -4, 6][i], opacity: 0, stagger: 0.1, duration: 1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".shelfs", start: "top 85%" } });
      gsap.from(".shelves .center .btn", { scale: 0.6, opacity: 0, duration: 0.8, ease: "elastic.out(1,.55)", scrollTrigger: { trigger: ".shelves .center", start: "top 92%" } });
      if (fine) $$(".shelf").forEach((c) => {
        const rx = gsap.quickTo(c, "rotationX", { duration: 0.5, ease: "power3" }), ry = gsap.quickTo(c, "rotationY", { duration: 0.5, ease: "power3" }), y = gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" });
        on(c, "pointermove", (e) => { const pe = e as PointerEvent, r = c.getBoundingClientRect(); ry(((pe.clientX - r.left) / r.width - 0.5) * 16); rx(-((pe.clientY - r.top) / r.height - 0.5) * 12); y(-8); });
        on(c, "pointerleave", () => { rx(0); ry(0); y(0); });
      });

      /* ---------- how it works ---------- */
      gsap.from(".how .shead", { y: 40, opacity: 0, duration: 0.7, scrollTrigger: { trigger: ".how", start: "top 80%" } });
      gsap.timeline({ scrollTrigger: { trigger: ".steps", start: "top 78%" } })
        .from(".num", { scale: 0, stagger: 0.15, duration: 0.5, ease: "back.out(3)" })
        .from("#stBox", { y: -160, opacity: 0, duration: 0.55, ease: "power2.in" }, 0.1)
        .to("#stBox", { scaleY: 0.82, scaleX: 1.12, transformOrigin: "50% 100%", duration: 0.1 })
        .to("#stBox", { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1,.35)" })
        .from("#stScale", { y: -160, opacity: 0, duration: 0.55, ease: "power2.in" }, "-=.45")
        .to("#stScale", { scaleY: 0.86, scaleX: 1.08, transformOrigin: "50% 100%", duration: 0.1 })
        .to("#stScale", { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1,.35)" })
        .from("#stTruck", { x: -420, opacity: 0, duration: 0.75, ease: "power3.out" }, "-=.45")
        .to("#stTruck", { rotate: -4, transformOrigin: "80% 100%", duration: 0.12 }, "-=.05")
        .to("#stTruck", { rotate: 0, duration: 0.5, ease: "elastic.out(1,.4)" })
        .from(".step h3, .step .sub, .step .more", { y: 20, opacity: 0, stagger: 0.04, duration: 0.45 }, 0.3);
      $$(".step").forEach((s) => on(s, "mouseenter", () => {
        const im = s.querySelector(".vis img");
        gsap.timeline().to(im, { y: -14, duration: 0.2, ease: "power2.out" }).to(im, { y: 0, duration: 0.6, ease: "bounce.out" });
      }));
      gsap.from(".why", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".why", start: "top 90%" } });
      gsap.from(".why .kg", { scale: 0.4, rotate: -12, duration: 0.9, ease: "elastic.out(1,.5)", scrollTrigger: { trigger: ".why", start: "top 85%" } });

      /* ---------- auction ---------- */
      gsap.from(".acard", { y: 80, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".acard", start: "top 85%" } });
      gsap.from(".acard h2, .acard .when, .acard .lede, .alist li, .cd, .acard .btn", { x: 40, opacity: 0, stagger: 0.07, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".acard", start: "top 75%" } });
      const sl = $$("#slides img"); gsap.set(sl.slice(1), { opacity: 0 });
      let si = 0;
      every(() => {
        const prev = sl[si]; si = (si + 1) % sl.length; const next = sl[si];
        gsap.set(next, { zIndex: 2, opacity: 0, scale: 1.08 }); gsap.set(prev, { zIndex: 1 });
        gsap.to(next, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", onComplete: () => { gsap.set(prev, { opacity: 0, zIndex: 0 }); } });
      }, 4200);
      const rings = $$("#bang i");
      const bang = () => gsap.timeline()
        .to("#aBear", { rotate: -5, duration: 0.18, ease: "power2.out" })
        .to("#aBear", { rotate: 2, scaleY: 0.97, duration: 0.08, ease: "power4.in" })
        .fromTo(rings, { scale: 0.2, opacity: 1 }, { scale: 1.4, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" })
        .to("#aBear", { rotate: 0, scaleY: 1, duration: 0.5, ease: "elastic.out(1,.4)" }, "<");
      ScrollTrigger.create({ trigger: ".acard", start: "top 70%", once: true, onEnter() {
        gsap.from("#aBear", { y: 120, opacity: 0, duration: 0.8, ease: "back.out(1.6)", onComplete() {
          gsap.timeline({ repeat: -1, repeatDelay: 2.6 }).add(bang()).add(bang(), "+=.15").add(bang(), "+=.05");
        } });
      } });

      /* ---------- ways ---------- */
      gsap.from(".ways h2, .ways .intro", { x: -50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".ways", start: "top 75%" } });
      gsap.from(".way .circ", { scale: 0, rotate: -90, stagger: 0.14, duration: 1, ease: "elastic.out(1,.55)", scrollTrigger: { trigger: ".ways", start: "top 75%" } });
      gsap.from(".way h3, .way .sub, .way .more, .way .tlink", { y: 20, opacity: 0, stagger: 0.04, duration: 0.5, scrollTrigger: { trigger: ".ways", start: "top 65%" } });
      const live = $("#cLive");
      let hearts = 0;
      const heart = () => {
        const h = document.createElement("span"); h.className = "heart"; h.innerHTML = '<svg><use href="#heart"/></svg>'; live.appendChild(h);
        gsap.set(h, { left: "74%", top: "38%", scale: gsap.utils.random(0.5, 1) });
        gsap.to(h, { y: -gsap.utils.random(110, 170), x: gsap.utils.random(-30, 40), rotate: gsap.utils.random(-30, 30), duration: gsap.utils.random(1.6, 2.4), ease: "power1.out" });
        gsap.to(h, { opacity: 0, duration: 0.6, delay: 1.1, onComplete: () => h.remove() });
      };
      ScrollTrigger.create({ trigger: ".ways", start: "top 80%", end: "bottom top", onToggle(self) { window.clearInterval(hearts); if (self.isActive) hearts = window.setInterval(heart, 650); } });
      cleanups.push(() => window.clearInterval(hearts));
      on(live, "mouseenter", () => { for (let i = 0; i < 6; i++) setTimeout(heart, i * 90); });
      on($("#cFb"), "mouseenter", () => { gsap.fromTo("#cFb > img, #cFb .thumbup", { rotate: 0 }, { keyframes: { rotate: [-8, 6, -3, 0], scale: [1.06, 1.06, 1.03, 1] }, duration: 0.6 }); });
      gsap.timeline({ repeat: -1, repeatDelay: 2.2, scrollTrigger: { trigger: ".ways", start: "top 80%" } })
        .to("#cFb .thumbup", { rotate: -18, scale: 1.25, duration: 0.25, ease: "back.out(3)", transformOrigin: "30% 80%" })
        .to("#cFb .thumbup", { rotate: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,.4)" });

      /* ---------- watch ---------- */
      ScrollTrigger.create({ trigger: ".watch", start: "top 70%", once: true, onEnter: startPhone });
      gsap.from(".device", { y: 120, rotate: 17, opacity: 0, duration: 1.1, ease: "back.out(1.3)", scrollTrigger: { trigger: ".watch", start: "top 75%" } });
      gsap.from(".wh h2, .wh p", { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".watch", start: "top 70%" } });
      $$<SVGPathElement>(".swoosh path").forEach((p, i) => { const L = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 0.7, delay: 0.5 + i * 0.25, ease: "power2.out", scrollTrigger: { trigger: ".wh", start: "top 75%" } }); });
      gsap.from(".restock", { x: 80, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".restock", start: "top 85%" } });
      gsap.from("#rBox", { y: -80, rotate: -25, opacity: 0, duration: 1, ease: "bounce.out", scrollTrigger: { trigger: ".restock", start: "top 80%" } });
      gsap.from(".thumb", { y: 50, opacity: 0, stagger: 0.08, duration: 0.7, ease: "back.out(1.6)", scrollTrigger: { trigger: ".thumbs", start: "top 90%" } });

      /* ---------- ribbon: speeds up with scroll velocity ---------- */
      const trk = $(".ribbon .trk");
      const anim = trk?.getAnimations?.()[0];
      if (anim) {
        let rate = 1;
        ScrollTrigger.create({ trigger: ".ribbon", start: "top bottom", end: "bottom top", onUpdate(self) {
          rate = 1 + Math.min(Math.abs(self.getVelocity()) / 600, 5);
          anim.playbackRate = rate * (self.direction < 0 ? -1 : 1) || 1;
          gsap.killTweensOf(anim);
          gsap.to(anim, { playbackRate: 1, duration: 1.2, ease: "power2.out", delay: 0.1 });
        } });
      }
      gsap.from(".ribbon", { xPercent: -8, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".ribbon", start: "top 95%" } });

      /* ---------- featured videos ---------- */
      gsap.from(".media .shead > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".media", start: "top 80%" } });
      gsap.from(".stat", { y: 50, scale: 0.9, opacity: 0, stagger: 0.08, duration: 0.7, ease: "back.out(1.8)", scrollTrigger: { trigger: ".stats", start: "top 88%" } });
      $$("[data-count]").forEach((b) => {
        const n = Number(b.dataset.count), suf = b.dataset.suffix ?? "", o = { v: 0 };
        gsap.to(o, { v: n, duration: n > 100 ? 1.8 : 1.1, ease: "power2.out", scrollTrigger: { trigger: b, start: "top 90%", once: true },
          onUpdate: () => { b.textContent = Math.round(o.v).toLocaleString("en-US") + suf; } });
      });
      gsap.from(".mgrid .vcard, .mrow .vcard", { y: 70, opacity: 0, stagger: 0.1, duration: 0.9, ease: "back.out(1.4)", scrollTrigger: { trigger: ".mgrid", start: "top 85%" } });
      gsap.from(".press .mast", { scaleX: 0.3, opacity: 0, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: ".press", start: "top 80%" } });

      /* ---------- footer: the delivery truck drives across as you reach the bottom ---------- */
      const truck = $("#ftruck");
      gsap.fromTo(truck, { x: () => -truck.offsetWidth - 40 }, { x: () => innerWidth * 0.84 - truck.offsetWidth, ease: "none", immediateRender: true,
        scrollTrigger: { trigger: ".foot", start: "top bottom", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true,
          onUpdate(self) { gsap.set(truck, { y: Math.sin(self.progress * 90) * 2.5, rotate: Math.sin(self.progress * 45) * 1.2 }); } } });

      /* ---------- magnetic primary buttons ---------- */
      if (fine) $$(".ctas .btn, .center .btn, .why .btn, .restock .btn, .fbtns .btn").forEach((b) => {
        const qx = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3" }), qy = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3" });
        on(b, "pointermove", (e) => { const pe = e as PointerEvent, r = b.getBoundingClientRect(); qx((pe.clientX - r.left - r.width / 2) * 0.22); qy((pe.clientY - r.top - r.height / 2) * 0.3); });
        on(b, "pointerleave", () => { qx(0); qy(0); });
      });

      /* ---------- who / action / reviews / faq / footer ---------- */
      gsap.from(".who .shead > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".who", start: "top 80%" } });
      gsap.from(".wcard", { y: 80, opacity: 0, stagger: 0.1, duration: 0.9, ease: "back.out(1.4)", scrollTrigger: { trigger: ".wcards", start: "top 85%" } });
      gsap.from(".action .shead > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".action", start: "top 80%" } });
      $$(".pic").forEach((p, i) => {
        gsap.from(p.querySelector(".ph"), { clipPath: i ? "inset(0 0 0 100% round 28px)" : "inset(0 100% 0 0 round 28px)", duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: p, start: "top 85%" } });
        gsap.from(p.querySelector(".cap"), { y: 40, scale: 0.85, opacity: 0, duration: 0.8, delay: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: p, start: "top 85%" } });
        gsap.from(p.querySelectorAll("p, .venues span"), { y: 20, opacity: 0, stagger: 0.06, duration: 0.5, delay: 0.7, scrollTrigger: { trigger: p, start: "top 85%" } });
      });
      gsap.from(".reviews .shead > *", { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: ".reviews", start: "top 80%" } });
      gsap.from(".rcol", { y: 70, rotate: (i: number) => [-3, 2, -2, 3][i], opacity: 0, stagger: 0.12, duration: 0.9, ease: "back.out(1.5)", scrollTrigger: { trigger: ".rgrid", start: "top 85%" } });
      gsap.from(".stars svg", { scale: 0, rotate: -90, stagger: 0.03, duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: ".rgrid", start: "top 80%" } });
      gsap.from(".faq .shead", { y: 40, opacity: 0, duration: 0.7, scrollTrigger: { trigger: ".faq", start: "top 85%" } });
      gsap.from(".q", { y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".qbar", start: "top 88%" } });
      gsap.from(".qm", { scale: 0, rotate: -200, stagger: 0.12, duration: 0.9, ease: "back.out(2.5)", scrollTrigger: { trigger: ".qbar", start: "top 88%" } });
      gsap.from(".acc", { y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".more-q", start: "top 90%" } });
      $$(".q").forEach((q) => on(q, "mouseenter", () => { gsap.fromTo(q.querySelector(".qm"), { rotate: 0 }, { rotate: 360, duration: 0.7, ease: "back.out(1.6)" }); }));
      gsap.from(".flogo", { y: 60, rotate: -10, opacity: 0, duration: 1, ease: "elastic.out(1,.5)", scrollTrigger: { trigger: ".foot", start: "top 92%" } });
      gsap.from(".foot h3, .finfo > *, .fbtns .btn", { y: 30, opacity: 0, stagger: 0.07, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".foot", start: "top 92%" } });
    }, root);

    // images below the fold change layout height as they load; keep trigger positions honest
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));

    return () => {
      weighing?.kill();
      ctx.revert();
      cleanups.forEach((f) => f());
    };
  }, []);

  return null;
}
