import openDevToolsWindow from './openWindow';

export const createMenu = () => {
  const menus = [
    { id: 'fill-form', title: 'Fill form' },
    { id: 'something-else', title: 'Something else' },
  ];

  menus.forEach(({ id, title }) => {
    chrome.contextMenus.create({
      id: id,
      title: title,
      contexts: ['all'],
    });
  });
}

export const removeMenu = () => {
  chrome.contextMenus.removeAll();
}

chrome.contextMenus.onClicked.addListener(({ menuItemId }) => {
  openDevToolsWindow(menuItemId);
});
