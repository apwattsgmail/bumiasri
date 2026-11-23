const views = {
  overview: ['Overview', 'Your community at a glance.'],
  property: ['My property', 'Plot details, occupants, contributions and payment history.'],
  rules: ['Rules & regulations', 'Current rules, proposed amendments and enforcement records.'],
  committees: ['Committees', 'Representatives, responsibilities, meetings and decisions.'],
  funds: ['Community funds', 'Contributions, budgets, expenditure and reserves.'],
  security: ['Security', 'Incidents, alerts, visitors and patrol reports.'],
  maintenance: ['Maintenance & services', 'Roads, drainage, lighting, waste and contractors.'],
  reports: ['Reports & complaints', 'Report problems and track every response.'],
  decisions: ['Community decisions', 'Proposals, consultations, surveys and formal voting.'],
  development: ['Property & development', 'Undeveloped plots, construction rules and infrastructure impact.'],
  legal: ['Legal & governance', 'Constitution, permits, land matters and dispute resolution.'],
  access: ['User access', 'Manage portal users, roles and privileges.']
};

const demoAccounts = {
  'G 202': { password: 'rotti123', name: 'Rina Prasetyo', property: 'G 202 · Block G', role: 'resident' },
  'C 118': { password: 'melati123', name: 'Dewi Lestari', property: 'C 118 · Infrastructure committee', role: 'committee' },
  'AUDIT': { password: 'audit123', name: 'Independent Audit', property: 'Community-wide · Read only', role: 'auditor' },
  'ADMIN': { password: 'manage123', name: 'Portal Administrator', property: 'System-wide access', role: 'admin' }
};
const roleLabels = { resident: 'Resident', committee: 'Committee manager', auditor: 'Independent auditor', admin: 'Administrator' };
let currentAccount = null;

