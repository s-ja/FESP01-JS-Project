// 할일 목록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import TodoRegist from "../regist/TodoRegist.js";
import TodoInfo from "../info/TodoInfo.js";
import { linkTo } from "../../Router.js";

const TodoList = async function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");

  const content = document.createElement("div");
  content.setAttribute("id", "content");
  let response;
  try {
    response = await axios("http://localhost:33088/api/todolist");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "todolist");
    response.data?.items.forEach((item) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("id", "checkbox");

      if (item.done) {
        checkbox.setAttribute("checked", "true");
        li.classList.add("thisLi");
      }

      const todoInfoLink = document.createElement("a");
      todoInfoLink.setAttribute("href", `info?_id=${item._id}`);
      const title = document.createTextNode(item.title);

      todoInfoLink.addEventListener("click", function (event) {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute("href"));
      });

      checkbox.addEventListener("change", async function () {
        try {
          const body = {
            title: item.title,
            content: item.content,
            done: !item.done,
          };
          console.log(body);
          let response = await axios.patch(
            `http://localhost:33088/api/todolist/${item._id}`,
            body
          );
          console.log(response);
          alert("수정완료");

          if (this.checked) {
            li.classList.add("thisLi");
          } else {
            li.classList.remove("thisLi");
          }
        } catch (err) {
          console.log(err);
        }
      });

      todoInfoLink.appendChild(title);
      li.appendChild(checkbox);
      li.appendChild(todoInfoLink);
      ul.appendChild(li);
    });
    content.appendChild(ul);

    const btnRegist = document.createElement("button");
    btnRegist.setAttribute("id", "buttonCommon");
    const btnTitle = document.createTextNode("등록");

    btnRegist.appendChild(btnTitle);
    content.appendChild(btnRegist);

    btnRegist.addEventListener("click", () => {
      linkTo("regist");
      // document.querySelector('#page').replaceWith(registPage);
    });
  } catch (err) {
    const error = document.createTextNode("일시적인 오류 발생");
    content.appendChild(error);
  }

  page.appendChild(Header("목록조회"));
  page.appendChild(content);
  page.appendChild(Footer());
  return page;
};

export default TodoList;
