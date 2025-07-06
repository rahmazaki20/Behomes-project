
  const registerBtn = document.querySelector('.register-button');
  const popup = document.getElementById('contact-popup');

  registerBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent link default
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });

  function closePopup() {
    popup.style.display = 'none';
    document.body.style.overflow = ''; // re-enable scroll
  }

