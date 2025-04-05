// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the key value from an URL query and return it
export function getParam(param) {
  const queryString = window.location.search;
  const UrlParams = new URLSearchParams(queryString);
  const value = UrlParams.get(param);
  return value
}

// render list template appropriately
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear){
    parentElement.innerHTML = "";
  }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

  }

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback){
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemp = await loadTemplate("../partials/header.html");
  const footerTemp = await loadTemplate("../partials/footer.html");
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  renderWithTemplate(headerTemp, header);
  renderWithTemplate(footerTemp, footer);
}