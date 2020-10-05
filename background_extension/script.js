const headerSearch = document.querySelector('#hf-header');
const button = document.createElement('button');
const div = document.createElement('div');
button.textContent = 'Run Test';
button.style.color = 'red';
button.style.margin = '4px';

button.onclick = () => {
  chrome.runtime.sendMessage({type:'json-request'});
};

chrome.runtime.onMessage.addListener(function (message, sender) {
 if (message.type === 'json-response') {
    chrome.storage.sync.set({ userJson: message.user });
 }
});
div.append(button);
headerSearch.after(div);
