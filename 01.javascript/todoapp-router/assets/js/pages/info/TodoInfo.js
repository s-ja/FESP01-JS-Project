// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";

// const TodoInfo = async function ({ _id } = {}) {
const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get("_id");
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  /**
   *
   * @param {HTMLElement} parent append할 요소
   * @param {string} tagName 생성할 태그이름
   * @param {string[]} attribute 설정할 속성
   * @param {string} txt 텍스트
   */

  const createElem = (parent, tagName, attribute = [], txt) => {
    const [target, setTarget] = attribute;

    const $tag = document.createElement(tagName);
    $tag.setAttribute(target, setTarget);
    txt && ($tag.textContent = txt);

    parent.appendChild($tag);
  };

  const content = document.createElement("div");
  content.setAttribute("id", "content");

  const detail = document.createElement("div");
  detail.setAttribute("id", "detail");
  //   const text = document.createTextNode(`_id=${_id} 상세 조회 화면`);
  //   content.appendChild(text);
  content.appendChild(detail);

  const detailHeader = document.createElement("div");
  detailHeader.setAttribute("id", "detailHeader");

  const detailHeaderTitle = document.createElement("p");
  detailHeaderTitle.setAttribute("id", "detailHeaderTitle");

  const detailHeaderCreatedAt = document.createElement("p");
  detailHeaderCreatedAt.setAttribute("id", "detailHeaderCreatedAt");

  const detailMain = document.createElement("div");
  detailMain.setAttribute("id", "detailMain");
  const detailMainContent = document.createElement("span");
  detailMainContent.setAttribute("id", "detailMainContent");
  const detailMainUpdatedAt = document.createElement("p");
  detailMainUpdatedAt.setAttribute("id", "detailMainUpdatedAt");

  const detailFooter = document.createElement("div");
  detailFooter.setAttribute("id", "detailFooter");
  const detailFooterEdit = document.createElement("button");
  const btnEdit = document.createTextNode("수정");

  detailFooterEdit.setAttribute("id", "detailFooterEdit");
  const detailFooterDelete = document.createElement("button");
  detailFooterDelete.setAttribute("id", "detailFooterDelete");
  const btndelete = document.createTextNode("삭제");

  detailFooterDelete.addEventListener("click", async () => {
    let response;
    console.log("hihihi");
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

  detail.appendChild(detailHeader);
  detailHeader.appendChild(detailHeaderTitle);
  detailHeader.appendChild(detailHeaderCreatedAt);

  detail.appendChild(detailMain);
  detailMain.appendChild(detailMainContent);
  detailMain.appendChild(detailMainUpdatedAt);

  detail.appendChild(detailFooter);
  detailFooter.appendChild(detailFooterDelete);
  detailFooterDelete.appendChild(btndelete);
  detailFooter.appendChild(detailFooterEdit);
  detailFooterEdit.appendChild(btnEdit);

  let response;

  try {
    response = await axios(`http://localhost:33088/api/todolist/${_id}`);
    console.log(response);
    const title = document.createTextNode(response.data.item.title);
    const createdAt = document.createTextNode(response.data.item.createdAt);
    const createdAtTxt = document.createTextNode("createdAt ");
    const contents = document.createTextNode(response.data.item.content);
    const updatedAt = document.createTextNode(response.data.item.updatedAt);
    const updatedAtTxt = document.createTextNode("updatedAt ");

    detailHeaderTitle.appendChild(title);
    detailHeaderCreatedAt.appendChild(createdAtTxt);
    detailHeaderCreatedAt.appendChild(createdAt);
    detailMainContent.appendChild(contents);
    detailMainUpdatedAt.appendChild(updatedAtTxt);
    detailMainUpdatedAt.appendChild(updatedAt);
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    detail.appendChild(error, err);
  }

  page.appendChild(Header("상세 정보"));
  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
