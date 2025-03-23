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
  if (clear){
    parentElement.innerHTML = "";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));

  }

  else {
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
  }
  
}