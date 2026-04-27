// ===== .NET Mastery - Interactive Roadmap =====

document.addEventListener('DOMContentLoaded', () => {
    initTopicCards();
    initProgressTracking();
    initSmoothScroll();
    loadProgress();
});

// ===== TOGGLE TOPIC CARDS =====
function initTopicCards() {
    document.querySelectorAll('.topic-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't toggle when clicking checkbox
            if (e.target.classList.contains('topic-check')) return;

            const card = header.closest('.topic-card');
            const isOpen = card.classList.contains('open');

            // Close all other cards
            document.querySelectorAll('.topic-card.open').forEach(c => {
                if (c !== card) c.classList.remove('open');
            });

            // Toggle current card
            card.classList.toggle('open', !isOpen);
        });
    });
}

// ===== PROGRESS TRACKING =====
const STORAGE_KEY = 'dotnet-mastery-progress';

function initProgressTracking() {
    document.querySelectorAll('.topic-check').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveProgress();
            updateProgressDisplay();
        });

        // Stop propagation to prevent card toggle
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

function saveProgress() {
    const progress = {};
    document.querySelectorAll('.topic-check').forEach(cb => {
        progress[cb.dataset.id] = cb.checked;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadProgress() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!saved) return;

        document.querySelectorAll('.topic-check').forEach(cb => {
            if (saved[cb.dataset.id]) {
                cb.checked = true;
            }
        });
        updateProgressDisplay();
    } catch (e) {
        console.warn('Could not load progress:', e);
    }
}

function updateProgressDisplay() {
    const all = document.querySelectorAll('.topic-check');
    const checked = document.querySelectorAll('.topic-check:checked');
    const percent = Math.round((checked.length / all.length) * 100);

    const badge = document.getElementById('totalProgress');
    if (badge) {
        badge.textContent = percent;

        // Animate the badge
        badge.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            badge.parentElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe cards after DOM load
setTimeout(() => {
    document.querySelectorAll('.topic-card, .extended-card, .lead-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}, 100);
