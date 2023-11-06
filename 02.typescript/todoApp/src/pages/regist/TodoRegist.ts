// 할일 등록
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { linkTo } from "../../Router.ts";
import axios from "axios";

const TodoRegist = function () {

  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "content");

  const createElem = (
    parent: HTMLElement,
    tagName: string,
    txt: string = "",
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

  const form = createElem(content, "form", "", ["id", "form"]);

  const fieldset = createElem(form, "fieldset", "", ["id", "fieldset"])

  const input = createElem(fieldset, "input", "", ["id", "input"], ["type", "text"], ["name", "title"], ["placeholder", "제목을 입력해주세요."], ["required", "true"]);

  const textarea = createElem(fieldset, "textarea", "", ["id", "textarea"], ["type", "text"], ["name", "content"], ["placeholder", "내용을 입력해주세요."], ["required", "true"]);

  const newRegister = createElem(fieldset, "button", "등록 완료", ["id", "buttonCommon"], ["type", "submit"], ["class", "newRegister"]);

  const modal = createElem(page, "div", "", ["class", "modal"]);

  const modalContent = createElem(modal, "div", "할일이 등록되었습니다!", ["class", "modal-content"]);

  // const modal = document.createElement("div");
  // modal.classList.add("modal");
  // modal.style.display = "none";

  // const modalContent = document.createElement("div");
  // modalContent.classList.add("modal-content");
  // const modalText = document.createTextNode("할일이 등록되었습니다!");
  // modalContent.appendChild(modalText);
  // modal.appendChild(modalContent);

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // const title = input.value;
    // const content = content.value;
    // const title = (event.target as HTMLFormElement).elements.namedItem("title").value;
    const title = input.value;
    const content = textarea.value;
    // const content = (event.target as HTMLFormElement).elements.namedItem("content").value;

    try {
      const response = await axios.post("http://localhost:33088/api/todolist", {
        title,
        content,
      });
      console.log(response.data);
      modal.style.display = "block";
      setTimeout(() => {
        modal.style.display = "none";
        linkTo("/");
      }, 500);
    } catch (error) {
      console.error(error);
      alert("등록에 실패하였습니다.");
    }
  });

  page.appendChild(Header("TODO App 등록"));
  page.appendChild(content);
  // content.appendChild(form);
  // form.appendChild(fieldset);
  // fieldset.appendChild(input);
  // fieldset.appendChild(textarea);
  // fieldset.appendChild(newRegister);
  // page.appendChild(modal);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
