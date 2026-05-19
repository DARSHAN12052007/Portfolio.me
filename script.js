// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.skill-card, .about-card, .timeline-item, .project-card, .contact-item, .contact-form, .about-text, .about-aside, .hero-text, .hero-image-wrap');
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BARS =====
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const width = e.target.getAttribute('data-width');
      e.target.style.width = width + '%';
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => barObserver.observe(bar));

// ===== FALLBACK PHOTO =====
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  heroPhoto.onerror = function () {
    this.style.display = 'none';
    const wrap = this.parentElement;
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);font-size:5rem;font-weight:800;color:#0a0a0a;font-family:Inter,sans-serif;letter-spacing:-0.04em;';
    placeholder.textContent = 'D';
    wrap.insertBefore(placeholder, this);
  };
}

// ===== CONTACT FORM (REAL SUBMISSION VIA AJAX) =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch('https://formsubmit.co/ajax/sandipfulpagare07778@gmail.com', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    submitBtn.textContent = 'Message Sent Successfully';
    submitBtn.style.background = '#059669'; // Green success color
    form.reset();
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  })
  .catch(error => {
    console.error('Error:', error);
    submitBtn.textContent = 'Error! Try Again';
    submitBtn.style.background = '#dc2626'; // Red error color
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  });
});

// ===== HERO IMAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  // Animate hero immediately
  document.querySelector('.hero-text')?.classList.add('visible');
  setTimeout(() => document.querySelector('.hero-image-wrap')?.classList.add('visible'), 200);
});
