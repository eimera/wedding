const weddingDate = new Date("2027-11-07T16:30:00+01:00");

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

// Carrousel de photos corrigé
(function () {
  const strip = document.getElementById('photosStrip');
  const prevBtn = document.getElementById('photosPrev');
  const nextBtn = document.getElementById('photosNext');
  if (!strip || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = strip.querySelectorAll('.photo-card');
  
  function updateScroll() {
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth + 20; // 20px de gap
    strip.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth'
    });
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= cards.length - 3) { 
      currentIndex = 0; // Revient au début
    }
    updateScroll();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = cards.length - 4; 
    }
    updateScroll();
  });
})();

// Gestion du menu mobile
const menuBtn = document.querySelector('.menu');
const mainNav = document.querySelector('nav');

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // referme le menu automatiquement quand on clique un lien
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}