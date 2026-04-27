// Build & Deploy — Mobile nav + TOC scroll behavior
(function () {
    'use strict';

    // --- Hamburger menu ---
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- TOC active state on scroll ---
    const tocBar = document.querySelector('.toc-bar');
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = [];

    tocLinks.forEach(link => {
        const id = link.getAttribute('href')?.replace('#', '');
        if (id) {
            const el = document.getElementById(id);
            if (el) sections.push({ id, el, link });
        }
    });

    function updateTOC() {
        const scrollY = window.scrollY + 160;
        let current = sections[0];
        for (const s of sections) {
            if (s.el.offsetTop <= scrollY) current = s;
        }
        tocLinks.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
    }

    if (sections.length) {
        window.addEventListener('scroll', updateTOC, { passive: true });
        updateTOC();
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').replace('#', '');
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                const offset = tocBar ? tocBar.offsetHeight + 20 : 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // --- Sticky TOC bar shadow ---
    if (tocBar) {
        window.addEventListener('scroll', () => {
            tocBar.classList.toggle('scrolled', window.scrollY > 400);
        }, { passive: true });
    }
})();
