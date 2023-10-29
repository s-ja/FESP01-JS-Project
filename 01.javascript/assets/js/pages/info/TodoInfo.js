// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';

const TodoInfo = async function({_id} = {}){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  content.appendChild(text);

  page.appendChild(Header('TODO App 상세 조회'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;