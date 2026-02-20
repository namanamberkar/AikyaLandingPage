// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Magnetic Elements
document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const bound = btn.getBoundingClientRect();
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        outline.style.transform = `translate(-50%, -50%) scale(2)`;
        outline.style.borderColor = 'white';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
        outline.style.transform = `translate(-50%, -50%) scale(1)`;
        outline.style.borderColor = 'var(--primary-gold)';
    });
});

// Parallax Hero Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const layerMid = document.querySelector('.layer-mid');
    const heroContent = document.querySelector('.hero-content');

    if (layerMid) layerMid.style.transform = `translateY(${scrolled * 0.4}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
});

// Intersection Observer for fade-in animations
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.attraction-card, .section-title, .rule-card').forEach(el => {
    el.classList.add('fade-ready');
    observer.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Attractions Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const attractionCards = document.querySelectorAll('.attraction-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        attractionCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'flex';
                // Trigger animation reset if needed
                card.style.opacity = '0';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Booking Modal Logic
const modal = document.getElementById('bookingModal');
const openBtns = document.querySelectorAll('.open-booking');
const closeBtn = document.querySelector('.close-modal');

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
