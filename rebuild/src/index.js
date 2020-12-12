import React from "react";
import ReactDOM from "react-dom";

console.log("Hello World from index.js!");

export default ExtensionApp = () => {
  console.log("Hello World from index.js inside the ExtensionApp!");

  return <p>Hi</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <ExtensionApp />
  </React.StrictMode>,
  document.getElementById("root")
);
