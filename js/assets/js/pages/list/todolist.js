// 할일 목록
const todolist = async function(){
  const todolistNode = document.createElement('div');
  let response;
  try{    
    response = await axios('http://localhost:33088/api/todolist');

    const ul = document.createElement('ul');
    response.data?.items.forEach(item => {
      const li = document.createElement('li');
      const title = document.createTextNode(item.title);
      li.appendChild(title);
      ul.appendChild(li);
    });
    todolistNode.appendChild(ul);    
  }catch(err){
    console.error(err);
    console.log(response);
    const error = document.createTextNode('일시적인 오류 발생');
    todolistNode.appendChild(error);
  }
  
  return todolistNode;
};

export default todolist;