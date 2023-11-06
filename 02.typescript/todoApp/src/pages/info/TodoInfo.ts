// 할일 등록
import axios from "axios";

import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");

  const createElem = (
    parent: HTMLElement,
    tagName: string,
    attribute?: [string, string],
    txt: string = ""
  ) => {
    const element = document.createElement(tagName);

    if (attribute) {
      const [target, setTarget] = attribute;
      element.setAttribute(target, setTarget);
    }

    if (txt) {
      element.textContent = txt;
    }

    parent.appendChild(element);
    return element; // 생성된 요소 반환
  };

  let response;

  try {
    response = await axios<TodoResponse>(
      `http://localhost:33088/api/todolist/${_id}`
    );
    const title = response.data.item.title;
    const createdAt = "createdAt " + response.data.item.createdAt;
    const updatedAt = response.data.item.updatedAt;
    const contents = response.data.item.content;

    const page = document.createElement("div");
    page.id = "page";

    const content = document.createElement("div");
    content.id = "content";

    const detail = createElem(content, "div", ["id", "detail"]);

    const detailHeader = createElem(detail, "div", ["id", "detailHeader"]);

    const detailHeaderTitle = createElem(
      detailHeader,
      "div",
      ["id", "detailHeaderTitle"],
      title
    );

    const detailHeaderCreatedAt = createElem(
      detailHeader,
      "div",
      ["id", "detailHeaderCreatedAt"],
      createdAt
    );

    const detailMain = createElem(detail, "div", ["id", "detailMain"]);

    const detailMainContent = createElem(
      detailMain,
      "span",
      ["id", "detailMainContent"],
      contents
    );

    const detailMainUpdatedAt = createElem(
      detailMain,
      "p",
      ["id", "detailMainUpdatedAt"],
      updatedAt
    );

    const detailFooter = createElem(detail, "div", ["id", "detailFooter"]);

    const detailFooterEdit = createElem(
      detailFooter,
      "button",
      ["id", "detailFooterEdit"],
      "수정"
    );

    detailFooterEdit.addEventListener("click", function () {
      location.href = `update?_id=${_id}`;
    });

    const detailFooterDelete = createElem(
      detailFooter,
      "button",
      ["id", "detailFooterDelete"],
      "삭제"
    );

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
