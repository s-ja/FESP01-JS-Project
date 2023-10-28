import header from './layout/header.js';
import todoList from './pages/list/todoList.js';
import footer from './layout/footer.js';

const app = async function(){
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  div.appendChild(header('TODO List 목록 조회'));
  div.appendChild(await todoList());
  div.appendChild(footer());
  return div;
};

export default app;