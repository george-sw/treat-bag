export class ACEAccordion extends HTMLElement {
  constructor() {
    super();
    this._HTMLData = {
      headings: this.querySelectorAll(this.getAttribute("data-headings")),
      headerName: `${this.tagName.toLowerCase()}-header`,
      triggerName: `${this.tagName.toLowerCase()}-trigger`,
      panelName: `${this.tagName.toLowerCase()}-panel`,
      isExclusive: this.hasAttribute("data-exclusive"),
    }
    const { headings } = this._HTMLData;
    if (!headings) return;
    this.addEventListener("click", this);
    this.render();
  }
  handleEvent(e) {
    const { triggerName, isExclusive } = this._HTMLData;
    const trigger = e.target.closest(`[${triggerName}]`);
    if (!trigger) return;
    const isExpanded = trigger.getAttribute("aria-expanded") !== "false" ? true : false;
    this.toggle({ trigger, isExpanded });
    if (isExclusive) {
      const triggers = this.querySelectorAll(`[${triggerName}][aria-expanded="true"]`);
      for (const currentTrigger of triggers) {
        if (currentTrigger !== trigger) {
          this.toggle({ trigger: currentTrigger, isExpanded: true });
        }
      }
    }
  }
  toggle({ trigger, isExpanded }) {
    const panel = this.querySelector(`#${trigger.getAttribute("aria-controls")}`);
    trigger.setAttribute("aria-expanded", !isExpanded);
    panel.toggleAttribute("hidden", isExpanded);
  }
  render() {
    const { headings, triggerName, panelName } = this._HTMLData;
    for (const header of headings) {
      const trigger = document.createElement("button");
      trigger.innerHTML = header.innerHTML;
      trigger.setAttribute("aria-expanded", false);
      trigger.setAttribute(`${triggerName}`, "");
      header.innerHTML = "";
      header.append(trigger);
      const panel = header.nextElementSibling;
      panel.setAttribute("hidden", "");
      if (!panel.id) panel.id = `${panelName}-${crypto.randomUUID()}`;
      trigger.setAttribute("aria-controls", panel.id);
    }
  }
}