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

// ===== HERO IMAGE LOAD =====
window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero-text')?.classList.add('visible');
  setTimeout(() => document.querySelector('.hero-image-wrap')?.classList.add('visible'), 200);
});

// ===== CONTACT FORM — Web3Forms (works on ALL devices, ALL browsers) =====
document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');

  if (!form || !submitBtn) return; // safety check

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // stop page refresh

    // Block honeypot bots
    var botcheck = form.querySelector('[name="botcheck"]');
    if (botcheck && botcheck.checked) return;

    // Prevent double submit
    if (submitBtn.disabled) return;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Collect form data
    var data = {
      access_key: 'e9af55ab-4516-424f-9469-13a4c75b2a26',
      subject: 'New Portfolio Message \u2014 Darshan Fulpagar',
      from_name: 'Portfolio Contact Form',
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value
    };

    // Use XMLHttpRequest for maximum compatibility (works on ALL browsers)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.web3forms.com/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      try {
        var result = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && result.success) {
          // SUCCESS
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = '#059669';
          submitBtn.style.color = '#ffffff';
          form.reset();
          setTimeout(function () {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
          }, 5000);
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        // ERROR
        submitBtn.textContent = 'Failed \u2014 Try Again';
        submitBtn.style.background = '#dc2626';
        submitBtn.style.color = '#ffffff';
        submitBtn.disabled = false;
        setTimeout(function () {
          submitBtn.textContent = 'Send Message';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 5000);
      }
    };

    xhr.onerror = function () {
      submitBtn.textContent = 'Network Error \u2014 Try Again';
      submitBtn.style.background = '#dc2626';
      submitBtn.style.color = '#ffffff';
      submitBtn.disabled = false;
      setTimeout(function () {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 5000);
    };

    xhr.send(JSON.stringify(data));
  });

});
