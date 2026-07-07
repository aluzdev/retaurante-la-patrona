// Armador de pedidos de La Patrona.
// Lee los platillos, junta opciones + notas, y arma el mensaje de WhatsApp.
// El total NO se calcula: la fondita lo confirma por el chat.

interface Opt {
  label: string;
  value: string;
}
interface Line {
  key: string;
  itemId: string;
  name: string;
  opts: Opt[];
  note: string;
  qty: number;
}

const WA_NUMBER = '5215530827043';
const STORE_KEY = 'lp-pedido-v1';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------- estado ---------- */
let lines: Line[] = [];
const meta = {
  orderType: 'A domicilio',
  address: '',
  payment: 'Efectivo',
  name: '',
};

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.lines)) lines = data.lines;
    if (data.meta) Object.assign(meta, data.meta);
  } catch {
    /* storage no disponible — seguimos en memoria */
  }
}
function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({ lines, meta }));
  } catch {
    /* ignore */
  }
}

const keyFor = (itemId: string, opts: Opt[], note: string) =>
  [itemId, opts.map((o) => o.value).join('·'), note.trim().toLowerCase()].join('|');

const totalQty = () => lines.reduce((n, l) => n + l.qty, 0);

/* ---------- agregar desde una tarjeta ---------- */
// Sin opciones ni nota al tocar: se agrega el platillo; los detalles se
// escriben como nota en el pedido.
function addFromCard(card: HTMLElement) {
  const itemId = card.dataset.id!;
  const name = card.dataset.name!;
  const key = keyFor(itemId, [], '');
  const existing = lines.find((l) => l.key === key);
  if (existing) existing.qty += 1;
  else lines.push({ key, itemId, name, opts: [], note: '', qty: 1 });

  card.dataset.justAdded = '';
  setTimeout(() => delete card.dataset.justAdded, 500);

  render();
  save();
  pulseBar();
  announce(`${name} agregado a tu pedido`);
}

/* ---------- comida corrida (el 95%) ---------- */
function addComidaCorrida() {
  const guiso = $<HTMLSelectElement>('[data-corrida-guiso]')?.value ?? '';
  const sopa = $<HTMLInputElement>('[data-corrida-sopa] input:checked')?.value ?? '';
  const guarn = $<HTMLInputElement>('[data-corrida-guarn] input:checked')?.value ?? '';
  const noteEl = $<HTMLInputElement>('[data-corrida-note]');
  const note = noteEl?.value.trim() ?? '';

  const opts: Opt[] = [
    { label: 'Guisado', value: guiso },
    { label: 'Sopa', value: sopa },
    { label: 'Para acompañar', value: guarn },
    { label: 'Bebida', value: 'Agua del día' },
  ];
  const key = keyFor('comida-corrida', opts, note);
  const existing = lines.find((l) => l.key === key);
  if (existing) existing.qty += 1;
  else lines.push({ key, itemId: 'comida-corrida', name: 'Comida corrida', opts, note, qty: 1 });

  const btn = $('[data-corrida-add]');
  if (btn) {
    btn.dataset.added = '';
    setTimeout(() => delete (btn as HTMLElement).dataset.added, 900);
  }
  if (noteEl) noteEl.value = '';

  render();
  save();
  pulseBar();
  announce('Comida corrida agregada a tu pedido');
}

/* ---------- switch corrida / a la carta ---------- */
function initSwitch() {
  const btns = $$('[data-switch] .switch__btn');
  const panels = $$('[data-panel]');
  btns.forEach((btn) =>
    btn.addEventListener('click', () => {
      const view = (btn as HTMLElement).dataset.view;
      btns.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
      panels.forEach((p) => ((p as HTMLElement).hidden = (p as HTMLElement).dataset.panel !== view));
    })
  );
}

/* Marca cada renglón del menú con su conteo (suma de líneas de ese platillo) */
function updateMenuRows() {
  const counts = new Map<string, number>();
  for (const l of lines) counts.set(l.itemId, (counts.get(l.itemId) ?? 0) + l.qty);
  $$('[data-dish]').forEach((card) => {
    const n = counts.get((card as HTMLElement).dataset.id!) ?? 0;
    const badge = $('[data-add-count]', card);
    if (n > 0) {
      (card as HTMLElement).dataset.inOrder = '';
      if (badge) {
        badge.textContent = String(n);
        badge.hidden = false;
      }
    } else {
      delete (card as HTMLElement).dataset.inOrder;
      if (badge) badge.hidden = true;
    }
  });
}

