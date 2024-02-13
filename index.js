const navbar = document.createElement('template');
navbar.innerHTML = `
<style>
  header {
    display: flex;
    align-items: center;
    min-height: 50px;
    max-height: 100px;
    justify-content: space-between;
    width: 100%;
    z-index: 99;
    background-color: rgb(35, 180, 232);
  }
  .logo {
    color: #333333;
    font-family: 'Arial Black', Gadget, sans-serif;
    font-size: 40px;
    text-align: center;
    margin-left: 5px;
  }
  nav {
    margin: auto;
  }
  form {
    display: inline-flex;
    border: 1px solid #616364;
    margin: 20px;
    padding: 5px;
    background-color:white;
  }
  input {
    height: 25px;
    border: none;
    padding: 10px;
    flex-grow: 1;
    outline: none;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 10px;
  }
</style>

<header>
  <div>
    <slot name="brand" class="logo"></slot>
  </div>
  <nav>
    <slot></slot>
  </nav>
</header>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(navbar.content.cloneNode(true));
  }

  connectedCallback() {
    const userInput = {
      title: this.getAttribute('title'),
      showSearchBar: this.getAttribute('showSearchBar'),
      searchPlaceholder: this.getAttribute('searchPlaceholder'),
      handleSearch: this.getAttribute('handle-search'),
    };

    const brandSlot = this.shadowRoot.querySelector('.logo');
    const titleTextNode = document.createTextNode(userInput.title);
    brandSlot.appendChild(titleTextNode);

    if (userInput.showSearchBar === 'true') {
      const navSlot = this.shadowRoot.querySelector('nav');
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', userInput.searchPlaceholder || 'Default Placeholder');
      const submitButton = document.createElement('button');
      submitButton.setAttribute('type', 'submit');
      submitButton.textContent = 'GO';
      form.appendChild(input);
      form.appendChild(submitButton);
      navSlot.appendChild(form);

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputValue = input.value;
        const searchEvent = new CustomEvent('search', { detail: inputValue });
        document.dispatchEvent(searchEvent); // Dispatch the custom event
        if (userInput.handleSearch && window[userInput.handleSearch] && typeof window[userInput.handleSearch] === 'function') {
            window[userInput.handleSearch](inputValue); // Call the provided function passing input value
        } else {
            console.error('Invalid handleSearch function provided');
        }
    });
    

      // submitButton.addEventListener('click', () => {
      //   if (userInput.handleSearch) {
      //     this.dispatchEvent(new CustomEvent('handleSearch', { detail: input.value }));
      //   }
      // });
    }
}

}

window.customElements.define('nine-toolbar', Navbar);
