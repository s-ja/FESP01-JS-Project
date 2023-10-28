// 할일 목록
import todoRegist from '../regist/todoRegist.js';
const todoList = async function(){
  const todolistNode = document.createElement('div');
  todolistNode.setAttribute('id', 'content');
  let response;
  try{    
    response = await axios('http://localhost:33088/api/todolist');

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todolist');
    response.data?.items.forEach(item => {
      const li = document.createElement('li');
      const title = document.createTextNode(item.title);
      li.appendChild(title);
      ul.appendChild(li);
    });
    todolistNode.appendChild(ul);    

    const btnRegist = document.createElement('button');
    const btnTitle = document.createTextNode('등록');
    btnRegist.appendChild(btnTitle);
    todolistNode.appendChild(btnRegist);

    btnRegist.addEventListener('click', () => {
      const todoRegistNode = todoRegist();
      const headerTitle = document.querySelector('header > h1');
      headerTitle.innerHTML = 'TODO List 등록';      
      const container = document.querySelector('#container');
      todolistNode.remove();
      container.insertBefore(todoRegistNode, document.querySelector('footer'));      
    });

  }catch(err){
    const error = document.createTextNode('일시적인 오류 발생');
    todolistNode.appendChild(error);
  }
  
  return todolistNode;
};

export default todoList;