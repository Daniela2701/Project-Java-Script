import {
  writeToLS,
  readFromLS,
  renderFlats,
  filterCity,
  filterPrice,
  filterAreaSize,
  sortCity,
  sortPrice,
  sortAreaSize,
  ckeckIfUserLoggedIn,
} from "./util.js";

const tableFlats = document.getElementById("tableFlats");
const empty = document.getElementById("notFlat");

const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");
const headRow = document.createElement("tr");

const selectCity = document.getElementById("selectCity");
const toPrice = document.getElementById("toPrice");
const fromPrice = document.getElementById("fromPrice");

const fromAreaSize = document.getElementById("fromAreaSize");
const toAreaSize = document.getElementById("toAreaSize");

const applyFilters = document.getElementById("applyFilters");
const applyFilterPrice = document.getElementById("applyFilterPrice");
const applyFilterAreaSize = document.getElementById("applyFilterAreaSize");
const applySort = document.getElementById("applySort");
const resetFilters = document.getElementById("resetFilters");

const flats = readFromLS("flatsLS") || [];
const sortFlats = readFromLS("sortFlatsLS") || [];

const loggedInUser = readFromLS("loggedInUser") || {};

ckeckIfUserLoggedIn(loggedInUser);

logOut.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
});

profileUpdate.addEventListener("click", () => {
  window.location.assign("./profileUpdate.html");
});

allFlatsBtn.addEventListener("click", () => {
  window.location.assign("./allFlats.html");
});

newFlatsBtn.addEventListener("click", () => {
  window.location.assign("./newFlats.html");
});

homeBtn.addEventListener("click", () => {
  window.location.assign("./home.html");
});

const image = document.getElementById("image");

const tableHeaderNames = [
  "City",
  "Street Name",
  "Street Number",
  "Are size",
  "Has AC?",
  "Year Build",
  "Rent price",
  "Date available",
  "Is favorite",
  "Action",
];

tableHeaderNames.forEach((element) => {
  const th = document.createElement("th");
  th.textContent = element;

  if (element === "City") {
    const img = document.createElement("img");
    img.src = "./filter-svgrepo-com.svg";
    th.appendChild(img);

    th.classList.add("image");

    img.addEventListener("click", () => {
      sortCity(sortFlats);
    });
  }

  if (element === "Are size") {
    const img = document.createElement("img");
    img.src = "./filter-svgrepo-com.svg";
    th.appendChild(img);

    th.classList.add("image");

    img.addEventListener("click", () => {
      sortAreaSize(sortFlats);
    });
  }

  if (element === "Rent price") {
    const img = document.createElement("img");
    img.src = "./filter-svgrepo-com.svg";
    th.appendChild(img);

    th.classList.add("image");

    img.addEventListener("click", () => {
      sortPrice(sortFlats);
    });
  }

  headRow.appendChild(th);
});

tHead.appendChild(headRow);
tableFlats.append(tHead, tBody);

if (flats.length === 0) {
  empty.innerHTML = `<sup>*</sup> There are no additional apartments.`;
}

applyFilters.addEventListener("click", (e) => {
  e.preventDefault();
  filterCity(sortFlats, selectCity.value);
});

applyFilterPrice.addEventListener("click", (e) => {
  e.preventDefault();
  filterPrice(sortFlats, fromPrice.value, toPrice.value);
});

applyFilterAreaSize.addEventListener("click", (e) => {
  e.preventDefault();
  filterAreaSize(sortFlats, fromAreaSize.value, toAreaSize.value);
});

const selectCategory = document.getElementById("selectCategory");

applySort.addEventListener("click", (e) => {
  e.preventDefault();

  const selectedCityValue = selectCategory.value;
  if (selectedCityValue === "City") {
    sortCity(sortFlats);
    return;
  }

  const selectedPriceValue = selectCategory.value;
  if (selectedPriceValue === "Price") {
    sortPrice(sortFlats);
    return;
  }

  const selectedAreaSizeValue = selectCategory.value;
  if (selectedAreaSizeValue === "areaSize") {
    sortAreaSize(sortFlats);
    return;
  }
});

sortFlats.push(...flats);
writeToLS("flatsLS", flats);
writeToLS("sortFlats", sortFlats);

window.onload = () => {
  renderFlats(flats);
};

resetFilters.addEventListener("click", () => {
  window.onload = () => {
    renderFlats(flats);
  };
});

resetFilters.classList.add("resetFilters");