const translations = {
  'Resident portal':'Portal warga','Workspace':'Ruang kerja','Overview':'Ringkasan','My property':'Properti saya',
  'Secure resident portal · Demonstration':'Portal warga aman · Demonstrasi','Resident access':'Akses warga','Welcome back':'Selamat datang kembali',
  'Sign in with the account assigned to your property or management role.':'Masuk dengan akun yang ditetapkan untuk properti atau peran pengelolaan Anda.',
  'Login name':'Nama pengguna','Password':'Kata sandi','Sign in':'Masuk','Demonstration accounts':'Akun demonstrasi','Prototype access only.':'Hanya akses prototipe.',
  'Rules & regulations':'Peraturan & tata tertib','Committees':'Komite','Community funds':'Dana komunitas','Community':'Komunitas',
  'Security':'Keamanan','Maintenance & services':'Pemeliharaan & layanan','Reports & complaints':'Laporan & pengaduan',
  'Community decisions':'Keputusan komunitas','Property & development':'Properti & pembangunan','Legal & governance':'Hukum & tata kelola',
  'Illustrative portal':'Portal ilustratif','Sample figures and records are clearly marked throughout.':'Angka dan catatan contoh ditandai dengan jelas.',
  'Resident profile':'Profil warga','Language':'Bahasa','Select language':'Pilih bahasa','Search':'Cari','Notifications':'Notifikasi',
  '+ Report an issue':'+ Laporkan masalah','Sunday, 22 November 2026':'Minggu, 22 November 2026','Monday, 23 November 2026':'Senin, 23 November 2026','Good morning, Rina.':'Selamat pagi, Rina.',
  'Here’s what’s happening across Bumi Asri.':'Berikut perkembangan terbaru di Bumi Asri.','Illustrative community data':'Data komunitas ilustratif',
  'Community fund':'Dana komunitas','Available balance':'Saldo tersedia','from last month':'dari bulan lalu','Open issues':'Masalah terbuka',
  'Across the community':'Di seluruh komunitas','awaiting action':'menunggu tindakan','resolved this week':'selesai minggu ini',
  'Active proposals':'Usulan aktif','Open for participation':'Terbuka untuk partisipasi','1 open for voting':'1 terbuka untuk pemungutan suara',
  '4 days left':'tersisa 4 hari','My contributions':'Iuran saya','Up to date':'Lunas','Next due: 1 December 2026':'Jatuh tempo berikutnya: 1 Desember 2026',
  'View payment history':'Lihat riwayat pembayaran','Report':'Lapor','Issue or complaint':'Masalah atau pengaduan','Pay':'Bayar',
  'Community contribution':'Iuran komunitas','Vote':'Pilih','1 proposal open':'1 usulan terbuka','Rules':'Peraturan','View current rules':'Lihat peraturan berlaku',
  'Latest activity':'Aktivitas terbaru','Community updates':'Pembaruan komunitas','View all updates':'Lihat semua pembaruan','Infrastructure':'Infrastruktur',
  'Drainage improvement proposal':'Usulan perbaikan drainase','Review the proposed drainage works, estimated budget and funding options for Blocks B–D.':'Tinjau rencana pekerjaan drainase, perkiraan anggaran, dan pilihan pendanaan untuk Blok B–D.',
  'responses':'tanggapan','Consultation open':'Konsultasi terbuka','Maintenance':'Pemeliharaan','Streetlights repaired — Block C':'Lampu jalan diperbaiki — Blok C',
  'Six streetlights repaired. Completion photographs and expenditure are available.':'Enam lampu jalan telah diperbaiki. Foto penyelesaian dan pengeluaran tersedia.',
  'final cost':'biaya akhir','Completed':'Selesai','Your voice matters':'Suara Anda penting','Vote now':'Berikan suara',
  'Adopt the 2027 community budget?':'Setujui anggaran komunitas 2027?','Review the proposed operating budget before casting your vote.':'Tinjau rancangan anggaran operasional sebelum memberikan suara.',
  'participation':'partisipasi','properties':'properti','Review and vote':'Tinjau dan pilih','Coming up':'Akan datang','Next meeting':'Pertemuan berikutnya',
  'General Assembly':'Rapat Umum','Community Hall & online':'Balai komunitas & daring','View agenda':'Lihat agenda','Add to calendar':'Tambahkan ke kalender',
  'Coming up · Schedule changed':'Akan datang · Jadwal berubah','Public hearing with Commission D':'RDP dengan Komisi D','DPRD North Sumatra Province':'DPRD Provinsi Sumatera Utara',
  'Commission D meeting room':'Ruang rapat Komisi D','DPRD Provsu Building, Jl. Imam Bonjol, Medan':'Gedung DPRD Provsu, Jl. Imam Bonjol, Medan',
  'Discussion of residents’ request concerning unauthorized buildings over the northern drainage channel and PJKA land.':'Pembahasan surat permohonan warga terkait penertiban bangunan liar di atas parit sisi utara kompleks dan bangunan di atas tanah PJKA.',
  'View details & attendee list':'Lihat detail & daftar hadir','14 registered':'14 orang terdaftar',
  'Project ledger · In progress':'Buku besar proyek · Berjalan','Drainage Improvement — Phase 1':'Perbaikan Drainase — Tahap 1','View full ledger':'Lihat buku besar lengkap',
  'Approved budget':'Anggaran disetujui','Spent to date':'Pengeluaran hingga kini','60% of budget spent':'60% anggaran terpakai','remaining':'tersisa',
  'Transparent by design':'Transparan sejak awal','Follow every rupiah from contribution to approval and completion.':'Lacak setiap rupiah dari iuran hingga persetujuan dan penyelesaian.',
  'Download statement':'Unduh laporan','Collected in 2026':'Terkumpul pada 2026','Total expenditure':'Total pengeluaran','Reserve fund':'Dana cadangan','Outstanding':'Tunggakan',
  'Contribution model':'Model iuran','Explore a fair monthly charge':'Jelajahi iuran bulanan yang adil','See how the proposed hybrid model affects properties of different sizes.':'Lihat dampak model hibrida yang diusulkan pada properti berbagai ukuran.',
  'Plot area':'Luas lahan','Basic charge':'Biaya dasar','Area charge':'Biaya luas','Monthly total':'Total bulanan','Audit trail':'Jejak audit','Recent transactions':'Transaksi terbaru',
  'View ledger':'Lihat buku besar','November contributions':'Iuran November','Draft framework · Resident consultation':'Kerangka rancangan · Konsultasi warga',
  'Rules & governance':'Peraturan & tata kelola','Build legitimate community rules openly, chapter by chapter.':'Bangun peraturan komunitas yang sah secara terbuka, bab demi bab.',
  'Join consultation':'Ikuti konsultasi','Community Rules':'Peraturan Komunitas','Tata Tertib · everyday standards':'Tata Tertib · standar sehari-hari',
  'Community Constitution':'Konstitusi Komunitas','AD–ART · authority and decisions':'AD–ART · kewenangan dan keputusan','Foundational decision':'Keputusan mendasar',
  'What kind of association should Bumi Asri become?':'Perkumpulan seperti apa yang sebaiknya dibentuk Bumi Asri?',
  'This choice determines how contributions, voting, enforcement and vacant plots can be governed.':'Pilihan ini menentukan cara mengatur iuran, pemungutan suara, penegakan, dan lahan kosong.',
  'Democratic association':'Perkumpulan demokratis','Voluntary organization':'Organisasi sukarela','Explore this path':'Pelajari jalur ini','Proposed structure':'Struktur usulan',
  '15 chapters for resident review':'15 bab untuk ditinjau warga','0 of 15 adopted':'0 dari 15 disahkan','All chapters':'Semua bab','Essential':'Esensial','Important':'Penting',
  'General provisions':'Ketentuan umum','Community governance':'Tata kelola komunitas','Financial contributions':'Iuran komunitas','Financial transparency':'Transparansi keuangan',
  'Roads and parking':'Jalan dan parkir','Construction':'Konstruksi','Vacant plots':'Lahan kosong','Drainage and flooding':'Drainase dan banjir','Environment':'Lingkungan',
  'Neighbourhood conduct':'Ketertiban lingkungan','Communal facilities':'Fasilitas bersama','Complaints and disputes':'Pengaduan dan sengketa','Enforcement':'Penegakan','Amendments':'Perubahan',
  'Priority provisions':'Ketentuan prioritas','Built for Bumi Asri':'Dirancang untuk Bumi Asri','Vacant land':'Lahan kosong','Financial integrity':'Integritas keuangan',
  'Reference library':'Pustaka referensi','Examples to examine':'Contoh untuk dikaji','Primary Indonesian reference':'Referensi utama Indonesia','Practical community handbook':'Panduan komunitas praktis',
  'Resident and security procedures':'Prosedur warga dan keamanan','Track every response':'Lacak setiap tanggapan','Submit an issue, see who owns it, and follow it through resolution.':'Laporkan masalah, lihat penanggung jawabnya, dan ikuti hingga terselesaikan.',
  '+ New report':'+ Laporan baru','All 23':'Semua 23','Awaiting action 7':'Menunggu tindakan 7','In progress 11':'Berjalan 11','Resolved 5':'Selesai 5',
  'Clear roles, visible accountability':'Peran jelas, akuntabilitas terlihat','Representatives, mandates, decisions and delivery in one place.':'Perwakilan, mandat, keputusan, dan pelaksanaan dalam satu tempat.',
  'View decision register':'Lihat daftar keputusan','General Assembly of Property Owners':'Rapat Umum Pemilik Properti','Elected Management Committee':'Komite Pengelola Terpilih',
  'Independent Oversight & Audit':'Pengawasan & Audit Independen','Security & Safety':'Keamanan & Keselamatan','Infrastructure & Maintenance':'Infrastruktur & Pemeliharaan',
  'Finance & Administration':'Keuangan & Administrasi','Community & Legal':'Komunitas & Hukum','This module is ready for community data.':'Modul ini siap menerima data komunitas.',
  'Return to overview':'Kembali ke ringkasan','Tell us what needs attention':'Beri tahu kami apa yang perlu ditangani','Category':'Kategori','Priority':'Prioritas','Description':'Deskripsi',
  'Submit report':'Kirim laporan','Formal vote · closes 26 November':'Pemungutan suara resmi · ditutup 26 November','Support proposal':'Dukung usulan','Oppose proposal':'Tolak usulan','Abstain':'Abstain'
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();
let currentLanguage = localStorage.getItem('bumiAsriLanguage') || 'id';

function applyLanguage(language) {
  currentLanguage = language;
  localStorage.setItem('bumiAsriLanguage', language);
  document.documentElement.lang = language;
  document.title = language === 'id' ? 'Bumi Asri · Portal Warga' : 'Bumi Asri · Resident Portal';
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) continue;
    const translated = language === 'id' ? translations[trimmed] : null;
    node.nodeValue = translated ? source.replace(trimmed, translated) : source;
  }
  document.querySelectorAll('[aria-label], [placeholder]').forEach(element => {
    if (!originalAttributes.has(element)) originalAttributes.set(element, {
      ariaLabel: element.getAttribute('aria-label'), placeholder: element.getAttribute('placeholder')
    });
    const originals = originalAttributes.get(element);
    ['ariaLabel','placeholder'].forEach(key => {
      const attr = key === 'ariaLabel' ? 'aria-label' : 'placeholder';
      const value = originals[key];
      if (!value) return;
      element.setAttribute(attr, language === 'id' && translations[value] ? translations[value] : value);
    });
  });
  if (currentAccount) {
    const firstName = currentAccount.name.split(' ')[0];
    document.querySelector('#dashboard-greeting').textContent = language === 'id' ? `Selamat pagi, ${firstName}.` : `Good morning, ${firstName}.`;
  }
  document.querySelectorAll('#language-select, #login-language-select').forEach(selector => selector.value = language);
}

