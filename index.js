const navbar = document.createElement("template");
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
    font-size: 38px;
    text-align: center;
    margin-left: 5px;
  }
  nav {
    margin: auto;
  }
  searchInput {
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
  <div class="searchInput">
    <input type="text"/>
    <button>Go</button>
  </div>
  </nav>
</header>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(navbar.content.cloneNode(true));
  }

  connectedCallback() {
    const userInput = {
      title: this.getAttribute("title"),
      showSearchBar: this.getAttribute("showSearchBar"),
      searchPlaceholder: this.getAttribute("searchPlaceholder"),
      handleSearch: this.getAttribute("handle-search"),
    };

    const brandSlot = this.shadowRoot.querySelector(".logo");
    const titleTextNode = document.createTextNode(userInput.title);
    brandSlot.appendChild(titleTextNode);

    const searchInputDiv = this.shadowRoot.querySelector(".searchInput");
    if (userInput.showSearchBar === "true") {
      const input = this.shadowRoot.querySelector("input");
      input.setAttribute(
        "placeholder",
        userInput.searchPlaceholder || "Default Placeholder"
      );
      const submitButton = this.shadowRoot.querySelector("button");
      
      submitButton.addEventListener("click", () => {
        const searchEvent = new CustomEvent("search", { detail: input.value });
        this.shadowRoot.dispatchEvent(searchEvent); // Dispatch the custom event
      });

      // Listen for keydown event on input field
      input.addEventListener("keydown", (event) => {
        // Check if the key pressed is Enter key
        if (event.keyCode === 13) {
          const searchEvent = new CustomEvent("search", { detail: input.value });
          this.shadowRoot.dispatchEvent(searchEvent); // Dispatch the custom event
        }
      });
    } else {
      // Hide the search input div
      searchInputDiv.style.display = "none";
    }

    this.shadowRoot.addEventListener("search", (event) => {
      this.handleSearch(event.detail, userInput.handleSearch);
    });
  }

  // Function to handle search
  handleSearch(inputValue, handleSearchFunction) {
    console.log(inputValue);
    if (
      handleSearchFunction &&
      window[handleSearchFunction] &&
      typeof window[handleSearchFunction] === "function"
    ) {
      window[handleSearchFunction](inputValue); // Call the provided function passing input value
    }
  }
}

window.customElements.define("nine-toolbar", Navbar);





// connectedCallback() {
//   const userInput = {
//     title: this.getAttribute("title"),
//     showSearchBar: this.getAttribute("showSearchBar"),
//     searchPlaceholder: this.getAttribute("searchPlaceholder"),
//     handleSearch: this.getAttribute("handle-search"),
//   };

//   const brandSlot = this.shadowRoot.querySelector(".logo");
//   const titleTextNode = document.createTextNode(userInput.title);
//   brandSlot.appendChild(titleTextNode);

//   const searchInputDiv = this.shadowRoot.querySelector(".searchInput");
//   if (userInput.showSearchBar === "true") {
//     const input = this.shadowRoot.querySelector("input");
//     input.setAttribute(
//       "placeholder",
//       userInput.searchPlaceholder || "Default Placeholder"
//     );
//     const submitButton = this.shadowRoot.querySelector("button");

//     const dispatchSearchEvent = () => {
//         const searchEvent = new CustomEvent("search", { detail: input.value });
//         this.shadowRoot.dispatchEvent(searchEvent);
//     };

//     submitButton.addEventListener("click", dispatchSearchEvent);

//     // Listen for keydown event on input field
//     input.addEventListener("keydown", (event) => {
//         // Check if the key pressed is Enter key
//         if (event.keyCode === 13) {
//             dispatchSearchEvent();
//         }
//     });
//   } else {
//     // Hide the search input div
//     searchInputDiv.style.display = "none";
//   }

//   this.shadowRoot.addEventListener("search", (event) => {
//     this.handleSearch(event.detail,userInput.handleSearch)
//     });
// }

// // Function to handle search
// handleSearch(inputValue, handleSearchFunction) {
//   console.log(event.detail);
//   if (
//     handleSearchFunction &&
//     window[handleSearchFunction] &&
//     typeof window[handleSearchFunction] === "function"
//   ) {
//     window[handleSearchFunction](inputValue); // Call the provided function passing input value
//   }
// }
// }

// window.customElements.define("nine-toolbar", Navbar);
