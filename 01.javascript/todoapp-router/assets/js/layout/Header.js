const Header = function (title) {
  const headerNode = document.createElement("header");
  const h2 = document.createElement("h2");
  const mainTitle = document.createElement("h1");
  const headerTitle = document.createTextNode(title);
  mainTitle.textContent = "TODO 4 ME";

  mainTitle.addEventListener("click", () => {
    location.href = "/";
  });

  h2.appendChild(headerTitle);
  headerNode.appendChild(mainTitle);
  headerNode.appendChild(h2);
  return headerNode;
};

export default Header;
