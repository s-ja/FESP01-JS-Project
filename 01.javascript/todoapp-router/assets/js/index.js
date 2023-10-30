import App from './App.js';
const root = document.querySelector('#root');

root.appendChild(await App());
console.log('TODO App', location.href);