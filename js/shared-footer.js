(function () {
  const footer = document.querySelector("footer[data-shared-footer]");
  if (!footer || footer.dataset.ready === "true") return;

  const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isIndex = page === "index.html";
  const sectionLink = (hash) => (isIndex ? hash : `index.html${hash}`);

  const clockNumbers = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    return `<div class="number number-${value}"><span>${value}</span></div>`;
  }).join("");

  const clockMarkers = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    return `<div class="marker marker-${value}"><span class="marker-dot"></span></div>`;
  }).join("");

  const clockCard = (id, city) => `
    <div class="clock-card">
      <div class="clock-city">${city}</div>
      <div class="clock-container">
        <div class="clock-face" aria-hidden="true">
          ${clockMarkers}
          ${clockNumbers}
          <div class="hand hour-hand" id="${id}-hour"></div>
          <div class="hand minute-hand" id="${id}-minute"></div>
          <div class="hand second-hand" id="${id}-second"></div>
          <div class="center-pin"></div>
        </div>
      </div>
      <div class="digital-time" id="${id}-time">--:--:--</div>
    </div>
  `;

  footer.dataset.ready = "true";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="f-brand-sub">
            S K Mishra &amp; Associates - Chartered Accountants
          </div>
          <div class="footer-clock-contact">
            <a href="mailto:info@caskma.com"><i class="ri-mail-line"></i> info@caskma.com</a>
            <span class="sep">|</span>
            <a href="tel:7979732876"><i class="ri-phone-line"></i> 7979732876</a>
          </div>
          <p class="f-brand-desc">
            Building trust through excellence since 1999. A full-service CA firm with PAN-India presence and partner-led engagements.
          </p>
        </div>
        <div class="f-col">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="${sectionLink("#home")}">Home</a></li>
            <li><a href="${sectionLink("#core-values")}">Core Values</a></li>
            <li><a href="${sectionLink("#about")}">About Us</a></li>
            <li><a href="${sectionLink("#services")}">Our Services</a></li>
            <li><a href="${sectionLink("#whatwedo")}">What We Do</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="knowledge-centre.html">Knowledge Centre</a></li>
            <li><a href="${sectionLink("#achievements")}">Our Achievements</a></li>
            <li><a href="${sectionLink("#links")}">Important Links</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms &amp; Conditions</a></li>
          </ul>
        </div>
        <div class="f-col footer-clock-col">
          <h5>Global Presence</h5>
          <p class="footer-clock-tagline">Around the Clock. Across Every Location.</p>
          <div class="world-clock-wrap">
            ${clockCard("jamshedpur", "Jamshedpur")}
            ${clockCard("sydney", "Sydney")}
            ${clockCard("london", "London")}
            ${clockCard("newyork", "New York")}
          </div>
        </div>
      </div>
      <div class="footer-bot">
        <span>(C) <span class="footer-year">2026</span> S K Mishra &amp; Associates</span>
        <span class="u-style-31">Designed and Developed by Venturing Digitally Pvt. Ltd.</span>
      </div>
    </div>
  `;

  const clocks = [
    { id: "jamshedpur", zone: "Asia/Kolkata", suffix: " IST" },
    { id: "sydney", zone: "Australia/Sydney", suffix: "" },
    { id: "london", zone: "Europe/London", suffix: "" },
    { id: "newyork", zone: "America/New_York", suffix: "" },
  ].map((clock) => ({
    ...clock,
    hourEl: document.getElementById(`${clock.id}-hour`),
    minuteEl: document.getElementById(`${clock.id}-minute`),
    secondEl: document.getElementById(`${clock.id}-second`),
    digitalEl: document.getElementById(`${clock.id}-time`),
  }));

  function updateClocks() {
    const now = new Date();

    clocks.forEach((clock) => {
      if (!clock.hourEl || !clock.minuteEl || !clock.secondEl || !clock.digitalEl) return;

      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: clock.zone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).formatToParts(now);

      const getPart = (type) => Number(parts.find((part) => part.type === type)?.value || 0);
      const hour = getPart("hour");
      const minute = getPart("minute");
      const second = getPart("second");

      const hourDeg = (hour % 12) * 30 + minute * 0.5 + second * (0.5 / 60);
      const minuteDeg = minute * 6 + second * 0.1;
      const secondDeg = second * 6;

      clock.hourEl.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      clock.minuteEl.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
      clock.secondEl.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
      clock.digitalEl.textContent = `${new Intl.DateTimeFormat("en-IN", {
        timeZone: clock.zone,
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)}${clock.suffix}`;
    });
  }

  document.querySelectorAll(".footer-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  updateClocks();
  window.setInterval(updateClocks, 1000);
})();
