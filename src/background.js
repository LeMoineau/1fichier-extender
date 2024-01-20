chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "pages/boarding/index.html",
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  chrome.tabs.get(tabId, (...args) => {
    console.log("salut", args);
  });
});
