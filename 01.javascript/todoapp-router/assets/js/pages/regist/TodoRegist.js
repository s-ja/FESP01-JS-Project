// 할일 등록
import Header from "../../layout/Header.js";
import Footer from "../../layout/Footer.js";
import {linkTo} from '../../Router.js';

const TodoRegist = function () {
  const page = document.createElement("div");
  page.setAttribute("id", "page");
  
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  const inputForm = document.createElement("form");
  inputForm.setAttribute("id", "form");
  const legend = document.createElement("legend");
  const fieldset = document.createElement("fieldset");
  fieldset.setAttribute("id", "fieldset");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "title");
  input.setAttribute("id", "input");
  input.setAttribute("placeholder", "제목을 입력해주세요.");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", "textarea");
  textarea.setAttribute("name", "content");
  textarea.setAttribute("type", "text");
  textarea.setAttribute("placeholder", "내용을 입력해주세요.");
  const newRegister = document.createElement("button");
  newRegister.setAttribute("type", "submit"); 
  newRegister.setAttribute("id", "buttonCommon");
  newRegister.setAttribute("class", "newRegister");
  const registerTitle = document.createTextNode("등록 완료");
  newRegister.appendChild(registerTitle);
  
 
  
      inputForm.addEventListener("submit", async function (event) {
        event.preventDefault(); 
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value; 

        try {
          const response = await axios.post('http://localhost:33088/api/todolist', { title, content });
    console.log(response.data); 
      alert("등록이 완료되었습니다.");
        } catch (error) {
          console.error(error);
          alert("등록에 실패하였습니다.");
        }
      });
    


  page.appendChild(Header("TODO App 등록"));
  page.appendChild(content);
  content.appendChild(inputForm);
  inputForm.appendChild(fieldset);
  fieldset.appendChild(input);
  fieldset.appendChild(textarea);
  fieldset.appendChild(newRegister);
  page.appendChild(Footer());


  return page;
};

export default TodoRegist;
