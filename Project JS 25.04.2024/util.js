const writeToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

function checkTextInput(inputText) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(inputText);
}

function checkNumberInput(inputNumber) {
  const regex = /^[a-zA-Z0-9\s]*$/;
  return regex.test(inputNumber);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#]/;

  const pass = atob(password);

  if (pass.length < 6) {
    error.innerHTML = `<sup>*</sup> Password should be minimum 6 characters`;
    return false;
  } else if (!upperCaseRegex.test(pass)) {
    error.innerHTML = `<sup>*</sup> Password must contain at least one upper case letter`;
    return false;
  } else if (!lowerCaseRegex.test(pass)) {
    error.innerHTML = `<sup>*</sup> Password must contain at least one  lower case letter`;
    return false;
  } else if (!numberRegex.test(pass)) {
    error.innerHTML = `<sup>*</sup> Password must contain at least one number `;
    return false;
  } else if (!specialCharRegex.test(pass)) {
    error.innerHTML = `<sup>*</sup> Password must contain at least one special character(!@#)`;
    return false;
  } else {
    return true;
  }
}

const ckeckIfUserLoggedIn = (loggedInUser) =>
  loggedInUser === null && window.location.assign("./logIn.html");

const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");
const headRow = document.createElement("tr");

const flats = readFromLS("flatsLS") || [];
const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};
const favoriteArr = loggedInUser.favorite || [];

const renderFlats = (arr) => {
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  arr.forEach((element) => {
    const isFavorite = loggedInUser.favorite
      ?.map((favorite) => favorite.id)
      .includes(element.id);
    const bodyRow = document.createElement("tr");

    bodyRow.innerHTML = `<td>${element.cityInput}</td>
         <td>${element.streetNameInput}</td>
         <td>${element.streetNumberInput}</td>
         <td>${element.areaSizeInput}</td>
         <td>${element.hasAcInput}</td>
         <td>${element.yearBuiltInput}</td>
         <td>${element.rentPriceInput}</td>
         <td>${element.dateAvailableInput}</td>`;
    const buttonFav = document.createElement("button");
    const buttonRemoveFromFav = document.createElement("button");
    const deleteFlatBtn = document.createElement("button");

    if (window.location.pathname !== "/home.html") {
      let checkedFavorite = isFavorite ? "yes" : "no";

      bodyRow.innerHTML = bodyRow.innerHTML + `<td>${checkedFavorite}</td>`;

      buttonFav.textContent = "Favorite";

      buttonFav.addEventListener("click", (e) => {
        e.preventDefault();
        addToFavorite(element);
      });
      bodyRow.appendChild(buttonFav);
    }

    if (window.location.pathname !== "/home.html") {
      deleteFlatBtn.textContent = "Delete";

      deleteFlatBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteFlat(element);
      });
    }

    buttonRemoveFromFav.textContent = "Remove from favorite";
    buttonRemoveFromFav.classList.add("buttonRemoveFromFav");
    buttonFav.classList.add("buttonFav");

    deleteFlatBtn.classList.add("deleteFlatBtn");

    buttonRemoveFromFav.addEventListener("click", (e) => {
      e.preventDefault();
      removeFromFavorite(element);
    });

    bodyRow.appendChild(buttonRemoveFromFav);
    bodyRow.appendChild(deleteFlatBtn);

    tBody.appendChild(bodyRow);
  });

  tHead.appendChild(headRow);
  tableFlats.append(tHead, tBody);
};

const addToFavorite = (element) => {
  const flatsIds = favoriteArr.map((flat) => flat.id);

  if (flatsIds.includes(element.id)) {
    return;
  }
  favoriteArr.push(element);

  const updateUser = {
    ...loggedInUser,
    favorite: favoriteArr,
  };

  const foundUserIndex = users.findIndex(
    (user) => user.emailInput === loggedInUser.emailInput
  );

  users[foundUserIndex].favorite = favoriteArr;

  writeToLS("loggedInUser", updateUser);
  writeToLS("users", users);

  location.reload();
};

const removeFromFavorite = (element) => {
  const flatsIds = favoriteArr.map((flat) => flat.id);

  if (!flatsIds.includes(element.id)) {
    return;
  }

  const foundFavoriteIndex = loggedInUser.favorite?.findIndex(
    (flat) => flat.id === element.id
  );
  if (foundFavoriteIndex > -1) {
    favoriteArr.splice(foundFavoriteIndex, 1);
  }

  const updateUser = {
    ...loggedInUser,
    favorite: favoriteArr,
  };

  const foundUserIndex = users.findIndex(
    (user) => user.emailInput === loggedInUser.emailInput
  );

  users[foundUserIndex].favorite = favoriteArr;

  writeToLS("loggedInUser", updateUser);
  writeToLS("users", users);

  location.reload();
};

const deleteFlat = (element) => {
  const foundFlatSelect = flats?.find((flat) => flat.id === element.id);

  flats.splice(foundFlatSelect, 1);

  const updateUser = {
    ...loggedInUser,
    favorite: flats,
  };

  writeToLS("loggedInUser", updateUser);

  writeToLS("flatsLS", flats);

  location.reload();
};

function filterCity(arr, filterValue) {
  const filteredArr = arr.filter((item) => item.cityInput === filterValue);
  renderFlats(filteredArr);

  writeToLS("sortFlats", filteredArr);
}

function filterPrice(sortPrice, fromPrice, toPrice) {
  const filteredArr = sortPrice.filter(
    (item) =>
      Number(item.rentPriceInput) >= Number(fromPrice) &&
      Number(item.rentPriceInput) <= Number(toPrice)
  );

  filteredArr.sort(
    (a, b) => Number(a.rentPriceInput) - Number(b.rentPriceInput)
  );

  renderFlats(filteredArr);
  writeToLS("sortFlats", filteredArr);
}

function filterAreaSize(sortAreaSize, fromAreaSize, toAreaSize) {
  const filteredArr = sortAreaSize.filter(
    (item) =>
      Number(item.areaSizeInput) >= Number(fromAreaSize) &&
      Number(item.areaSizeInput) <= Number(toAreaSize)
  );

  filteredArr.sort((a, b) => Number(a.areaSizeInput) - Number(b.areaSizeInput));

  renderFlats(filteredArr);
  writeToLS("sortFlats", filteredArr);
}

const sortCity = (arr) => {
  const sortArr = arr.sort((a, b) => a.cityInput.localeCompare(b.cityInput));

  renderFlats(sortArr);
  writeToLS("sortFlats", sortArr);
};

const sortPrice = (arr) => {
  const sortP = arr.sort((a, b) => a.rentPriceInput - b.rentPriceInput);
  renderFlats(sortP);
  writeToLS("sortFlats", sortP);
};

const sortAreaSize = (arr) => {
  const sortA = arr.sort((a, b) => a.areaSizeInput - b.areaSizeInput);
  renderFlats(sortA);
  writeToLS("sortFlats", sortA);
};

export {
  writeToLS,
  readFromLS,
  validateEmail,
  validatePassword,
  ckeckIfUserLoggedIn,
  renderFlats,
  filterCity,
  filterPrice,
  filterAreaSize,
  sortCity,
  sortPrice,
  sortAreaSize,
  addToFavorite,
  checkTextInput,
  checkNumberInput,
};
