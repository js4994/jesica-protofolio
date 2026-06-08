const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const resumeDownload = document.getElementById("resumeDownload");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

const navAnchors = [...document.querySelectorAll(".nav-links a")];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 110;
  sections.forEach((section, idx) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navAnchors.forEach((a) => a.classList.remove("active"));
      navAnchors[idx].classList.add("active");
    }
  });
});

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thanks for your message. I will get back to you soon.";
    form.reset();
  });
}

if (resumeDownload) {
  // Simple behavior: link points to resume.pdf and uses the download attribute.
  resumeDownload.href = 'resume.pdf';
  resumeDownload.setAttribute('download', 'Jesica_Singh_Resume.pdf');
}

