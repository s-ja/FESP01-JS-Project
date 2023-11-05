import Router from "./Router";

const App = async function () {
  const content = document.createElement("div");
  content.setAttribute("id", "app");
  content.appendChild(await Router());
  return content;
};

export default App;
