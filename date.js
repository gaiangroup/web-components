import {LitElement, html} from '@polymer/lit-element';
    
class MyDate extends LitElement {
  static get properties() {
    return {
      format: {type: String},
      displayDate: {type: String},
      date: {type: Date}
    }
  }
  constructor() {
    super();
    this.displayDate = "";
    this.date = new Date();
    this.addEventListener('update-date', (e) => { 
      this.date = new Date();
    });
    this.tick();
  }
  tick() {
    setInterval(() => {
        let loaded = new CustomEvent('update-date');
        this.dispatchEvent(loaded);
      }, 1000);
  }
  render() {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = this.date.getDate(),
    month = months[this.date.getMonth()],
    year = this.date.getFullYear();
    switch(this.format) {
      case "dd mmm, yyyy":
      default:
       this.displayDate = date + ' ' + month + ', ' + year;
      break;
    }
    return html`<style>
    span {
      font-size: var(--myFontSize, 36px);
      background-color: var(--myBackground, white);
      margin: var(--myMargin, 30px);
      padding: var(--myPadding, 30px); 
      color: var(--myColor, red); 
    } </style>
      <span>${this.displayDate}</span>`;
  }  
}

customElements.define('my-date', MyDate);