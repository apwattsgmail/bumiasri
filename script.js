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