const sidebar = document.querySelector('#sidebar');
const viewName = document.querySelector('#view-name');
const genericTitle = document.querySelector('#generic-title');
const genericDescription = document.querySelector('#generic-description');

function showView(name) {
  if (name === 'access' && currentAccount?.role !== 'admin') {
    showSuccess('Access restricted', 'Only administrators can manage users and privileges.');
    return;
  }
  const selected = views[name] || views.overview;
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === name));
  const dedicated = document.querySelector(`#${name}-view`);
  if (dedicated) dedicated.classList.add('active');
  else {
    genericTitle.textContent = selected[0];
    genericDescription.textContent = selected[1];
    document.querySelector('#generic-view').classList.add('active');
  }
  viewName.textContent = currentLanguage === 'id' && translations[selected[0]] ? translations[selected[0]] : selected[0];
  sidebar.classList.remove('open');
  document.querySelector('#menu-button').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelector('#menu-button').addEventListener('click', event => {
  const open = sidebar.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});

const dialog = document.querySelector('#action-dialog');
const dialogContent = document.querySelector('#dialog-content');
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

function openTemplate(id) {
  dialogContent.replaceChildren(document.querySelector(id).content.cloneNode(true));
  applyLanguage(currentLanguage);
  dialog.showModal();
}

function showSuccess(title, message) {
  dialogContent.innerHTML = `<div class="success"><span class="success-mark">✓</span><h2>${title}</h2><p>${message}</p><button class="primary" type="button" id="success-close">Done</button></div>`;
  applyLanguage(currentLanguage);
  document.querySelector('#success-close').addEventListener('click', () => dialog.close());
}

