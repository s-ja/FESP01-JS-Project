import axios from 'axios';
import { linkTo } from '../../Router';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

const TodoUpdate = async function () {
  const _id = new URLSearchParams(location.search).get('_id');

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  const { editForm, titleInput, contentInput, updateUpdatedAt } =
    createFormElement();
  content.appendChild(editForm);

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
function createFormElement() {
  const editForm = document.createElement('form');
  editForm.setAttribute('id', 'detail');

  const updateHeader = document.createElement('div');
  updateHeader.setAttribute('id', 'updateHeader');

  const detailFooter = document.createElement('div');
  detailFooter.setAttribute('id', 'detailFooter');

  const titleInput = document.createElement('input');
  titleInput.setAttribute('name', 'title');
  titleInput.setAttribute('autofocus', '');

  const updateUpdatedAt = document.createElement('p');
  updateUpdatedAt.setAttribute('id', 'detailHeaderCreatedAt');

  const contentInput = document.createElement('textarea');
  contentInput.setAttribute('name', 'content');
  contentInput.setAttribute('id', 'detailMain');

  const submitButton = document.createElement('button');
  submitButton.textContent = '수정하기';
  submitButton.setAttribute('id', 'editBtn');

  // 생성된 요소들을 폼에 추가
  updateHeader.appendChild(titleInput);
  updateHeader.appendChild(updateUpdatedAt);
  detailFooter.appendChild(submitButton);
  editForm.appendChild(updateHeader);
  editForm.appendChild(contentInput);
  editForm.appendChild(detailFooter);

  return { editForm, titleInput, contentInput, updateUpdatedAt };
}

export default TodoUpdate;
