import header from './layout/header.js';
import todolist from './pages/list/todolist.js';
import footer from './layout/footer.js';

const app = async function(){
  const div = document.createElement('div');
  div.appendChild(header('TODO List 목록 조회'));
  div.appendChild(await todolist());
  div.appendChild(footer());
  return div;
};

export default app;