document.addEventListener('click', event => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (currentAccount?.role === 'auditor' && ['report','pay','vote','rules-consultation'].includes(action)) {
    showSuccess('Read-only access', 'Independent auditors can inspect records but cannot submit, vote, pay, or alter community operations.');
    return;
  }
  if (action === 'report') {
    openTemplate('#report-template');
    document.querySelector('#report-form').addEventListener('submit', submitEvent => {
      submitEvent.preventDefault();
      showSuccess('Report BA-1048 created', 'The Infrastructure & Maintenance Committee has been notified. You can track each response from Reports & complaints.');
    });
  } else if (action === 'vote') {
    openTemplate('#vote-template');
    document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      showSuccess('Choice recorded for review', `You selected “${button.dataset.choice}”. A production portal would verify your identity before the vote is formally cast.`);
    }));
  } else if (action === 'pay') {
    dialogContent.innerHTML = '<div class="success"><span class="success-mark">₨</span><h2>No payment due</h2><p>Your contributions are up to date. The next illustrative charge of Rp 150,000 is due on 1 December 2026.</p><button class="primary" id="success-close">View contribution history</button></div>';
    dialog.showModal();
    document.querySelector('#success-close').addEventListener('click', () => { dialog.close(); showView('property'); });
  } else if (action === 'rdp-event') {
    dialogContent.innerHTML = '<div class="event-dialog"><p class="eyebrow">RDP · Jadwal dipercepat</p><h2>Rapat Dengar Pendapat dengan Komisi D</h2><div class="event-details"><span><b>Kamis, 26 November 2026</b><small>14.00 WIB</small></span><span><b>Ruang Rapat Komisi D</b><small>Gedung DPRD Provsu, Jl. Imam Bonjol, Medan</small></span></div><p>Pembahasan surat permohonan warga mengenai penertiban bangunan liar di atas parit sisi utara kompleks serta bangunan di atas tanah PJKA.</p><h3>Daftar warga yang akan hadir</h3><ol class="attendee-list"><li>Zainuddin Nst.</li><li>Fakhruddin Hrp.</li><li>Hariadi</li><li>Dody Taher</li><li>Jhoni Siregar</li><li>Eka Haitami</li><li>Yakris Rangkuti</li><li>Ucok Herman / Pengelola</li><li>Raidir Sigalingging</li><li>Industrial Silaban</li><li>Yohannes Samosir</li><li>Edy Surahman</li><li>Zulkifli Harahap, S.H., M.H. — E.81/E.82</li><li>MER Simanjuntak — G.112</li></ol><p class="fine-print">Warga yang berkenan hadir dapat menghubungi pengelola untuk penambahan nama pada daftar.</p></div>';
    dialog.showModal();
  } else if (action === 'rules-consultation') {
    dialogContent.innerHTML = '<div class="vote-dialog"><p class="eyebrow">Resident consultation</p><h2>Choose a starting direction</h2><p>This is an indicative consultation, not a binding vote. Formal adoption requires verified eligibility, published notice and an agreed approval threshold.</p><div class="vote-options"><button data-consultation="Democratic association">Democratic association</button><button data-consultation="Voluntary phased start">Voluntary phased start</button><button data-consultation="Need more information">Need more information</button></div><p class="fine-print">Responses should be published in aggregate without identifying individual residents.</p></div>';
    dialog.showModal();
    document.querySelectorAll('[data-consultation]').forEach(button => button.addEventListener('click', () => showSuccess('Response noted', `You selected “${button.dataset.consultation}”. The consultation summary will show aggregate responses.`)));
  } else {
    showView(action);
  }
});

