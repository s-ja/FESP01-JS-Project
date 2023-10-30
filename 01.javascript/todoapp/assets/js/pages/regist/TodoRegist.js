// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';

const TodoRegist = function(){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const inputForm = document.createElement('form');
  inputForm.setAttribute('id','form');
  const legend = document.createElement('legend');
  const fieldset = document.createElement('fieldset');
  fieldset.setAttribute('id','fieldset');

  const input = document.createElement('input');
  input.setAttribute('type','text');

  input.setAttribute('id','input');
  input.setAttribute('placeholder','제목을 입력해주세요.');
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id','textarea');
  textarea.setAttribute('type','text');
  textarea.setAttribute('placeholder','내용을 입력해주세요.');
  const content = document.createElement('div');
  content.setAttribute('id','content');
  const newRegister = document.createElement('button');
  newRegister.setAttribute('id','buttonCommon');
  newRegister.setAttribute('class','newRegister');
  const registerTitle = document.createTextNode('등록 완료');
  newRegister.appendChild(registerTitle);


  page.appendChild(Header('TODO App 등록'));
  page.appendChild(content);
  content.appendChild(inputForm);
  inputForm.appendChild(fieldset);
  fieldset.appendChild(input);
  fieldset.appendChild(textarea);
  fieldset.appendChild(newRegister);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;