import "./index.css";
import App from "./App";
const root = document.querySelector("#root");

(async () => {
  // ES2022 부터 Top-level await 기능 지원
  root!.appendChild(await App());
})();
console.log("TODO App", location.href);