/* ---------- render ---------- */
const el = {
  lines: $('[data-lines]')!,
  empty: $('[data-empty]')!,
  fields: $('[data-fields]')!,
  foot: $('[data-foot]')!,
  count: $('[data-count]')!,
  barCount: $('[data-bar-count]'),
  bar: $('[data-order-bar]'),
  send: $<HTMLAnchorElement>('[data-send]')!,
  tpl: $<HTMLTemplateElement>('#order-line-tpl')!,
  addressWrap: $('[data-address-wrap]')!,
  addressHint: $('[data-address-hint]')!,
  paymentHint: $('[data-payment-hint]')!,
};

function render() {
  const has = lines.length > 0;
  el.empty.hidden = has;
  el.fields.hidden = !has;
  el.foot.hidden = !has;

  const n = totalQty();
  el.count.hidden = !has;
  el.count.textContent = String(n);
  if (el.barCount) el.barCount.textContent = String(n);
  if (el.bar) el.bar.hidden = !has;

  // renglones
  el.lines.replaceChildren();
  for (const line of lines) {
    const node = el.tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
    node.dataset.key = line.key;
    $('[data-line-name]', node)!.textContent = `${line.name}`;
    const opts = $('[data-line-opts]', node)!;
    const optStr = line.opts.filter((o) => o.value).map((o) => o.value).join(' · ');
    if (optStr) {
      opts.textContent = optStr;
      opts.hidden = false;
    }
    $('[data-qty-n]', node)!.textContent = String(line.qty);
    $('[data-note-text]', node)!.textContent = line.note;

    // controles
    $$('[data-qty]', node).forEach((b) =>
      b.addEventListener('click', () => changeQty(line.key, Number((b as HTMLElement).dataset.qty)))
    );
    $('[data-remove]', node)!.addEventListener('click', () => removeLine(line.key));
    $('[data-note-edit]', node)!.addEventListener('click', (e) =>
      editNote(line.key, e.currentTarget as HTMLElement)
    );

    el.lines.appendChild(node);
  }

  syncFields();
  updateSend();
  updateMenuRows();
}

function changeQty(key: string, delta: number) {
  const line = lines.find((l) => l.key === key);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) lines = lines.filter((l) => l.key !== key);
  render();
  save();
}

function removeLine(key: string) {
  lines = lines.filter((l) => l.key !== key);
  render();
  save();
}

function editNote(key: string, btn: HTMLElement) {
  const line = lines.find((l) => l.key === key);
  if (!line) return;
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 120;
  input.value = line.note;
  input.className = 'line__note-input';
  input.placeholder = 'Alguna indicación…';
  btn.replaceWith(input);
  input.focus();
  const commit = () => {
    const note = input.value.trim();
    // cambiar la nota puede fusionar con otro renglón idéntico
    lines = lines.filter((l) => l.key !== key);
    const newKey = keyFor(line.itemId, line.opts, note);
    const twin = lines.find((l) => l.key === newKey);
    if (twin) twin.qty += line.qty;
    else lines.push({ ...line, key: newKey, note });
    render();
    save();
  };
  input.addEventListener('blur', commit, { once: true });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') {
      input.removeEventListener('blur', commit);
      render();
    }
  });
}

/* ---------- campos (tipo, dirección, pago, nombre) ---------- */
function syncFields() {
  $$('[data-order-type] input').forEach((i) => {
    (i as HTMLInputElement).checked = (i as HTMLInputElement).value === meta.orderType;
  });
  $$('[data-payment] input').forEach((i) => {
    (i as HTMLInputElement).checked = (i as HTMLInputElement).value === meta.payment;
  });
  const addr = $<HTMLTextAreaElement>('[data-address]');
  if (addr) addr.value = meta.address;
  const nm = $<HTMLInputElement>('[data-cust-name]');
  if (nm) nm.value = meta.name;

  const needsAddress = meta.orderType === 'A domicilio';
  el.addressWrap.hidden = !needsAddress;
  el.paymentHint.hidden = meta.payment !== 'Transferencia';
}

// Móvil: wa.me abre la app directo. Desktop: web.whatsapp.com evita la
// pantalla intermedia de WhatsApp y entra directo al chat.
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

function updateSend() {
  const needsAddress = meta.orderType === 'A domicilio';
  const valid = lines.length > 0 && (!needsAddress || meta.address.trim().length > 0);
  const text = encodeURIComponent(buildMessage());
  el.send.href = isMobile
    ? `https://wa.me/${WA_NUMBER}?text=${text}`
    : `https://web.whatsapp.com/send?phone=${WA_NUMBER}&text=${text}`;
  el.send.setAttribute('aria-disabled', valid ? 'false' : 'true');
}

