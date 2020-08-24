import {createElement} from "../utils/render.js";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    // Хотелось выкинуть эту проверку и создавать элемент сразу в конструкторе.
    // Но внезапно оказалось, что JS не позволяет вызвать super() в произвольном месте, а только в самом начале конструктора.
    // И, следовательно, наши переменные класса, если таковые будут в наследниках,
    //   не будут инициализированы в момент вызова конструктора предка.
    // Bad luck ((
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
