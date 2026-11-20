const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

document.querySelector('#year').textContent = new Date().getFullYear();

const config = window.SITE_CONFIG || {};
const emailLink = document.querySelector('#contact-email');
if (config.contactEmail) {
  emailLink.textContent = config.contactEmail;
  emailLink.href = `mailto:${config.contactEmail}`;
}

document.querySelector('#feedback-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const owner = config.githubOwner?.trim();
  const repository = config.githubRepository?.trim();
  const name = data.get('name')?.trim() || 'A community member';
  const topic = data.get('topic');
  const message = data.get('message')?.trim();
  const status = document.querySelector('#form-status');

  if (!owner || !repository) {
    status.textContent = 'Feedback is not connected yet. The site administrator needs to add the GitHub repository details in config.js.';
    return;
  }

  const title = encodeURIComponent(`[Community feedback] ${topic}`);
  const body = encodeURIComponent(`**From:** ${name}\n\n**Topic:** ${topic}\n\n**Message:**\n${message}`);
  window.location.href = `https://github.com/${owner}/${repository}/issues/new?title=${title}&body=${body}&labels=community-feedback`;
});

let demoResidents;

async function loadDemoResidents() {
  if (demoResidents) return demoResidents;

  const response = await fetch('residents.xml?v=1', { cache: 'no-cache' });
  if (!response.ok) throw new Error('Resident data could not be loaded.');

  const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('Resident data is not valid XML.');

  demoResidents = Object.fromEntries(
    Array.from(xml.querySelectorAll('resident'), resident => [
      resident.getAttribute('address'),
      resident.getAttribute('passwordHash')
    ])
  );
  return demoResidents;
}

const signInDialog = document.querySelector('#sign-in-dialog');
const accountButton = document.querySelector('#account-button');
const signInView = document.querySelector('#sign-in-view');
const residentView = document.querySelector('#resident-view');
const residentAddress = document.querySelector('#resident-address');

function normalizeAddress(value) {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, ' ');
  const match = normalized.match(/^#?(\d+)\s+BLOK\s+([A-G])$/);
  return match ? `#${match[1]} BLOK ${match[2]}` : normalized;
}

function displayAddress(value) {
  return value.replace('BLOK', 'Blok');
}

async function hashPassword(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

function updateResidentView() {
  const sessionAddress = localStorage.getItem('bumiAsriResident');
  const signedIn = Boolean(sessionAddress);
  signInView.hidden = signedIn;
  residentView.hidden = !signedIn;
  accountButton.classList.toggle('signed-in', signedIn);
  accountButton.textContent = signedIn ? displayAddress(sessionAddress) : 'Resident sign in';
  if (signedIn) residentAddress.textContent = displayAddress(sessionAddress);
}

function openSignInDialog() {
  if (typeof signInDialog.showModal === 'function') {
    signInDialog.showModal();
  } else {
    signInDialog.setAttribute('open', '');
    signInDialog.classList.add('dialog-fallback');
  }
}

function closeSignInDialog() {
  if (typeof signInDialog.close === 'function') {
    signInDialog.close();
  } else {
    signInDialog.removeAttribute('open');
    signInDialog.classList.remove('dialog-fallback');
  }
}

accountButton.addEventListener('click', () => {
  updateResidentView();
  openSignInDialog();
});

document.querySelector('#dialog-close').addEventListener('click', closeSignInDialog);
signInDialog.addEventListener('click', (event) => {
  if (event.target === signInDialog) closeSignInDialog();
});

document.querySelector('#sign-in-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const address = normalizeAddress(data.get('address'));
  const passwordHash = await hashPassword(data.get('password'));
  const status = document.querySelector('#sign-in-status');

  let residents;
  try {
    residents = await loadDemoResidents();
  } catch (error) {
    status.textContent = 'The demonstration account file could not be loaded. Please refresh the page and try again.';
    return;
  }

  if (!residents[address] || residents[address] !== passwordHash) {
    status.textContent = 'The address or password is not recognised. Check the format or contact the community office.';
    return;
  }

  localStorage.setItem('bumiAsriResident', address);
  status.textContent = '';
  event.currentTarget.reset();
  updateResidentView();
});

document.querySelector('#sign-out-button').addEventListener('click', () => {
  localStorage.removeItem('bumiAsriResident');
  updateResidentView();
  closeSignInDialog();
});

updateResidentView();