/* ---------- mensaje ---------- */
// WhatsApp: *texto* = negrita. Un renglón por dato para que se lea bien.
function buildMessage(): string {
  const L: string[] = [];
  L.push('¡Buen día, La Patrona!');
  L.push('Quiero hacer este pedido:');
  L.push('');

  for (const line of lines) {
    const qty = line.qty > 1 ? ` ×${line.qty}` : '';
    L.push(`*${line.name}*${qty}`);
    // solo los platillos, sin etiquetas — el dueño ya sabe qué es una corrida
    for (const o of line.opts) {
      if (o.value) L.push(`  • ${o.value}`);
    }
    if (line.note) L.push(`  • Nota: ${line.note}`);
    L.push('');
  }

  L.push('━━━━━━━━━━');
  L.push(`*Entrega:* ${meta.orderType}`);
  if (meta.orderType === 'A domicilio' && meta.address.trim()) {
    L.push(`*Dirección:* ${meta.address.trim()}`);
  }
  L.push(`*Pago:* ${meta.payment}`);
  if (meta.name.trim()) L.push(`*A nombre de:* ${meta.name.trim()}`);
  L.push('');
  L.push('¡Gracias!');
  return L.join('\n');
}

/* ---------- drawer móvil ---------- */
const panel = $('[data-order-panel]')!;
const backdrop = $('[data-backdrop]')!;
let lastFocus: HTMLElement | null = null;

function openDrawer() {
  lastFocus = document.activeElement as HTMLElement;
  panel.dataset.open = '';
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  $<HTMLElement>('[data-close]', panel)?.focus();
  document.addEventListener('keydown', onEsc);
}
function closeDrawer() {
  delete panel.dataset.open;
  backdrop.hidden = true;
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onEsc);
  lastFocus?.focus();
}
function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') closeDrawer();
}

function pulseBar() {
  const bar = el.bar;
  if (!bar) return;
  bar.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
    { duration: 340, easing: 'cubic-bezier(0.25,1,0.5,1)' }
  );
}

/* ---------- accesibilidad: anuncios ---------- */
let liveRegion: HTMLElement;
function announce(msg: string) {
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = '';
  setTimeout(() => (liveRegion.textContent = msg), 50);
}

/* ---------- header al hacer scroll ---------- */
function initHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 12) header.dataset.scrolled = '';
    else delete header.dataset.scrolled;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- wiring ---------- */
function init() {
  load();

  // comida corrida + switch de vistas
  initSwitch();
  $('[data-corrida-add]')?.addEventListener('click', addComidaCorrida);

  // agregar al tocar el platillo (a la carta)
  $$('[data-dish]').forEach((card) => {
    $('[data-add]', card)?.addEventListener('click', () => addFromCard(card as HTMLElement));
  });

  // campos del pedido
  $$('[data-order-type] input').forEach((i) =>
    i.addEventListener('change', () => {
      meta.orderType = (i as HTMLInputElement).value;
      syncFields();
      updateSend();
      save();
    })
  );
  $$('[data-payment] input').forEach((i) =>
    i.addEventListener('change', () => {
      meta.payment = (i as HTMLInputElement).value;
      syncFields();
      updateSend();
      save();
    })
  );
  $('[data-address]')?.addEventListener('input', (e) => {
    meta.address = (e.target as HTMLTextAreaElement).value;
    const t = e.target as HTMLTextAreaElement;
    if (t.value.trim()) delete t.dataset.invalid;
    updateSend();
    save();
  });
  $('[data-cust-name]')?.addEventListener('input', (e) => {
    meta.name = (e.target as HTMLInputElement).value;
    updateSend();
    save();
  });

  // enviar: validar dirección
  el.send.addEventListener('click', (e) => {
    if (el.send.getAttribute('aria-disabled') === 'true') {
      e.preventDefault();
      const addr = $<HTMLTextAreaElement>('[data-address]');
      if (addr && meta.orderType === 'A domicilio' && !meta.address.trim()) {
        addr.dataset.invalid = '';
        el.addressHint.dataset.error = '';
        el.addressHint.textContent = 'Necesitamos tu dirección para llevártelo. 🚲';
        addr.focus();
      }
    }
  });

  // vaciar
  $('[data-clear]')?.addEventListener('click', () => {
    lines = [];
    render();
    save();
  });

  // drawer
  el.bar?.addEventListener('click', openDrawer);
  $('[data-close]', panel)?.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  initHeader();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