const slider = document.querySelector('#area-slider');
if (slider) slider.addEventListener('input', () => {
  const area = Number(slider.value);
  const areaCharge = area * 200;
  const format = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value).replace('IDR', 'Rp');
  document.querySelector('#area-output').textContent = `${area} m²`;
  document.querySelector('#area-charge').textContent = format(areaCharge);
  document.querySelector('#monthly-total').textContent = format(100000 + areaCharge);
});

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
}));

document.querySelectorAll('[data-rule-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.ruleFilter;
  document.querySelectorAll('[data-rule-filter]').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('.chapter').forEach(chapter => {
    chapter.hidden = filter !== 'all' && chapter.dataset.importance !== filter;
  });
}));

document.querySelectorAll('.document-switcher button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.document-switcher button').forEach(item => item.classList.toggle('active', item === button));
  if (button.textContent.includes('Constitution')) {
    showSuccess('Constitution workspace', 'The AD–ART track will define membership, voting rights, committee powers, finances and amendment procedures separately from day-to-day community rules.');
  }
}));

document.querySelector('#account-button').addEventListener('click', () => {
  if (!currentAccount) return;
  dialogContent.innerHTML = `<div class="vote-dialog"><p class="eyebrow">Signed-in account</p><h2>${currentAccount.name}</h2><p>${currentAccount.property}</p><div class="proposal-summary"><span>Management level <b>${roleLabels[currentAccount.role]}</b></span><span>Account status <b>Active</b></span></div><p class="fine-print">This demonstration stores only the signed-in username on this device. Production authorization must be enforced on the server.</p><button class="secondary full" id="logout-button">Sign out</button></div>`;
  dialog.showModal();
  document.querySelector('#logout-button').addEventListener('click', signOut);
});

