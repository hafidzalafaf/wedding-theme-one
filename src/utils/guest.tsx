import   { useEffect } from 'react';

const Guest = () => {
  useEffect(() => {
    const name = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('to')
    : null
    const guest = document.getElementById('guest-name');

    if (!guest) return;

    if (!name) {
      guest.remove();
      return;
    }

    const div = document.createElement('div');
    div.classList.add('m-2');

    div.innerHTML = `
      <p class="mt-0 mb-1 mx-0 p-0 text-dark">${guest.getAttribute('data-message')}</p>
      <p class="text-brown text-center fs-5">"${escapeHtml(name)}"</p>
    `;

    guest.appendChild(div);
  }, []);

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return <div id="guest-name" data-message="Welcome, dear guest!" />;
};

export default Guest;
