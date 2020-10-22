import axios from 'axios';

chrome.runtime.onMessage.addListener(async function(req, sender, response) {
  if (req.type === 'json-request') {
    const { data: user } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    chrome.tabs.sendMessage(sender.tab.id, {type:'json-response', user });
  }
});
