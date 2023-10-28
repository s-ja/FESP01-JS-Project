// 할일 등록
const todoRegist = function(){
  const registNode = document.createElement('div');
  const text = document.createTextNode('등록 화면');
  registNode.appendChild(text);
  return registNode;
};

export default todoRegist;