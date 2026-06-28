/* ==========================================================================
   Pavlet EQ — script.js
   Vanilla JavaScript only. No dependencies, no build step.
   Responsibilities:
     1. Mobile navigation toggle (accessible)
     2. Scroll-reveal animations via IntersectionObserver
        (respects prefers-reduced-motion)
     3. Header elevation on scroll
     4. Footer year stamp
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- 1. Mobile navigation ------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      links.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    // Close the menu after following an in-page/page link on mobile.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    // Close on Escape for keyboard users.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Reset state when resizing back to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) setOpen(false);
    });
  }

  /* ---- 2. Scroll-reveal animations ------------------------------------ */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    // No IntersectionObserver or reduced motion: show everything immediately.
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- 3. Header elevation on scroll ---------------------------------- */
  function initHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* ---- 4. Footer year ------------------------------------------------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---- 5. Hero video autoplay nudge ----------------------------------- */
  // Muted + playsinline videos should autoplay, but some browsers need an
  // explicit play() call. Keep it muted to satisfy autoplay policies.
  function initHeroVideo() {
    var videos = document.querySelectorAll("video[autoplay]");
    if (!videos.length) return;

    var retries = [];
    videos.forEach(function (video) {
      // Muted is required for autoplay; set it both ways for older browsers.
      video.muted = true;
      video.setAttribute("muted", "");

      function tryPlay() {
        var p = video.play();
        if (p && typeof p.catch === "function") {
          p.catch(function () {});
        }
      }

      tryPlay();
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.addEventListener("canplay", tryPlay, { once: true });
      retries.push(tryPlay);
    });

    // Last resort: kick playback off the first user interaction.
    function onFirstInteraction() {
      retries.forEach(function (fn) {
        fn();
      });
      ["pointerdown", "touchstart", "scroll", "keydown"].forEach(function (ev) {
        window.removeEventListener(ev, onFirstInteraction);
      });
    }
    ["pointerdown", "touchstart", "scroll", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, onFirstInteraction, { passive: true });
    });
  }

  /* ---- Boot ----------------------------------------------------------- */
  function init() {
    initNav();
    initReveal();
    initHeaderShadow();
    initYear();
    initHeroVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
