/* Inline script block 1, moved from index.html */
(function () {
      const clockHost = document.getElementById("footerClockHost");
      const clocks = document.querySelector(".footer-brand-col .footer-clocks");
      if (!clockHost || !clocks) return;
      clockHost.appendChild(clocks);
    })();

/* Inline script block 2, moved from index.html */
// Smooth Scroll
    //
    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 CUSTOM CURSOR
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    (function animRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animRing);
    })();
    document
      .querySelectorAll(
        "a,button,.svc-tab,.link-card,.why-card,.about-feat,.milestone,.ach-card,.wwd-step,.c-item,.ticker-item",
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", () =>
          document.body.classList.add("cursor-hover"),
        );
        el.addEventListener("mouseleave", () =>
          document.body.classList.remove("cursor-hover"),
        );
      });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 NAV
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const nav = document.getElementById("nav");
    const btt = document.getElementById("btt");
    const homeSection = document.getElementById("home");
    const heroTitle = document.querySelector(".hero-title");
    const navLinks = document.querySelectorAll(".nav-links a, .nav-links button");
    let lastScrollY = window.scrollY || 0;
    let navIsSolid = null;
    let scrollFrame = null;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const shouldBeSolid = currentScrollY > 60;

      if (shouldBeSolid !== navIsSolid) {
        navIsSolid = shouldBeSolid;
        nav.classList.toggle("solid", shouldBeSolid);
        navLinks.forEach((link) => link.classList.toggle("scrolled", shouldBeSolid));
      }

      if (btt) btt.classList.toggle("show", currentScrollY > 400);

      if (homeSection && heroTitle) {
        const homeHeight = homeSection.offsetHeight || 1;
        const homeTop = homeSection.offsetTop || 0;
        const fadeDistance = Math.max(homeHeight * 0.6, 1);
        const progress = Math.min(
          Math.max((currentScrollY - homeTop) / fadeDistance, 0),
          1,
        );
        const direction = currentScrollY >= lastScrollY ? -1 : 1;
        const translateX = direction * progress * 40;

        heroTitle.style.opacity = (1 - progress).toFixed(3);
        heroTitle.style.transform = `translate3d(${translateX}px, 0, 0)`;
        lastScrollY = currentScrollY;
      }

      scrollFrame = null;
    };

    const requestScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    updateScrollState();
    const hb = document.getElementById("navHb");
    const drw = document.getElementById("navDrw");
    const ovl = document.getElementById("navOvl");
    const openNav = () => {
      hb.classList.add("open");
      drw.classList.add("open");
      ovl.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeNav = () => {
      hb.classList.remove("open");
      drw.classList.remove("open");
      ovl.classList.remove("open");
      document.body.style.overflow = "";
    };
    hb.addEventListener("click", () =>
      drw.classList.contains("open") ? closeNav() : openNav(),
    );
    ovl.addEventListener("click", closeNav);
    document.getElementById("navDrwClose").addEventListener("click", closeNav);
    document
      .querySelectorAll(".dl")
      .forEach((a) => a.addEventListener("click", closeNav));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeNav();
    });

    document
      .querySelectorAll("#services figure.effect-layla figcaption")
      .forEach((caption) => {
        if (caption.querySelector(".svc-mini-loader")) return;
        const miniLoader = document.createElement("div");
        miniLoader.className = "svc-mini-loader";
        miniLoader.innerHTML =
          '<span class="svc-line-top"></span><span class="svc-line-right"></span><span class="svc-line-bottom"></span><span class="svc-line-left"></span>';
        caption.insertBefore(miniLoader, caption.firstChild);
      });

    const linksSection = document.getElementById("links");
    const linksToggleBtn = document.getElementById("linksToggleBtn");
    const linksPanel = document.getElementById("importantLinksPanel");
    const setLinksPanelState = (open) => {
      if (!linksToggleBtn || !linksPanel) return;
      linksToggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
      linksPanel.classList.toggle("open", open);
      linksSection?.classList.toggle("is-collapsed", !open);
      if (open) {
        linksPanel.hidden = false;
      } else {
        linksPanel.hidden = true;
      }
    };

    if (linksToggleBtn) {
      linksToggleBtn.addEventListener("click", () => {
        const isOpen = linksToggleBtn.getAttribute("aria-expanded") === "true";
        setLinksPanelState(!isOpen);
      });
    }

    document.querySelectorAll("[data-open-links='true']").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (el.tagName === "A") e.preventDefault();
        setLinksPanelState(true);
        if (linksSection) {
          linksSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    const welcomeModal = document.getElementById("welcomeModal");
    const welcomeCloseBtns = document.querySelectorAll("[data-welcome-close]");
    const setWelcomeModalState = (open) => {
      if (!welcomeModal) return;
      welcomeModal.classList.toggle("open", open);
      welcomeModal.setAttribute("aria-hidden", open ? "false" : "true");
    };

    if (welcomeModal) {
      requestAnimationFrame(() => setWelcomeModalState(true));

      welcomeCloseBtns.forEach((btn) => {
        btn.addEventListener("click", () => setWelcomeModalState(false));
      });

      welcomeModal.addEventListener("click", (e) => {
        if (e.target === welcomeModal) setWelcomeModalState(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && welcomeModal.classList.contains("open")) {
          setWelcomeModalState(false);
        }
      });
    }

    const factsheetModal = document.getElementById("factsheetModal");
    const factsheetOpenBtns = document.querySelectorAll("[data-factsheet-open]");
    const factsheetCloseBtns = document.querySelectorAll("[data-factsheet-close]");
    const setFactsheetModalState = (open) => {
      if (!factsheetModal) return;
      factsheetModal.classList.toggle("open", open);
      factsheetModal.setAttribute("aria-hidden", open ? "false" : "true");
    };

    factsheetOpenBtns.forEach((btn) => {
      btn.addEventListener("click", () => setFactsheetModalState(true));
    });

    factsheetCloseBtns.forEach((btn) => {
      btn.addEventListener("click", () => setFactsheetModalState(false));
    });

    if (factsheetModal) {
      factsheetModal.addEventListener("click", (e) => {
        if (e.target === factsheetModal) setFactsheetModalState(false);
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && factsheetModal.classList.contains("open")) {
          setFactsheetModalState(false);
        }
      });
    }

    if (btt) {
      btt.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" }),
      );
    }

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 SCROLL REVEAL â€” supports all animation classes
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const srSelectors = ".sr,.sr-l,.sr-r,.sr-fade,.sr-scale";
    const srEls = document.querySelectorAll(srSelectors);
    const srObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            srObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    srEls.forEach((el) => srObs.observe(el));

    const revealVisibleItems = () => {
      document.querySelectorAll(srSelectors).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("on");
          srObs.unobserve(el);
        }
      });
    };

    window.addEventListener("load", revealVisibleItems, { once: true });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 COUNTERS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    document.querySelectorAll(".count").forEach((el) => {
      const cObs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          cObs.disconnect();
          const target = +el.dataset.target;
          const duration = 900;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = target;
            }
          };

          requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      cObs.observe(el);
    });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 SERVICES TABS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const tabMap = {
      ass: "pnl-ass",
      tax: "pnl-tax",
      biz: "pnl-biz",
      adv: "pnl-adv",
      grc: "pnl-grc",
    };
    document.querySelectorAll(".svc-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document
          .querySelectorAll(".svc-tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelectorAll(".svc-pnl")
          .forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const pnl = document.getElementById(tabMap[tab.dataset.t]);
        if (pnl) {
          pnl.classList.add("active");
          pnl.querySelectorAll(".sr,.sr-l,.sr-r").forEach((el) => {
            el.classList.remove("on");
            requestAnimationFrame(() =>
              requestAnimationFrame(() => srObs.observe(el)),
            );
          });
        }
      });
    });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 GLOW CARD MOUSE TRACKING
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    document.querySelectorAll(".glow-card").forEach((card) => {
      const glow = card.querySelector(".glow");
      if (!glow) return;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        glow.style.left = e.clientX - r.left + "px";
        glow.style.top = e.clientY - r.top + "px";
      });
    });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 HERO TEXT STAGGER (load)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    window.addEventListener("load", () => {
      document.querySelectorAll("#home .sr").forEach((el, i) => {
        setTimeout(() => el.classList.add("on"), i * 90 + 100);
      });
    });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 FORM
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    function handleForm(e) {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) {
        e.currentTarget.reportValidity();
        return;
      }
      document.getElementById("contactForm").style.display = "none";
      document.getElementById("formOk").style.display = "block";
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", handleForm);
    }

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 HERO CANVAS â€” animated lines (SVG)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    (function () {
      const canvas = document.getElementById("hero-canvas");
      const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      svg.setAttribute(
        "style",
        "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0",
      );
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      // draw a few animated accent lines
      const lines = [
        {
          x1: "0%",
          y1: "35%",
          x2: "45%",
          y2: "35%",
          color: "rgba(14,122,110,0.08)",
          dur: "4s",
        },
        {
          x1: "55%",
          y1: "55%",
          x2: "100%",
          y2: "55%",
          color: "rgba(30,77,140,0.07)",
          dur: "5s",
        },
        {
          x1: "0%",
          y1: "68%",
          x2: "35%",
          y2: "68%",
          color: "rgba(212,160,23,0.07)",
          dur: "6s",
        },
      ];
      lines.forEach((l) => {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", l.x1);
        line.setAttribute("y1", l.y1);
        line.setAttribute("x2", l.x2);
        line.setAttribute("y2", l.y2);
        line.setAttribute("stroke", l.color);
        line.setAttribute("stroke-width", "1");
        const anim = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animate",
        );
        anim.setAttribute("attributeName", "stroke-dashoffset");
        anim.setAttribute("from", "1000");
        anim.setAttribute("to", "0");
        anim.setAttribute("dur", l.dur);
        anim.setAttribute("fill", "freeze");
        line.setAttribute("stroke-dasharray", "1000");
        line.setAttribute("stroke-dashoffset", "1000");
        line.appendChild(anim);
        svg.appendChild(line);
      });
      canvas.appendChild(svg);
    })();

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 ANNOUNCEMENTS SLIDER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const announcementBtn = document.getElementById("announcementBtn");
    const announcementsModal = document.getElementById("announcementsModal");
    const announcementsClose = document.getElementById("announcementsClose");
    const announcementsContent = document.getElementById(
      "announcementsContent",
    );
    const announcementBadge = document.getElementById("announcementBadge");

    // Open announcements modal
    announcementBtn.addEventListener("click", () => {
      announcementsModal.classList.add("open");
      fetchAnnouncements();
    });

    // Close announcements modal
    announcementsClose.addEventListener("click", () => {
      announcementsModal.classList.remove("open");
    });

    // Close modal when clicking outside
    announcementsModal.addEventListener("click", (e) => {
      if (e.target === announcementsModal) {
        announcementsModal.classList.remove("open");
      }
    });

    // Fetch announcements from backend
    async function fetchAnnouncements() {
      try {
        announcementsContent.innerHTML = `
            <div class="announcements-loading">
              <i class="ri-loader-4-line"></i>
              <span>Loading announcements...</span>
            </div>
          `;

        // Fetch from backend API
        const response = await fetch(
          "http://localhost:5000/api/announcements",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          // Filter active announcements and check expiration
          const now = new Date();
          const activeAnnouncements = data.data.filter((announcement) => {
            // Check if isActive is true
            if (!announcement.isActive) return false;

            // Check if announcement has expired
            if (
              announcement.expiresAt &&
              new Date(announcement.expiresAt) < now
            ) {
              return false;
            }

            return true;
          });

          if (activeAnnouncements.length > 0) {
            // Update badge with count of active announcements
            announcementBadge.textContent =
              activeAnnouncements.length > 99
                ? "99+"
                : activeAnnouncements.length;

            // Render announcements
            const announcementsHTML = activeAnnouncements
              .map(
                (announcement, index) => `
                <div class="announcement-item ${index === 0 ? "active" : ""}" style="animation-delay: ${index * 0.08}s">
                  <div class="announcement-date">
                    ${new Date(announcement.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
                  </div>
                  <div class="announcement-title">${announcement.title || "Untitled Announcement"}</div>
                  <div class="announcement-text">${announcement.message || "No content provided"}</div>
                </div>
              `,
              )
              .join("");

            announcementsContent.innerHTML = announcementsHTML;
          } else {
            announcementsContent.innerHTML = `
                <div class="announcements-empty">
                  <i class="ri-newspaper-line"></i>
                  <p>No announcements at the moment</p>
                </div>
              `;
            announcementBadge.textContent = "0";
          }
        } else {
          announcementsContent.innerHTML = `
              <div class="announcements-empty">
                <i class="ri-newspaper-line"></i>
                <p>No announcements at the moment</p>
              </div>
            `;
          announcementBadge.textContent = "0";
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        announcementsContent.innerHTML = `
            <div class="announcements-empty">
              <i class="ri-alert-line"></i>
              <p>Failed to load announcements. Please try again.</p>
            </div>
          `;
      }
    }

    // Load announcements count on page load
    window.addEventListener("load", () => {
      fetchAnnouncements();
    });

    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
 WORLD CLOCKS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
    const worldClocks = [
      {
        zone: "Australia/Sydney",
        hourEl: document.getElementById("sydney-hour"),
        minuteEl: document.getElementById("sydney-minute"),
        secondEl: document.getElementById("sydney-second"),
        digitalEl: document.getElementById("sydney-time"),
      },
      {
        zone: "Europe/London",
        hourEl: document.getElementById("london-hour"),
        minuteEl: document.getElementById("london-minute"),
        secondEl: document.getElementById("london-second"),
        digitalEl: document.getElementById("london-time"),
      },
      {
        zone: "America/New_York",
        hourEl: document.getElementById("newyork-hour"),
        minuteEl: document.getElementById("newyork-minute"),
        secondEl: document.getElementById("newyork-second"),
        digitalEl: document.getElementById("newyork-time"),
      },
      {
        zone: "Asia/Kolkata",
        hourEl: document.getElementById("jamshedpur-hour"),
        minuteEl: document.getElementById("jamshedpur-minute"),
        secondEl: document.getElementById("jamshedpur-second"),
        digitalEl: document.getElementById("jamshedpur-time"),
      },
    ];

    function updateWorldClocks() {
      const now = new Date();

      worldClocks.forEach((clock) => {
        if (
          !clock.hourEl ||
          !clock.minuteEl ||
          !clock.secondEl ||
          !clock.digitalEl
        ) {
          return;
        }

        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: clock.zone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).formatToParts(now);

        const getVal = (type) =>
          Number(parts.find((p) => p.type === type)?.value || 0);
        const hour = getVal("hour");
        const minute = getVal("minute");
        const second = getVal("second");

        const time12 = new Intl.DateTimeFormat("en-IN", {
          timeZone: clock.zone,
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(now);

        const hourDeg = (hour % 12) * 30 + minute * 0.5 + second * (0.5 / 60);
        const minuteDeg = minute * 6 + second * 0.1;
        const secondDeg = second * 6;

        clock.hourEl.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        clock.minuteEl.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        clock.secondEl.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;

        const zoneLabel = clock.zone === "Asia/Kolkata" ? " IST" : "";
        clock.digitalEl.textContent = `${time12}${zoneLabel}`;
      });
    }

    updateWorldClocks();
    setInterval(updateWorldClocks, 1000);

/* Inline script block 3, moved from index.html */
(function () {
      // ensure loader shows at least 3s from DOM ready
      const loader = document.getElementById("site-loader");
      if (!loader) return;
      document.body.classList.add("loading");

      const hideLoader = () => {
        loader.classList.add("hide");
        document.body.classList.remove("loading");
        // remove from DOM after fade
        setTimeout(() => loader.remove(), 700);
      };

      // If page already loaded, still wait 3s then hide
      const run = () => setTimeout(hideLoader, 3000);

      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        run();
      } else {
        window.addEventListener("DOMContentLoaded", run);
      }
    })();

/* Dynamic locations from admin backend */
(function () {
  const locationsGrid = document.getElementById("locationsGrid");
  if (!locationsGrid) return;

  const API_BASE_URL = "http://localhost:5000";

  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const getLocationName = (location) =>
    location.location || location.name || location.title || "Location";

  const getLocationLink = (location) =>
    location.addressLink || location.link || location.url || "#";

  const renderLocations = (locations) => {
    if (!Array.isArray(locations) || locations.length === 0) {
      locationsGrid.innerHTML = `
        <div class="location-item location-item--empty">
          <i class="ri-map-pin-line"></i>
          <span>No locations available</span>
        </div>
      `;
      return;
    }

    const orderedLocations = [...locations].sort((a, b) => {
      const aName = getLocationName(a).toLowerCase();
      const bName = getLocationName(b).toLowerCase();

      if (aName === "jamshedpur") return -1;
      if (bName === "jamshedpur") return 1;
      return 0;
    });

    locationsGrid.innerHTML = orderedLocations
      .map((location) => {
        const name = escapeHtml(getLocationName(location));
        const link = escapeHtml(getLocationLink(location));
        const isLink = link && link !== "#";

        if (!isLink) {
          return `
            <div class="location-item" aria-label="${name}">
              <i class="ri-map-pin-line"></i>
              <span>${name}</span>
            </div>
          `;
        }

        return `
          <a class="location-item" href="${link}" target="_blank" rel="noopener" aria-label="Open ${name} office location in Google Maps">
            <i class="ri-map-pin-line"></i>
            <span>${name}</span>
          </a>
        `;
      })
      .join("");
  };

  const loadLocations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const payload = await response.json();
      const locations = Array.isArray(payload) ? payload : payload.data || payload.locations || [];
      renderLocations(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      locationsGrid.innerHTML = `
        <div class="location-item location-item--empty">
          <i class="ri-map-pin-line"></i>
          <span>Locations will be updated shortly</span>
        </div>
      `;
    }
  };

  loadLocations();
})();



