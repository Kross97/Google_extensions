const button = document.querySelector('#get');

button.onclick = () => {
  chrome.storage.sync.get(['userJson'], ({ userJson }) => {
    const paragraphError = document.querySelector('#error');
    const paragraphId = document.querySelector('#idUser');
    const paragraphTitle = document.querySelector('#titleUser');
    if (!userJson) {
      paragraphId.textContent = 'undefined';
      paragraphTitle.textContent = 'undefined';
      paragraphError.style.display = 'block';
    } else {
      paragraphId.textContent = userJson.id;
      paragraphTitle.textContent = userJson.title;
      paragraphError.style.display = 'none';
    }
  });

  chrome.storage.sync.remove(['userJson']);
};
