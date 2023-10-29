// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';

const TodoRegist = function(){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  const text = document.createTextNode('등록 화면');
  content.appendChild(text);

  page.appendChild(Header('TODO App 등록'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;