/* Update year */
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

/* Header background on scroll */
const header = document.querySelector("header");
const hero = document.querySelector("#hero");

if (header && hero) {
    const updateHeaderBackground = () => {
        if (window.scrollY > hero.offsetHeight - 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeaderBackground();
    window.addEventListener("scroll", updateHeaderBackground, { passive: true });
}

/* Hero background slideshow */
/* Static hosting can't list a folder's contents at runtime, so any new
   file added to images/hero/ must also be added to this list by hand.
   (.heic files are skipped — browsers can't render that format.) */
const heroImages = [
    "images/hero/hero-1.webp",
    "images/hero/hero-2.webp",
    "images/hero/hero-3.webp",
    "images/hero/hero-4.webp",
    "images/hero/hero-5.webp",
    "images/hero/hero-6.webp"
];

const heroBgLayers = document.querySelectorAll(".hero-bg-layer");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroBgLayers.length === 2 && heroImages.length > 0) {
    let activeLayer = 0;
    let imageIndex = 0;

    /* Load only the next slide in advance, not the whole set */
    const preloadNext = () => {
        const next = new Image();
        next.src = heroImages[(imageIndex + 1) % heroImages.length];
    };

    heroBgLayers[0].style.backgroundImage = `url("${heroImages[0]}")`;
    heroBgLayers[0].classList.add("is-active");

    /* With reduced motion the first photo stays put */
    if (heroImages.length > 1 && !prefersReducedMotion) {
        preloadNext();

        setInterval(() => {
            imageIndex = (imageIndex + 1) % heroImages.length;
            const nextLayer = activeLayer === 0 ? 1 : 0;

            heroBgLayers[nextLayer].style.backgroundImage = `url("${heroImages[imageIndex]}")`;
            heroBgLayers[nextLayer].classList.add("is-active");
            heroBgLayers[activeLayer].classList.remove("is-active");

            activeLayer = nextLayer;
            preloadNext();
        }, 6000);
    }
}

/* To Top button */
const toTopButton = document.querySelector("#to-top");

if (toTopButton) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            toTopButton.classList.add("visible");
        } else {
            toTopButton.classList.remove("visible");
        }
    });

    toTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* Active section */
const sections = document.querySelectorAll("main section, footer");
const navLinks = document.querySelectorAll("#primary-nav a");

const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;
    let currentSection = sections[0]?.id || "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === "#" + currentSection;
        link.classList.toggle("active", isActive);
    });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);

/* Hamburger menu */
const navToggle = document.querySelector("#nav-toggle");
const nav = document.querySelector("#primary-nav");

if (navToggle && nav) {
    const closeMenu = () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        header?.classList.remove("menu-open");
    };

    const openMenu = () => {
        nav.classList.add("open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        header?.classList.add("menu-open");
    };

    navToggle.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
        const isClickInside = nav.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && nav.classList.contains("open")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            closeMenu();
            navToggle.focus();
        }
    });

    window.addEventListener("scroll", () => {
        if (nav.classList.contains("open")) {
            closeMenu();
        }
    }, { passive: true });
}

/* Scroll-in reveal animations */
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length > 0) {
    const revealCounters = new Map();

    revealEls.forEach((el) => {
        const parent = el.parentElement;
        const index = revealCounters.get(parent) || 0;
        el.style.setProperty("--reveal-index", index);
        revealCounters.set(parent, index + 1);
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }
}