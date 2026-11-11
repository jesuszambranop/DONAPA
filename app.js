'use strict';
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menú'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('js');
}
const dialog = document.querySelector('#family-dialog');
const form = document.querySelector('#family-form');
const status = document.querySelector('#form-status');
document.querySelector('#open-form').addEventListener('click', () => { dialog.showModal(); document.body.classList.add('modal-open'); });
document.querySelector('#close-form').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close(); });
form.addEventListener('reset', () => { status.textContent = ''; });
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  const labels = {representante:'Jefe o jefa de hogar',telefono:'Teléfono / WhatsApp',cedula:'Cédula',distrito:'Distrito',familia:'Familia',sector:'Barrio, ciudadela o sector',menores12:'Menores de 12 años',adolescentes:'Integrantes de 13 a 17 años',adultos:'Mayores de edad',brigadista:'Brigadista y equipo',observaciones:'Observaciones'};
  const content = 'PLAN SOCIAL FAMILIAR SOMOS DURANDUEÑOS\nFICHA FAMILIAR · DURÁN 2027–2031\n\n' + Object.entries(values).map(([key,value]) => `${labels[key]}: ${value || '—'}`).join('\n') + '\n\nFicha preparada por la familia. No constituye inscripción oficial, calificación ni carnetización. No se han enviado datos a ningún servidor.\n';
  const url = URL.createObjectURL(new Blob(['\uFEFF', content], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'ficha-familiar-somos-duranduenos.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Ficha preparada para descargar. No se han enviado tus datos.';
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
    proposal.close();
    document.getElementById('familias').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
});
