// Data derived from the wireframe you provided. (dates and locations follow the example)
const festivals = [
  { id:1, title:'EastRand Kota Festival', date:'2025-03-01', location:'Emperiors place, Keption Park', region:'Gauteng', price:'R150', desc:'Food, music and family fun.' },
  { id:2, title:'Jozi Kota Festival', date:'2025-04-13', location:'The Station ZA, Newtown', region:'Gauteng', price:'R150', desc:'Street food & performances.' },
  { id:3, title:'Mpumalanga Kota Festival', date:'2025-05-03', location:'Botanical Garden, Nelspruit', region:'Mpumalanga', price:'R150', desc:'Local chefs & artists.' },
  { id:4, title:'Ethekweni Kota Festival', date:'2025-08-02', location:'Kings Park Stadium, Durban', region:'KwaZulu-Natal', price:'R150', desc:'Coastal vibes & music.' },
  { id:5, title:'Vaal Kota Festival', date:'2025-08-30', location:'Emerald Resort & Casino, Vaal', region:'Free State', price:'R150', desc:'Family-friendly activities.' },
  { id:6, title:'CapeTown Kota Festival', date:'2025-09-06', location:'Castle of Good Hope, Cape Town', region:'Western Cape', price:'R150', desc:'Cultural showcases.' },
  { id:7, title:'Eswatini Kota Festival', date:'2025-09-26', location:'Malkerns Country Club, Eswatini', region:'Eswatini', price:'E120', desc:'Cross-border celebration.' },
  { id:8, title:'Jozi Kota Festival (FNB Stadium)', date:'2025-10-04', location:'FNB Stadium, Johannesburg', region:'Gauteng', price:'R200', desc:'Big stage performances.' },
  { id:9, title:'FreeState Kota Festival', date:'2025-10-25', location:'Botanical Gardens, Bloemfontein', region:'Free State', price:'R120', desc:'Local flavors.' },
  { id:10, title:'Lesotho Kota Festival', date:'2025-11-01', location:'Maseru Country Club, Lesotho', region:'Lesotho', price:'L50', desc:'Border region festival.' },
  { id:11, title:'Pitori Kota Festival', date:'2025-11-29', location:'Fountains Valley, Pretoria', region:'Gauteng', price:'R150', desc:'Pretoria edition.' },
  { id:12, title:'Tembisa Kota Festival', date:'2025-12-06', location:'Transnet School of Rail, Esselen Park Tembisa', region:'Gauteng', price:'R150', desc:'Community event.' }
];

const festivalsGrid = document.getElementById('festivalsGrid');
const ticketsGrid = document.getElementById('ticketsGrid');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

function formatDate(iso){
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { day:'2-digit', month:'short', year:'numeric' });
}

function renderFestivals(list){
  festivalsGrid.innerHTML = '';
  list.forEach(f => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb">${f.title.split(' ')[0]}</div>
      <h4>${f.title}</h4>
      <div class="meta">${formatDate(f.date)} • ${f.location}</div>
      <p style="color:var(--muted);margin:0.25rem 0">${f.desc}</p>
      <div class="actions">
        <button class="btn-sm btn-outline" data-id="${f.id}" onclick="learnMore(${f.id})">Learn More</button>
        <button class="btn-sm btn-primary" data-id="${f.id}" onclick="openTicketModal(${f.id})">Buy Ticket</button>
      </div>
    `;
    festivalsGrid.appendChild(card);
  });
}

function renderTickets(list){
  ticketsGrid.innerHTML = '';
  list.forEach(f => {
    const tk = document.createElement('div');
    tk.className = 'ticket-card';
    tk.innerHTML = `
      <strong>${f.title}</strong>
      <div class="price">Tickets from ${f.price}</div>
      <div>${formatDate(f.date)}</div>
      <div style="margin-top:.5rem">
        <button class="btn-sm btn-primary" onclick="openTicketModal(${f.id})">Buy Ticket</button>
      </div>
    `;
    ticketsGrid.appendChild(tk);
  });
}

/* initial render */
renderFestivals(festivals);
renderTickets(festivals);

/* search/filter */
function filterFestivals(){
  const q = searchInput.value.trim().toLowerCase();
  const region = locationFilter.value;
  const filtered = festivals.filter(f => {
    const inRegion = region === 'all' ? true : f.region.toLowerCase().includes(region.toLowerCase());
    const matchesQ = q === '' ? true :
      (f.title + ' ' + f.location + ' ' + f.date).toLowerCase().includes(q);
    return inRegion && matchesQ;
  });
  renderFestivals(filtered);
  renderTickets(filtered);
}

searchBtn.addEventListener('click', filterFestivals);
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  locationFilter.value = 'all';
  renderFestivals(festivals);
  renderTickets(festivals);
});

/* simple "learn more" popup using alert (replace with a richer modal if needed) */
function learnMore(id){
  const f = festivals.find(x=>x.id===id);
  if(!f) return;
  alert(`${f.title}\n\nDate: ${formatDate(f.date)}\nLocation: ${f.location}\n\n${f.desc}`);
}

/* nav toggle for small screens */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const visible = mainNav.style.display === 'block';
  mainNav.style.display = visible ? '' : 'block';
});

/* CONTACT form (local demo only) */
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // for demo we just show a success message. Replace with email backend or form handler when ready.
  contactStatus.textContent = 'Thanks! Your message has been received — we will contact you soon.';
  contactForm.reset();
});
document.getElementById('contactClear').addEventListener('click', () => {
  contactForm.reset();
  contactStatus.textContent = '';
});

/* Ticket modal logic (local simulation) */
const ticketModal = document.getElementById('ticketModal');
const modalDesc = document.getElementById('modalDesc');
const ticketForm = document.getElementById('ticketForm');
const ticketQty = document.getElementById('ticketQty');
const purchaseStatus = document.getElementById('purchaseStatus');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');

function openTicketModal(id){
  const f = festivals.find(x=>x.id===id);
  if(!f) return;
  ticketModal.setAttribute('aria-hidden','false');
  modalDesc.textContent = `${f.title} — ${formatDate(f.date)} • ${f.location} — Price: ${f.price}`;
  purchaseStatus.textContent = '';
  ticketQty.value = 1;
  ticketForm.dataset.eventId = f.id;
  document.body.style.overflow = 'hidden';
}

function closeTicketModal(){
  ticketModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeTicketModal);
modalCancel.addEventListener('click', closeTicketModal);
ticketModal.addEventListener('click', (e) => {
  if(e.target === ticketModal) closeTicketModal();
});

ticketForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Number(ticketForm.dataset.eventId);
  const qty = Number(ticketQty.value) || 1;
  const f = festivals.find(x=>x.id===id);
  // simulate a successful purchase
  purchaseStatus.style.color = 'green';
  purchaseStatus.textContent = `Success! You purchased ${qty} ticket(s) for ${f.title}. A confirmation email would be sent (demo).`;
  setTimeout(closeTicketModal, 2000);
});

/* Expose some functions for inline onclick usage */
window.openTicketModal = openTicketModal;
window.learnMore = learnMore;


