import {LitElement, html, customElement, property} from '@polymer/lit-element';
    
class MyClock extends LitElement {
  static get properties() {
    return {
      format: {type: String},
      displayTime: {type: String},
      date: {type: Date}
    }
  }
  constructor() {
    super();
    this.displayTime = "";
    this.date = new Date();
    this.addEventListener('update-time', (e) => { 
      this.date = new Date();
    });
    this.tick();
  }
  tick() {
    setInterval(() => {
        let loaded = new CustomEvent('update-time');
        this.dispatchEvent(loaded);
      }, 1000);
  }
  render() {
    let hours = this.date.getHours() < 10 ? '0' + this.date.getHours(): this.date.getHours(), 
    minutes = this.date.getMinutes() < 10 ? '0' + this.date.getMinutes(): this.date.getMinutes(), 
    seconds = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds(): this.date.getSeconds(); 
    switch(this.format) {
      case "hh":
       this.displayTime = hours;
      break;
      case "mm":
       this.displayTime = minutes;
      break;
      case "ss":
        this.displayTime = seconds;
      break;
      case "hh:mm":
        this.displayTime = hours + ":" + minutes;
        break;
      case "hh:mm:ss":
        this.displayTime = hours + ":" + minutes + ":" + seconds;
      break;
    }
    return html`<style>:host { color: var(--myColor, red); } </style>
      <span class="mood">${this.displayTime}</span>`;
  }  
}

customElements.define('my-clock', MyClock);