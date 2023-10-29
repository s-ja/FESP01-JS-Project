import TodoList from './pages/list/TodoList.js';

const App = async function(){
  const content = document.createElement('div');
  content.setAttribute('id', 'app');
  content.appendChild(await TodoList());
  return content;
};

export default App;