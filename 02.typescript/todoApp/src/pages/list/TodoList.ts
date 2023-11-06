// 할일 목록
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { linkTo } from '../../Router';
import axios from 'axios';

import createElem from '../../utils/CreateElem';

const TodoList = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  let response;

  try {
    response = await axios<TodoListResponse>(
      'http://localhost:33088/api/todolist'
    );

    const ul = createElem(content, 'ul', '', ['class', 'todolist']);
    response.data.items.forEach((item) => {
      const li = createElem(ul, 'li');
      const checkbox = createElem(
        li,
        'input',
        '',
        ['type', 'checkbox'],
        ['id', 'checkbox']
      ) as HTMLInputElement;

      if (item.done) {
        checkbox.checked = true;
        li.classList.add('thisLi');
      }

      const todoInfoLink = createElem(li, 'a', '', [
        'href',
        `info?_id=${item._id}`,
      ]);
      const title = document.createTextNode(item.title);

      todoInfoLink.addEventListener('click', (event) => {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href')!);
      });

      checkbox.addEventListener('change', async () => {
        try {
          const body = {
            title: item.title,
            content: item.content,
            done: !item.done,
          };
          const patchResponse = await axios.patch(
            `http://localhost:33088/api/todolist/${item._id}`,
            body
          );
          console.log(patchResponse);

          if (checkbox.checked) {
            li.classList.add('thisLi');
          } else {
            li.classList.remove('thisLi');
          }
        } catch (err) {
          console.log(err);
        }
      });

      todoInfoLink.appendChild(title);
      ul.appendChild(li);
    });
    content.appendChild(ul);

    const btnRegist = createElem(content, 'button', '', ['id', 'buttonCommon']);
    const btnTitle = document.createTextNode('등록');
    btnRegist.appendChild(btnTitle);
    content.appendChild(btnRegist);

    btnRegist.addEventListener('click', () => {
      linkTo('regist');
    });
  } catch (err) {
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }

  page.appendChild(Header('목록조회'));
  page.appendChild(content);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
