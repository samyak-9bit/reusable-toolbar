const navbar=document.createElement("template");navbar.innerHTML=`
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
`;class Navbar extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(navbar.content.cloneNode(!0))}connectedCallback(){const t={title:this.getAttribute("title"),showSearchBar:this.getAttribute("showSearchBar"),searchPlaceholder:this.getAttribute("searchPlaceholder"),handleSearch:this.getAttribute("handle-search")},e=this.shadowRoot.querySelector(".logo");var a=document.createTextNode(t.title);e.appendChild(a);const n=this.shadowRoot.querySelector(".searchInput");if("true"===t.showSearchBar){const o=this.shadowRoot.querySelector("input"),r=(o.setAttribute("placeholder",t.searchPlaceholder||"Default Placeholder"),this.shadowRoot.querySelector("button"));r.addEventListener("click",()=>{this.handleSearch(o.value,t.handleSearch)}),o.addEventListener("keydown",e=>{13===e.keyCode&&this.handleSearch(o.value,t.handleSearch)})}else n.style.display="none"}handleSearch(e,t){var a=new CustomEvent("search",{detail:e});document.dispatchEvent(a),t&&window[t]&&"function"==typeof window[t]&&window[t](e)}}window.customElements.define("nine-toolbar",Navbar);