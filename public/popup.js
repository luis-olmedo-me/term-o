const mainPageButton = document.getElementById("mainPageLink");

mainPageButton.onclick = () =>
  chrome.tabs.create({ url: "./public/main.html" });

function Script({ text = "script", callback }) {
  const scriptContainer = document.createElement("div");
  scriptContainer.classList = ["script-option"];

  const scriptButton = document.createElement("button");
  scriptButton.onclick = callback;

  const textNode = document.createTextNode(text);
  scriptButton.appendChild(textNode);

  scriptContainer.appendChild(scriptButton);

  return scriptContainer;
}

const scripts = document.getElementById("scripts");

chrome.storage.local.get(["myKey"], function (result) {
  console.log("Value currently is " + JSON.stringify(result));

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    const callback = () =>
      chrome.tabs.sendMessage(activeTab.id, {
        message: "sorete",
        customCode: result.myKey,
      });

    scripts.appendChild(Script({ text: "hola", callback }));
  });
});
