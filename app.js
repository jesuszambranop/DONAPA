'use strict';
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Open menu' : 'Abrir menú'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', document.documentElement.lang === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Cerrar menú' : 'Abrir menú')); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('js');
}
const isEnglish = document.documentElement.lang === 'en';
const form = document.querySelector('#family-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', () => {
  // Native POST lets Google Forms display the actual outcome; do not claim success locally.
  status.textContent = isEnglish
    ? 'Check the new Google Forms tab for the result of your submission.'
    : 'Consulta el resultado del envío en la nueva pestaña de Google Forms.';
});
document.querySelectorAll('.language-switch a').forEach(link => {
  link.addEventListener('click', () => { if (location.hash) link.hash = location.hash; });
});

// Proposal links retain PDF destinations when JavaScript is unavailable.
let lastProposalTrigger = null;
function updateDialogScrollLock() {
  document.body.classList.toggle('modal-open', Boolean(document.querySelector('dialog[open]')));
}
function openProposal(id, trigger) {
  const target = document.getElementById(`propuesta-${id}`);
  if (!target) return;
  if (trigger) lastProposalTrigger = trigger;
  document.querySelectorAll('.proposal-dialog[open]').forEach(open => open.close());
  target.showModal();
  target.scrollTop = 0;
  updateDialogScrollLock();
}
document.querySelectorAll('[data-proposal]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.getElementById(`propuesta-${link.dataset.proposal}`);
    if (!target || typeof target.showModal !== 'function') return;
    event.preventDefault();
    openProposal(link.dataset.proposal, link);
  });
});
document.querySelectorAll('.proposal-dialog').forEach(proposal => {
  proposal.querySelector('.proposal-close').addEventListener('click', () => proposal.close());
  proposal.addEventListener('close', () => {
    updateDialogScrollLock();
    if (!document.querySelector('dialog[open]') && lastProposalTrigger) lastProposalTrigger.focus({preventScroll: true});
  });
  proposal.addEventListener('click', event => {
    const box = proposal.getBoundingClientRect();
    if (event.target === proposal && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) proposal.close();
  });
  proposal.querySelector('[data-next-proposal]').addEventListener('click', event => openProposal(event.currentTarget.dataset.nextProposal));
  proposal.querySelector('[data-go-family]').addEventListener('click', event => {
    event.preventDefault();
    lastProposalTrigger = null;
    proposal.close();
    const families = document.getElementById('registro');
    families.tabIndex = -1;
    families.focus({preventScroll: true});
    families.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
});
