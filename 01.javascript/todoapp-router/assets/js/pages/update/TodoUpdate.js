// 할일 수정

const TodoUpdate = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const editForm = document.createElement("form");
  const titleInput = document.createElement("input");
  titleInput.setAttribute("name", "title");
  titleInput.setAttribute("placeholder", "제목을 입력하세요");
  const contentInput = document.createElement("textarea");
  contentInput.setAttribute("name", "content");
  contentInput.setAttribute("placeholder", "내용을 입력하세요");
  const doneInput = document.createElement("input");
  doneInput.setAttribute("type", "checkbox");
  doneInput.setAttribute("name", "done");
  const submitButton = document.createElement("button");
  submitButton.textContent = "수정하기";

  page.appendChild(editForm);
  editForm.appendChild(titleInput);
  editForm.appendChild(contentInput);
  editForm.appendChild(doneInput);
  editForm.appendChild(submitButton);

  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const done = e.target.done.checked;

    try {
      const response = await axios.patch(
        `http://localhost:33088/api/todolist/${_id}`,
        {
          title,
          content,
          done,
        }
      );
      // 수정이 성공하면 사용자에게 알림을 표시하고 리스트 페이지로 돌아갑니다.
      alert("수정되었습니다.");
      linkTo("/"); // 리스트 페이지로 이동
    } catch (err) {
      console.error(error);
      alert("서버 오류!");
    }
  });

  return page;
};

export default TodoUpdate;
