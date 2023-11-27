import HTMLElementBuilder from "./HTMLElementBuilder.js";

const QUERY_OPTIONS = ["All", "Title", "Genre", "Actor"];

const handleChangeSearchFilter = (event) => {
  document.querySelector(".query-filter").textContent = event.target.innerText;
}

const loadSearchDropdown = () => {
  const options = document.querySelector("#query-options");

  QUERY_OPTIONS.forEach(option => {
      const listItem = new HTMLElementBuilder("li").setAttribute("class", "dropdown-item").setText(option).build();
      listItem.addEventListener("click", handleChangeSearchFilter);
      options.appendChild(listItem);
  });

  document.querySelector(".query-filter").textContent = QUERY_OPTIONS[0];
}

loadSearchDropdown();