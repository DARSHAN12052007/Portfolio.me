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

// ===== CONTACT FORM — Web3Forms (secure, AJAX, spam-protected) =====
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Block bots that filled the honeypot checkbox
  if (form.querySelector('[name="botcheck"]').checked) return;

  // Basic rate limiting — prevent double-clicks
  if (submitBtn.disabled) return;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      // Success state
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = '#059669';
      submitBtn.style.color = '#fff';
      form.reset();
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
      }, 5000);
    } else {
      throw new Error(result.message || 'Submission failed');
    }

  } catch (error) {
    // Error state
    submitBtn.textContent = 'Failed — Try Again';
    submitBtn.style.background = '#dc2626';
    submitBtn.style.color = '#fff';
    submitBtn.disabled = false;
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.style.background = '';
      submitBtn.style.color = '';
    }, 5000);
  }
});

// ===== HERO IMAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  // Animate hero immediately
  document.querySelector('.hero-text')?.classList.add('visible');
  setTimeout(() => document.querySelector('.hero-image-wrap')?.classList.add('visible'), 200);
});