function normalizeLogin(value) {
  return value.trim().toUpperCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
}

function getRoleOverrides() {
  return JSON.parse(localStorage.getItem('bumiAsriRoleOverrides') || '{}');
}

function applyAccount(username) {
  const base = demoAccounts[username];
  if (!base) return;
  const role = getRoleOverrides()[username] || base.role;
  currentAccount = { username, ...base, role };
  document.querySelector('#auth-gate').hidden = true;
  document.querySelector('.app-shell').dataset.role = role;
  document.querySelector('#profile-name').textContent = currentAccount.name;
  document.querySelector('#profile-property').textContent = currentAccount.property;
  document.querySelector('#profile-role').textContent = roleLabels[role];
  document.querySelector('#profile-initials').textContent = currentAccount.name.split(' ').map(part => part[0]).join('').slice(0, 2);
  const firstName = currentAccount.name.split(' ')[0];
  document.querySelector('#dashboard-greeting').textContent = currentLanguage === 'id' ? `Selamat pagi, ${firstName}.` : `Good morning, ${firstName}.`;
  document.querySelectorAll('[data-action="report"],[data-action="pay"],[data-action="vote"],[data-action="rules-consultation"]').forEach(button => {
    button.disabled = role === 'auditor';
    button.title = role === 'auditor' ? 'Read-only auditor access' : '';
  });
  if (role !== 'admin' && document.querySelector('#access-view').classList.contains('active')) showView('overview');
  applyLanguage(currentLanguage);
}

function signOut() {
  localStorage.removeItem('bumiAsriSession');
  currentAccount = null;
  dialog.close();
  document.querySelector('#auth-gate').hidden = false;
  document.querySelector('#login-form').reset();
  document.querySelector('#login-error').textContent = '';
  showView('overview');
}

document.querySelector('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const username = normalizeLogin(data.get('username'));
  const account = demoAccounts[username];
  if (!account || data.get('password') !== account.password) {
    document.querySelector('#login-error').textContent = 'Login name or password is incorrect.';
    return;
  }
  localStorage.setItem('bumiAsriSession', username);
  document.querySelector('#login-error').textContent = '';
  applyAccount(username);
});

document.querySelectorAll('[data-demo-user]').forEach(select => select.addEventListener('change', () => {
  if (currentAccount?.role !== 'admin') return;
  const roleByLabel = Object.fromEntries(Object.entries(roleLabels).map(([key, value]) => [value, key]));
  const overrides = getRoleOverrides();
  overrides[select.dataset.demoUser] = roleByLabel[select.value];
  localStorage.setItem('bumiAsriRoleOverrides', JSON.stringify(overrides));
  if (select.dataset.demoUser === currentAccount.username) applyAccount(currentAccount.username);
}));

document.querySelector('#add-user-button').addEventListener('click', () => {
  showSuccess('User creation prepared', 'Production setup will require identity verification, property matching, an initial role, and an auditable administrator approval.');
});

document.querySelector('#language-select').addEventListener('change', event => applyLanguage(event.target.value));
document.querySelector('#login-language-select').addEventListener('change', event => applyLanguage(event.target.value));
applyLanguage(currentLanguage);
const savedSession = localStorage.getItem('bumiAsriSession');
if (savedSession && demoAccounts[savedSession]) applyAccount(savedSession);

