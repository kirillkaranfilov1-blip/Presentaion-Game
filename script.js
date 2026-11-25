const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal-on-scroll');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const knight = document.querySelector('.knight');
let attackTimer;
function swingSword() {
  knight.classList.remove('is-attacking');
  void knight.offsetWidth;
  knight.classList.add('is-attacking');
  knight.setAttribute('aria-pressed', 'true');
  window.clearTimeout(attackTimer);
  attackTimer = window.setTimeout(() => {
    knight.classList.remove('is-attacking');
    knight.setAttribute('aria-pressed', 'false');
  }, 850);
}
knight.addEventListener('pointerenter', swingSword);
knight.addEventListener('focus', swingSword);
knight.addEventListener('click', swingSword);

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  nav.classList.toggle('is-open', !isOpen);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  nav.classList.remove('is-open');
}));

const form = document.querySelector('#access-form');
const formMessage = form.querySelector('.form-message');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(form).get('email');
  formMessage.textContent = `Демо отправки: заявка на ${email} не сохранена. Подключите сервис рассылки.`;
  formMessage.classList.add('is-confirmed');
  form.reset();
});
