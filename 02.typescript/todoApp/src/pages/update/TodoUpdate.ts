import axios from 'axios';
import { linkTo } from '../../Router';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const createElem = (
  parent: HTMLElement,
  tagName: string,
  txt: string = '',
  ...attributes: [string, string][]
) => {
  const element = document.createElement(tagName);

  attributes.forEach(([attrName, attrValue]) => {
    element.setAttribute(attrName, attrValue);
  });

  if (txt) {
    element.textContent = txt;
  }

  parent.appendChild(element);
  return element; // 생성된 요소 반환
};

const TodoUpdate = async function () {
  const _id = new URLSearchParams(location.search).get('_id');

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  const { editForm, titleInput, contentInput, updateUpdatedAt } =
    createFormElement(content);

  try {
    const response = await axios.get<TodoResponse>(
      `http://localhost:33088/api/todolist/${_id}`
    );
    const item = response.data.item;

    titleInput.value = item.title;
    contentInput.value = item.content;
    updateUpdatedAt.innerText = `Last updated: ${item.updatedAt}`;
  } catch (err) {
    console.error(err);
    alert('항목을 불러오는 데 실패했습니다.');
  }

  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title');
    const content = formData.get('content');

    try {
      await axios.patch<TodoListResponse>(
        `http://localhost:33088/api/todolist/${_id}`,
        {
          title,
          content,
        }
      );
      alert('수정되었습니다.');
      linkTo('/');
    } catch (err) {
      console.error(err);
      alert('서버 오류!');
    }
  });

  page.appendChild(Header('수정하기'));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

// 폼 요소 생성 함수
function createFormElement(parent: HTMLElement) {
  const editForm = createElem(parent, 'form', '', ['id', 'detail']);
  const updateHeader = createElem(editForm, 'div', '', ['id', 'updateHeader']);
  const titleInput = createElem(
    updateHeader,
    'input',
    '',
    ['name', 'title'],
    ['autofocus', '']
  ) as HTMLInputElement;
  const updateUpdatedAt = createElem(updateHeader, 'p', '', [
    'id',
    'detailHeaderCreatedAt',
  ]) as HTMLParagraphElement;
  const contentInput = createElem(
    editForm,
    'textarea',
    '',
    ['name', 'content'],
    ['id', 'detailMain']
  ) as HTMLTextAreaElement;
  const detailFooter = createElem(editForm, 'div', '', ['id', 'detailFooter']);
  const submitButton = createElem(detailFooter, 'button', '수정하기', [
    'id',
    'editBtn',
  ]);

  return { editForm, titleInput, contentInput, updateUpdatedAt };
}

export default TodoUpdate;
