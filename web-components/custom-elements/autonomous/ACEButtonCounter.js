export class ACEButtonCounter extends HTMLElement {
  constructor() {
    super();
    this._HTMLData = {
      button: this.querySelector("button"),
      counter: 0,
    }
    const { button } = this._HTMLData;
    if (!button) return;
    this.addEventListener("click", this);
  }
  handleEvent(e) {
    const { button } = this._HTMLData;
    let { counter } = this._HTMLData;
    counter++;
    button.textContent = `clicked ${counter} times`;
    this._HTMLData.counter = counter;
  }
}