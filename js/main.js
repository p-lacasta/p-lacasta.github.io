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
    "images/hero/FSS25_hero.jpg",
    "images/hero/FSPT25_hero.jpeg",
    "images/hero/20250719_142926000_iOS%203.jpg",
    "images/hero/20250801_175856876_iOS.jpg",
    "images/hero/20250801_181540642_iOS.jpg",
    "images/hero/20250812_192207000_iOS.jpg",
    "images/hero/20250814_150203000_iOS.jpg",
    "images/hero/SolarPlane.jpg"
];

const heroBgLayers = document.querySelectorAll(".hero-bg-layer");

if (heroBgLayers.length === 2 && heroImages.length > 0) {
    heroImages.forEach((src) => {
        const preload = new Image();
        preload.src = src;
    });

    let activeLayer = 0;
    let imageIndex = 0;

    heroBgLayers[0].style.backgroundImage = `url("${heroImages[0]}")`;
    heroBgLayers[0].classList.add("is-active");

    if (heroImages.length > 1) {
        setInterval(() => {
            imageIndex = (imageIndex + 1) % heroImages.length;
            const nextLayer = activeLayer === 0 ? 1 : 0;

            heroBgLayers[nextLayer].style.backgroundImage = `url("${heroImages[imageIndex]}")`;
            heroBgLayers[nextLayer].classList.add("is-active");
            heroBgLayers[activeLayer].classList.remove("is-active");

            activeLayer = nextLayer;
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
const navLinks = document.querySelectorAll("nav a");

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