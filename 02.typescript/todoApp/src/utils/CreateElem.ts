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

export default createElem;
