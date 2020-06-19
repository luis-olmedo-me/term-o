const mainPageButton = document.getElementById("mainPageLink");

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });
