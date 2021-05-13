import { FILL_FORM, FETCH_DATA } from "../../constants";

console.log('Bol extension v' + 5)
const ports = {};

const menus = [
  { id: 'fill-form', title: 'Fill form' },
  { id: 'fetch-data', title: 'Fetch data' },
];

const updateContextMenuItem = (tabId) => {
  chrome.contextMenus.removeAll(() => {
    // If this background page does not have an open connection with the current tab (current tab is not one of krantnl domains),
    // then just clean up the devtools context menu and bail
    if (!ports[tabId]) return;
    // Base menu item

    menus.forEach(({ id, title }) => {
      chrome.contextMenus.create({
        id: id,
        title: title,
        contexts: ['all'],
      });
    });
  });
}

const user = {
  login: 'test@test.com',
  password: 'password'
}

const onContextMenuClicked = async (info, tab) => {
  if (!ports[tab.id]) return;

  if (info.menuItemId.startsWith('fill-form')) {
    ports[tab.id].postMessage({ type: FILL_FORM, payload: user });
  }

  if (info.menuItemId.startsWith('fetch-data')) {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const payload = await res.json()
    ports[tab.id].postMessage({ type: FETCH_DATA, payload });
  }
}

const onPortClosed = (...args) => {
  console.log('port closed with ', args)
}

chrome.contextMenus.onClicked.addListener(onContextMenuClicked);

// Called when a tab connects to this background page
chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(onPortClosed);
  const tab = port.sender.tab.id;
  ports[tab] = port;
  updateContextMenuItem(tab);
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  updateContextMenuItem(tabId);
});

const fetchSomeData = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const payload = await res.json()
  return payload
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === FETCH_DATA) {
    fetchSomeData().then(sendResponse);
    return true;
  }
});