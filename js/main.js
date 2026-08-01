console.log("Script connected!");

/* Update year */
const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
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