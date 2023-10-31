// 할일 수정

import { linkTo } from "../../Router.js";

import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

const TodoUpdate = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "content");

  const editForm = document.createElement("form");
  editForm.setAttribute("id", "detail");

  const updateHeader = document.createElement("div");
  updateHeader.setAttribute("id", "updateHeader");

  const detailFooter = document.createElement("div");
  detailFooter.setAttribute("id", "detailFooter");

  const titleInput = document.createElement("input");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("autofocus", "");

  const updateUpdatedAt = document.createElement("p");
  updateUpdatedAt.setAttribute("id", "detailHeaderCreatedAt");

  const contentInput = document.createElement("textarea");
  contentInput.setAttribute("name", "content");
  contentInput.setAttribute("id", "detailMain");
  //   const doneInput = document.createElement("input");
  //   doneInput.setAttribute("type", "checkbox");
  //   doneInput.setAttribute("name", "done");

  const submitButton = document.createElement("button");
  submitButton.textContent = "수정하기";
  submitButton.setAttribute("id", "editBtn");

  content.appendChild(editForm);
  editForm.appendChild(updateHeader);

  updateHeader.appendChild(titleInput);
  updateHeader.appendChild(updateUpdatedAt);

  editForm.appendChild(contentInput);
  //   editForm.appendChild(doneInput);

  editForm.appendChild(detailFooter);
  detailFooter.appendChild(submitButton);

  // 기존의 항목을 가져옵니다.
  try {
    const response = await axios.get(
      `http://localhost:33088/api/todolist/${_id}`
    );
    const item = response.data.item;

    titleInput.value = item.title;
    contentInput.value = item.content;
    updateUpdatedAt.innerText = item.updatedAt;
    // doneInput.checked = item.done;
  } catch (err) {
    console.error(err);
    alert("항목을 불러오는 데 실패했습니다.");
  }

  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    // const done = e.target.done.checked;

    try {
      const response = await axios.patch(
        `http://localhost:33088/api/todolist/${_id}`,
        {
          title,
          content,
          //   done,
        }
      );
      // 수정이 성공하면 사용자에게 알림을 표시하고 리스트 페이지로 돌아갑니다.
      alert("수정되었습니다.");
      linkTo("/"); // 리스트 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("서버 오류!");
    }
  });

  page.appendChild(Header("수정하기"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoUpdate;
