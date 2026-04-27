/* ===== MOBILE NAV TOGGLE ===== */
(function() {
    var hamburger = document.querySelector('.nav-hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('nav-open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('nav-open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navLinks.classList.contains('nav-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) closeMenu();
    });
})();
