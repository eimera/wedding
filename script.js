const weddingDate = new Date("2027-11-13T16:30:00+01:00");

function updateCountdown() {
  const daysEl = document.getElementById("days");
  if (!daysEl) return; // pas de countdown sur cette page, on arrête ici

  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  daysEl.textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 30
    ? "0 5px 25px rgba(0,0,0,.06)"
    : "none";
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === "#" + entry.target.id
      ));
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));

// CARROUSEL DE PHOTOS
(function () {
  const strip = document.getElementById("photosStrip");
  const prevBtn = document.getElementById("photosPrev");
  const nextBtn = document.getElementById("photosNext");

  if (!strip || !prevBtn || !nextBtn) return;

  function getScrollAmount() {
    const firstCard = strip.querySelector(".photo-card");

    if (!firstCard) return 280;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(strip).gap) || 0;

    return cardWidth + gap;
  }

  nextBtn.addEventListener("click", () => {
    const maxScroll = strip.scrollWidth - strip.clientWidth;

    if (strip.scrollLeft >= maxScroll - 5) {
      // Retour au début
      strip.scrollTo({
        left: 0,
        behavior: "smooth"
      });
    } else {
      strip.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    }
  });

  prevBtn.addEventListener("click", () => {
    const maxScroll = strip.scrollWidth - strip.clientWidth;

    if (strip.scrollLeft <= 5) {
      // Retour à la fin
      strip.scrollTo({
        left: maxScroll,
        behavior: "smooth"
      });
    } else {
      strip.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    }
  });
})();

// Gestion du menu mobile
if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );
  });

  // Fermer le menu lorsqu'on clique sur un lien
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Ouvrir le menu");
    });
  });
}
