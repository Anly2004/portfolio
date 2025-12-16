// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section, .project-card, .skill-card, .about-card, .timeline-item, .contact-card, .contact-form').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// EmailJS integration (placeholder keys)
// Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY with your EmailJS values.
(function() {
  if (window.emailjs) {
    emailjs.init('YOUR_PUBLIC_KEY');
  }
})();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = 'Sending...';

  if (!window.emailjs) {
    formStatus.textContent = 'EmailJS not loaded. Please try again.';
    return;
  }

  const params = {
    from_name: contactForm.name.value,
    reply_to: contactForm.email.value,
    message: contactForm.message.value
  };

  try {
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params);
    formStatus.textContent = 'Message sent! I will get back to you soon.';
    contactForm.reset();
  } catch (err) {
    console.error(err);
    formStatus.textContent = 'Something went wrong. Please email me directly.';
  }
});


