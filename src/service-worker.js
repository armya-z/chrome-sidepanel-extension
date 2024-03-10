  
  function setupContextMenu() {
    chrome.contextMenus.create({
      id: 'define-word',
      title: 'Define',
      contexts: ['selection']
    });
  }
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'openSidePanel',
      title: 'Open side panel',
      contexts: ['all']
    });
    chrome.tabs.create({ url: 'page.html' });
  });
  chrome.contextMenus.onClicked.addListener((data, tab) => {

    chrome.storage.session.set({ lastWord: data.selectionText });
  

    chrome.sidePanel.open({ tabId: tab.id });
  });