export class ACECopyContent extends HTMLElement {
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
  async handleEvent(e) {
    const { element } = this._HTMLData;
    const content = element.innerHTML;
    try {
      await navigator.clipboard.writeText(content);
      // success logic ...
    } catch (error) {
      // error logic ...
    }
  }
}