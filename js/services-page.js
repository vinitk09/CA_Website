// js/services-page.js
//
// SERVICES PAGE CONTROLLER
//

(function() {
    'use strict';

    let currentServiceId = null;

    //  DOM References
    const serviceListEl = document.getElementById('serviceList');
    const serviceContentEl = document.getElementById('serviceContent');
    const sidebarEl = document.getElementById('serviceSidebar');

    //  Render Service List
    function renderServiceList() {
        if (!serviceListEl) return;

        serviceListEl.innerHTML = servicesData.map(service => `
            <div class="service-list-item ${service.id === currentServiceId ? 'active' : ''}"
                 data-id="${service.id}"
                 onclick="window.selectService('${service.id}')">
                <i class="${service.icon}"></i>
                <span>${service.name}</span>
                <span class="badge"></span>
            </div>
        `).join('');
    }

    //  Select Service
    window.selectService = function(id) {
        currentServiceId = id;
        renderServiceList();

        const service = servicesData.find(s => s.id === id);
        if (!service) return;

        // Update content
        if (serviceContentEl) {
            serviceContentEl.innerHTML = `
                <div class="service-image">
                    <img src="${service.image}" alt="${service.name}" loading="lazy" />
                </div>
                <div class="service-header">
                    <div class="icon-wrap">
                        <i class="${service.icon}"></i>
                    </div>
                    <h1>${service.name}</h1>
                </div>
                <p class="service-description">${service.description}</p>

                <div class="rule"></div>

                <div class="features-grid">
                    ${service.features.map(feature => `
                        <div class="feature-item">
                            <i class="ri-check-line"></i> ${feature}
                        </div>
                    `).join('')}
                </div>

                ${service.fullContent}

                <div class="cta-section">
                    <h3>Ready to Get Started?</h3>
                    <p style="margin-bottom:16px;">Contact us today to learn more about how SPARK can help your business.</p>
                    <a href="index.html#contact" class="btn btn-gold">
                        Contact Us <i class="ri-arrow-right-line"></i>
                    </a>
                </div>
            `;
        }

        // Update URL without reload
        if (history.pushState) {
            history.pushState(null, '', `?service=${service.slug}`);
        }

        // Scroll to top of content on mobile
        if (window.innerWidth <= 768 && serviceContentEl) {
            serviceContentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    //  Navigation
    function initNav() {
        const nav = document.getElementById('nav');
        if (!nav) return;

        window.addEventListener('scroll', () => {
            nav.classList.toggle('solid', window.scrollY > 60);
        }, { passive: true });
    }

    //  Mobile Menu
    function initMobileMenu() {
        const hb = document.getElementById('navHb');
        const drw = document.getElementById('navDrw');
        const ovl = document.getElementById('navOvl');
        const drwClose = document.getElementById('navDrwClose');

        if (!hb || !drw || !ovl) return;

        const openNav = () => {
            hb.classList.add('open');
            drw.classList.add('open');
            ovl.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeNav = () => {
            hb.classList.remove('open');
            drw.classList.remove('open');
            ovl.classList.remove('open');
            document.body.style.overflow = '';
        };

        hb.addEventListener('click', () => {
            drw.classList.contains('open') ? closeNav() : openNav();
        });

        ovl.addEventListener('click', closeNav);

        if (drwClose) {
            drwClose.addEventListener('click', closeNav);
        }

        document.querySelectorAll('.nav-drawer a').forEach(a => {
            a.addEventListener('click', closeNav);
        });
    }

    //  Init
    function init() {
        // Check URL for service param
        const urlParams = new URLSearchParams(window.location.search);
        const serviceSlug = urlParams.get('service');

        if (serviceSlug) {
            const service = servicesData.find(s => s.slug === serviceSlug);
            if (service) {
                window.selectService(service.id);
            } else if (servicesData.length > 0) {
                window.selectService(servicesData[0].id);
            }
        } else if (servicesData.length > 0) {
            // Select first service by default
            window.selectService(servicesData[0].id);
        }

        // Initialize navigation
        initNav();
        initMobileMenu();

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get('service');
            if (slug) {
                const service = servicesData.find(s => s.slug === slug);
                if (service) {
                    window.selectService(service.id);
                }
            } else if (servicesData.length > 0) {
                window.selectService(servicesData[0].id);
            }
        });

        console.log('Services page initialized successfully!');
        console.log(`Loaded ${servicesData.length} services.`);
    }

    //  Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();