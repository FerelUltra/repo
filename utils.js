class Render {
  constructor(element, name) {
    this.element = element;
    this.name = name;
    this.eventType = null;
    this.eventFc = null;
  }

  inner = (item, index) => {
    const child = document.createElement('li');
    child.className = `${this.name}__item`;
    child.id = `${this.name}__item-${index}`;
    child.innerHTML = item;
    this.element.append(child);
  };
  hideElements = () => {
    console.log(this.element.classList);
    this.element.classList.add('hide');
  };

  getElement() {
    return this.element;
  }

  eventListener = (type, fc) => {
    this.eventType = type;
    this.eventFc = fc;
    this.element.addEventListener(
      this.eventType,
      this.eventFc.bind(this.element)
    );
  };

  displayingElements = () => {
    this.element.classList.remove('hide');
  };

  removeElements = () => {
    this.element.innerHTML = '';
    this.element.removeEventListener(this.eventType, this.eventFc);
  };
  removeElement = (index) => {
    this.element.childNodes.forEach(
      (item) => item.id.includes(index) && item.remove()
    );
  };
}
function gitHubApi(search, queryParams) {
  const apiLink = `https://api.github.com/search/${search}?${queryParams.join(
    '&'
  )}`;
  return fetch(apiLink, {
    headers: { Authorization: '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' },
  }).then((data) => data.json());
}
function throttle(func, ms) {
  let isThrottled, savedArgs, savedThis;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
