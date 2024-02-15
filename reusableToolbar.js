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
    width: 500px;
    position: relative;
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
  .btn-buy {
    border: 1px solid #dedede;
    border-bottom: 1px solid #b5b5b5;
    border-right: none;
    border-radius: 3px 0 0 3px;
    font-size: 12px;
    font-weight: bold;
    padding: 6px 14px;
    margin-top: 15px;
    background: linear-gradient(#fff, #EFEFEF);
  }
  .btn-buy:hover {
    background: #EFEFEF;
  }
  .btn-buy-list {
    border: 1px solid #dedede;
    border-bottom: 1px solid #b5b5b5;
    border-radius: 0 3px 3px 0;
    font-size: 12px;
    font-weight: bold;
    padding: 6px 10px;
    background: linear-gradient(#fff, #EFEFEF);
    margin-left: -10px;
    position: relative;
  }
  .btn-buy-list:hover {
    background: #EFEFEF;
  }
  .btn-buy:active,
  .btn-buy:focus,
  .btn-buy-list:active,
  .btn-buy-list:focus {
    outline: none;
    background: #ddd;
  }
  .btn-arrow {
    width: 0;
    height: 0;
    border-top: 5px solid black;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    position: relative;
    top: 10px;
  }
  .dropdown-menu {
    position: absolute;
    z-index: 1000;
    display: none;
    min-width: 160px;
    padding: 5px 0;
    margin: -1px 0 0 -30px;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }
  .dropdown-menu li {
    text-decoration: none;
  }
  .dropdown-menu  li {
    font-size: 12px;
    font-family: arial,sans-serif;
    color: #222;
    padding: 5px 15px;
  }
  .dropdown-menu li:hover {
    background-color: #bae2fc;
  }
  .switcher{
    float:right;
    margin-right:20px;
  }
  .submit-btn{
    height:20px;
}
</style>

<header>
  <div>
    <slot name="brand" class="logo"></slot>
  </div>
  <nav>
  <div class="searchInput">
    <input type="text"/>
    <button class="submit-btn">Go</button>
  </div>
  </nav>
  <div class="switcher">
  
  
    <button class="btn-buy"></button>
    <button class="btn-buy-list" id="dropBtn2"><span class="btn-arrow"></span></button>
    <ul class="dropdown-menu">
      
    </ul>
  
  </div>
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
      showDropDownMenu: this.getAttribute("showDropDownMenu"),
      dropDownTitle: this.getAttribute("dropDownTitle"),
      menuItemsString: this.getAttribute('menuItems'),
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
      const submitButton = this.shadowRoot.querySelector(".submit-btn");
      
      submitButton.addEventListener("click", () => {
        this.handleSearch(input.value, userInput.handleSearch);
      });

      // Listen for keydown event on input field
      input.addEventListener("keydown", (event) => {
        // Check if the key pressed is Enter key
        if (event.keyCode === 13) {
          this.handleSearch(input.value, userInput.handleSearch);
        }
      });
    } else {
      // Hide the search input div
      searchInputDiv.style.display = "none";
    }

    const dropDownMenuDiv = this.shadowRoot.querySelector(".switcher");
    if (userInput.showDropDownMenu === "true") {
      const menuItems = JSON.parse(userInput.menuItemsString);
  
      const dropDownTitle = this.shadowRoot.querySelector(".btn-buy");
      const dropDownTextNode = document.createTextNode(userInput.dropDownTitle);
      dropDownTitle.appendChild(dropDownTextNode);
  
      const dropdownMenu = this.shadowRoot.querySelector(".dropdown-menu");
  
      for (const menuItemTitle in menuItems) {
          const functionName = menuItems[menuItemTitle];
          const menuItem = document.createElement("li");
          menuItem.textContent = menuItemTitle;
          menuItem.setAttribute('data-title', menuItemTitle); // Set data-title attribute to identify the menu item
          menuItem.addEventListener("click", () => {
              this.handleMenuItemClick(functionName);
          });
          dropdownMenu.appendChild(menuItem);
      }
  } else {
      dropDownMenuDiv.style.display = "none";
  }
  

    // Event listeners for dropdown toggle
    const dropdownButtons = this.shadowRoot.querySelectorAll(".btn-buy-list");
    dropdownButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent propagation to window click event
        const menu = btn.nextElementSibling;
        if (menu.style.display !== "block") {
          // If the menu is not already displayed, show it
          menu.style.display = "block";
          // Close any other open dropdown menu
          this.closeAllMenus(menu);
        } else {
          // If the menu is already displayed, hide it
          menu.style.display = "none";
        }
      });
    });

    // Event listener to close dropdowns on window click
    window.addEventListener("click", () => {
      dropdownButtons.forEach((btn) => {
        const menu = btn.nextElementSibling;
        if (menu.style.display === "block") {
          menu.style.display = "none";
        }
      });
    });
  }

  // Function to close all dropdown menus except the provided one
  closeAllMenus(exceptMenu) {
    const dropdownMenus = this.shadowRoot.querySelectorAll(".dropdown-menu");
    dropdownMenus.forEach((menu) => {
      if (menu !== exceptMenu) {
        menu.style.display = "none";
      }
    });
  }


  handleMenuItemClick(functionName) {
    // Check if the function exists and call it
    if (typeof window[functionName] === 'function') {
      window[functionName]();
    }
  }

  // Function to handle search
  handleSearch(inputValue, handleSearchFunction) {
    const searchEvent = new CustomEvent("search", { detail: inputValue });
    document.dispatchEvent(searchEvent); // Dispatch the custom event
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
