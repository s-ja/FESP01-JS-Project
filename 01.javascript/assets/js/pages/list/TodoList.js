// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoRegist from '../regist/TodoRegist.js';

const TodoList = async function(){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');
  
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
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
    content.appendChild(ul);    

    const btnRegist = document.createElement('button');
    const btnTitle = document.createTextNode('등록');
    btnRegist.appendChild(btnTitle);
    content.appendChild(btnRegist);

    btnRegist.addEventListener('click', () => {
      const registPage = TodoRegist();
      document.querySelector('#page').replaceWith(registPage);
    });

  }catch(err){
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }
  
  page.appendChild(Header('TODO List 등록'));
  page.appendChild(content);
  page.appendChild(Footer());
  return page;
};

export default TodoList;