const Error404 = function () {
  const page = document.createElement("div");
  const msg = document.createTextNode("요청하신 페이지가 존재하지 않습니다.");
  page.appendChild(msg);
  return page;
};

export default Error404;
