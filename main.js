// Dynamic Hero Image Customization
const heroImgElement = document.querySelector('.hero-img-main');
if (heroImgElement) {
    const tryLoadImage = (url, onSuccess, onFailure) => {
        const img = new Image();
        img.onload = () => onSuccess(url);
        img.onerror = onFailure;
        img.src = url;
    };

    const applyHeroImage = (url) => {
        heroImgElement.style.backgroundImage = `url('${url}')`;
    };

    // Try loading front.png, then front.jpg, then front.jpeg
    tryLoadImage('front.png', applyHeroImage, () => {
        tryLoadImage('front.jpg', applyHeroImage, () => {
            tryLoadImage('front.jpeg', applyHeroImage, () => {
                // If all fail, the image falls back to whatever was set inline in index.html
            });
        });
    });
}

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

// Property Gallery Lightbox Logic
const propertyPhotos = {
    "Kadri 3BHK": ["IMG-20250601-WA0000.jpg", "IMG-20250601-WA0001.jpg", "IMG-20250601-WA0002.jpg", "IMG-20250601-WA0003.jpg", "IMG-20250601-WA0004.jpg", "IMG-20250601-WA0005.jpg", "IMG-20250601-WA0006.jpg", "IMG-20250601-WA0007.jpg", "IMG-20250601-WA0008.jpg", "IMG-20250601-WA0009.jpg", "IMG-20250601-WA0010.jpg", "IMG-20250601-WA0011.jpg", "IMG-20250601-WA0012.jpg", "IMG-20250601-WA0013.jpg", "IMG-20250601-WA0014.jpg", "IMG-20250601-WA0015.jpg", "IMG-20250601-WA0016.jpg", "IMG-20250601-WA0017.jpg", "IMG-20250601-WA0018.jpg", "IMG-20250601-WA0019.jpg", "IMG-20250601-WA0020.jpg", "IMG-20250601-WA0021.jpg", "IMG-20250601-WA0022.jpg", "IMG-20250601-WA0023.jpg", "IMG-20250601-WA0024.jpg", "IMG-20250601-WA0025.jpg", "IMG-20250601-WA0026.jpg", "IMG-20250601-WA0027.jpg", "IMG-20250601-WA0028.jpg"],
    "Falnir": ["IMG-20250207-WA0022.jpg", "IMG-20250207-WA0024(1).jpg", "IMG-20250207-WA0024.jpg", "IMG-20250207-WA0025.jpg", "IMG-20250207-WA0026.jpg", "IMG-20250207-WA0027.jpg", "IMG-20250207-WA0028.jpg", "IMG-20250207-WA0029.jpg", "IMG-20250207-WA0033.jpg", "IMG-20250207-WA0034.jpg", "IMG-20250207-WA0035.jpg", "IMG-20250207-WA0036.jpg", "IMG-20250207-WA0037.jpg", "IMG-20250207-WA0038.jpg", "IMG-20250207-WA0039.jpg", "IMG-20250207-WA0040.jpg", "IMG-20250207-WA0041.jpg", "IMG-20250207-WA0042.jpg", "IMG-20250207-WA0043.jpg", "IMG-20250207-WA0044.jpg", "IMG-20250207-WA0045.jpg", "IMG-20250207-WA0046.jpg", "IMG-20250207-WA0047.jpg", "IMG-20250207-WA0048.jpg", "IMG-20250207-WA0049.jpg", "IMG-20250207-WA0050.jpg"],
    "Kadri Villa 2Bhk": ["IMG-20221219-WA0003.jpg", "IMG-20221219-WA0004.jpg", "IMG-20221219-WA0006.jpg", "IMG-20221219-WA0007.jpg", "IMG-20221219-WA0008.jpg", "IMG-20221219-WA0009.jpg", "IMG-20221219-WA0010.jpg", "IMG-20221219-WA0011.jpg", "IMG-20221219-WA0012.jpg", "IMG-20221219-WA0013.jpg", "IMG-20221219-WA0015.jpg", "IMG-20221219-WA0016.jpg", "IMG-20221219-WA0017.jpg", "IMG-20221219-WA0019.jpg", "IMG-20221219-WA0020.jpg", "IMG-20221219-WA0023.jpg", "IMG-20221219-WA0024.jpg", "IMG-20221219-WA0025.jpg", "IMG-20221219-WA0027.jpg", "IMG-20221219-WA0028.jpg", "IMG-20221219-WA0029.jpg"],
    "Aikya 1BHK": ["1.jpg", "10.jpg", "11.jpg", "12.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
    "Aikya 2BHK": ["0J6A4811.jpg", "0J6A4812.jpg", "0J6A4815.jpg", "0J6A4817.jpg", "0J6A4819.jpg", "0J6A4820.jpg", "0J6A4822.jpg", "0J6A4823.jpg", "0J6A4825.jpg", "0J6A4827.jpg", "20180622_003646.jpg", "20180622_003722.jpg", "20180622_003737.jpg", "20180622_003743.jpg", "20180622_003814.jpg", "20180622_003853.jpg", "20180622_003909.jpg", "IMG_20191103_083510.jpg"],
    "Palace 2BHK": ["IMG-20250417-WA0002.jpg", "IMG-20250417-WA0003.jpg", "IMG-20250417-WA0004.jpg", "IMG-20250417-WA0011.jpg", "IMG-20250417-WA0012.jpg", "IMG-20250417-WA0014.jpg", "IMG-20250417-WA0015.jpg", "IMG-20250417-WA0016.jpg", "IMG-20250417-WA0017.jpg", "IMG-20250417-WA0018.jpg", "IMG-20250417-WA0019.jpg", "IMG-20250417-WA0023.jpg", "IMG-20250417-WA0033.jpg", "IMG-20250417-WA0035.jpg", "IMG-20250417-WA0036.jpg", "IMG-20250417-WA0037.jpg", "IMG-20250417-WA0038.jpg"],
    "Kadri 1BHK": ["IMG-20230130-WA0017.jpg", "IMG-20230130-WA0020.jpg", "IMG-20230130-WA0022.jpg", "IMG-20230130-WA0023.jpg", "IMG-20230130-WA0024.jpg", "IMG-20230130-WA0025.jpg", "IMG-20230130-WA0026.jpg", "IMG-20230130-WA0027.jpg", "IMG-20230130-WA0028.jpg", "IMG-20230130-WA0029.jpg", "IMG-20230130-WA0030.jpg", "IMG-20230130-WA0031.jpg", "IMG-20230130-WA0032.jpg", "IMG-20240206-WA0001.jpg"]
};

let currentProperty = '';
let currentImageIndex = 0;

const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.querySelector('.lightbox-close');
const btnPrev = document.querySelector('.lightbox-prev');
const btnNext = document.querySelector('.lightbox-next');

document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
        currentProperty = card.getAttribute('data-property');
        if (!propertyPhotos[currentProperty]) return;
        currentImageIndex = 0;
        updateLightbox();
        lightboxModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Ensure Lucide icons are rendered for buttons
        lucide.createIcons();
    });
});

function updateLightbox() {
    const images = propertyPhotos[currentProperty];
    const imagePath = `Property Photos/${currentProperty}/${images[currentImageIndex]}`;
    lightboxImg.src = imagePath;
    lightboxTitle.textContent = currentProperty;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

btnPrev.addEventListener('click', () => {
    if (!propertyPhotos[currentProperty]) return;
    const images = propertyPhotos[currentProperty];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightbox();
});

btnNext.addEventListener('click', () => {
    if (!propertyPhotos[currentProperty]) return;
    const images = propertyPhotos[currentProperty];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightbox();
});

lightboxClose.addEventListener('click', () => {
    lightboxModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

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


