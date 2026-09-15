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

(function () {
  const strip = document.getElementById('photosStrip');
  const prevBtn = document.getElementById('photosPrev');
  const nextBtn = document.getElementById('photosNext');
  if (!strip) return;

  function scrollAmount() {
    const card = strip.querySelector('.photo-card');
    const gap = 20;
    return card ? (card.offsetWidth + gap) * 2 : 300;
  }

  function isAtEnd() {
    const maxScroll = strip.scrollWidth - strip.clientWidth - 2;
    return strip.scrollLeft >= maxScroll;
  }

  function updateButtons() {
    prevBtn.disabled = strip.scrollLeft <= 0;
    // le bouton "suivant" reste toujours actif puisqu'il boucle
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => {
    strip.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    if (isAtEnd()) {
      strip.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      strip.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    }
  });

  strip.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
})();