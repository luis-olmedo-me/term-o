// chrome.tabs.create({ url: "./public/main.html" });
const value = "console.log('funco?')";
chrome.storage.local.set({ myKey: value }, function () {
  console.log("Value is set to" + value);
});
