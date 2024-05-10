import {
  writeToLS,
  readFromLS,
  addToFavorite,
  checkTextInput,
  checkNumberInput,
  ckeckIfUserLoggedIn,
} from "./util.js";

const welcome = document.getElementById("welcome");
const city = document.getElementById("city");
const streetName = document.getElementById("streetName");
const streetNumber = document.getElementById("streetNumber");
const areaSize = document.getElementById("areaSize");
const hasAc = document.getElementById("hasAc");
const yearBuilt = document.getElementById("yearBuilt");
const rentPrice = document.getElementById("rentPrice");
const dateAvailable = document.getElementById("dateAvailable");
const addFlatBtn = document.getElementById("addFlatBtn");
const error = document.getElementById("error");

const randomId = "id" + Math.random().toString(16).slice(2);

const loggedInUser = readFromLS("loggedInUser") || {};

const flats = readFromLS("flatsLS") || [];

ckeckIfUserLoggedIn(loggedInUser);

welcome.innerText = `Welcome ${loggedInUser.userNameInput}, you want to add a new apartment?`;

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

addFlatBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let checked = hasAc.checked ? "yes" : "no";

  const newFlat = {
    id: randomId,
    cityInput: city.value,
    streetNameInput: streetName.value,
    streetNumberInput: streetNumber.value,
    areaSizeInput: areaSize.value,
    hasAcInput: checked,
    yearBuiltInput: yearBuilt.value,
    rentPriceInput: rentPrice.value,
    dateAvailableInput: dateAvailable.value,
  };

  if (!checkTextInput(newFlat.cityInput)) {
    error.innerHTML = `<sup>*</sup> City name is not valid`;
    return;
  }

  if (!checkTextInput(newFlat.streetNameInput)) {
    error.innerHTML = `<sup>*</sup> Street name is not valid`;
    return;
  }

  if (!checkNumberInput(newFlat.areaSizeInput)) {
    error.innerHTML = `<sup>*</sup> Area size is not valid`;
    return;
  }

  if (!checkNumberInput(newFlat.rentPriceInput)) {
    error.innerHTML = `<sup>*</sup> Rent Price is not valid`;
    return;
  }

  if (newFlat.yearBuiltInput < 1800) {
    error.innerHTML = `<sup>*</sup> Year is not valid`;
    return;
  }

  if (newFlat.yearBuiltInput > 2024) {
    error.innerHTML = `<sup>*</sup> Year is not valid`;
    return;
  }

  const areFieldsEmpty = !!(
    newFlat.cityInput === "" ||
    newFlat.streetNameInput === "" ||
    newFlat.streetNumberInput === "" ||
    newFlat.areaSizeInput === "" ||
    newFlat.hasAcInput === "on" ||
    newFlat.yearBuiltInput === "" ||
    newFlat.rentPriceInput === "" ||
    newFlat.dateAvailableInput === ""
  );

  if (areFieldsEmpty) {
    error.innerHTML = `<sup>*</sup> Complete each field of the form`;
    return;
  }

  flats.push(newFlat);
  writeToLS("flatsLS", flats);

  addToFavorite(newFlat);

  city.value = "";
  streetName.value = "";
  streetNumber.value = "";
  areaSize.value = "";
  checked = hasAc.checked = false;
  yearBuilt.value = "";
  rentPrice.value = "";
  dateAvailable.value = "";

  window.location.assign("./allFlats.html");
});
