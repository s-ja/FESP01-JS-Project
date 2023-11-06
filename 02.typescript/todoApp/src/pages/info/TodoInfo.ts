// 할일 등록
import axios from "axios";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import createElem from "../../utils/CreateElem";

const fetchTodoItem = async (_id: string): Promise<TodoItem> => {
  try {
    const response = await axios.get<TodoItem>(
      `http://localhost:33088/api/todolist/${_id}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch the todo item.");
  }
};

const deleteTodoItem = async (_id: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    alert("삭제되었습니다.");
    window.location.href = "/"; // 페이지를 루트로 리다이렉션
  } catch (error) {
    alert("삭제에 실패했습니다.");
  }
};

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  let response;

  try {
    response = await axios<TodoResponse>(
      `http://localhost:33088/api/todolist/${_id}`
    );
    const title = response.data.item.title;
    const createdAt = "Created at: " + response.data.item.createdAt;
    const updatedAt = "Updated at: " + response.data.item.updatedAt;
    const contents = response.data.item.content;

    const page = document.createElement("div");
    page.id = "page";

    const content = document.createElement("div");
    content.id = "content";

    const detail = createElem(content, "div", "", ["id", "detail"]);

    const detailHeader = createElem(detail, "div", "", ["id", "detailHeader"]);

    const detailHeaderTitle = createElem(detailHeader, "div", title, [
      "id",
      "detailHeaderTitle",
    ]);

    const detailHeaderCreatedAt = createElem(detailHeader, "div", createdAt, [
      "id",
      "detailHeaderCreatedAt",
    ]);

    const detailMain = createElem(detail, "div", "", ["id", "detailMain"]);

    const detailMainContent = createElem(detailMain, "span", contents, [
      "id",
      "detailMainContent",
    ]);

    const detailMainUpdatedAt = createElem(detailMain, "p", updatedAt, [
      "id",
      "detailMainUpdatedAt",
    ]);

    const detailFooter = createElem(detail, "div", "", ["id", "detailFooter"]);

    const detailFooterEdit = createElem(detailFooter, "button", "수정", [
      "id",
      "detailFooterEdit",
    ]);

    detailFooterEdit.addEventListener("click", function () {
      location.href = `update?_id=${_id}`;
    });

    const detailFooterDelete = createElem(detailFooter, "button", "삭제", [
      "id",
      "detailFooterDelete",
    ]);

    detailFooterDelete.addEventListener("click", async () => {
      let response;
      try {
        response = await axios.delete(
          `http://localhost:33088/api/todolist/${_id}`
        );
        console.log(response);
        alert("삭제되었습니다");
        //   location.reload();
        window.history.back();
        // list로 이동
      } catch (err) {
        console.log(err);
      }
    });

    page.appendChild(Header("상세 정보"));
    page.appendChild(content);
    page.appendChild(Footer());

    return page;
  } catch (err) {
    console.error("An error occurred:", err);
    const errorPage = document.createElement("div");
    errorPage.textContent = "Failed to load the todo item.";
    return errorPage;
  }
};

export default TodoInfo;
