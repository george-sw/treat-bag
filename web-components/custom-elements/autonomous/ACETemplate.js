export class ACETemplate extends HTMLElement {
  constructor() {
    super();
    const target = "p";
    this._HTMLData = {
      element: this.querySelector(`${target}`),
    }
    const { element } = this._HTMLData;
    if (!element) return;
    this.addEventListener("click", this);
  }
  handleEvent(e) {
    console.log(this, e.target);
  }
}