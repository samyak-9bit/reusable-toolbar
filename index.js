class MyToolbar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
            <div>
                <h2>My Circle</h2>
            </div> 
        `;
    }
}
customElements.define('my-toolbar', MyToolbar);