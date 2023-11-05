import App from "./App";
const root = document.querySelector("#root");

(async () => {
  root!.appendChild(await App());
})();
console.log("TODO App", location.href);
