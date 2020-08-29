const page = document.getElementsByTagName("body")[0];

const snackBarWrapper = document.createElement("div");
const snackBarWrapperStyle = snackBarWrapper.style;

snackBarWrapperStyle.color = "#fff";
snackBarWrapperStyle.backgroundColor = "#619c61";
snackBarWrapperStyle.position = "sticky";
snackBarWrapperStyle.width = "max-content";
snackBarWrapperStyle.padding = "10px 30px 10px";
snackBarWrapperStyle.borderRadius = "0 5px 5px 0";
snackBarWrapperStyle.marginTop = "20px";
snackBarWrapperStyle.boxShadow = "0px 0px 8px 1px #d6d6d6";

const titleText = document.createTextNode("title");
const messageText = document.createTextNode("wea message");
const title = document.createElement("span");
const message = document.createElement("p");

const titleStyle = title.style;
const messageStyle = message.style;

titleStyle.fontSize = 18;
titleStyle.fontWeight = "bold";

messageStyle.margin = 0;

title.appendChild(titleText);
message.appendChild(messageText);

snackBarWrapper.appendChild(title);
snackBarWrapper.appendChild(message);

page.appendChild(snackBarWrapper);
