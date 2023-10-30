import TodoList from './pages/list/TodoList.js';
import TodoRegist from './pages/regist/TodoRegist.js';
import TodoInfo from './pages/info/TodoInfo.js';

async function getPage(){
  let page;
  console.log(location);
  switch(location.pathname){
    case '/':
      page = await TodoList();
      break;
    case '/regist':
      page = TodoRegist();
      break;
    case '/info':
      page = await TodoInfo();
      break;
  }

  return page;
}

async function render(){
  const page = await getPage();
  document.querySelector('#page').replaceWith(page);
}

window.addEventListener('popstate', render);

export function linkTo(url){
  history.pushState({}, 'todo', url);
  render();
}

const Router = async function(){
  return await getPage();
};

export default Router;