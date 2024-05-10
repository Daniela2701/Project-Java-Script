import {
  writeToLS,
  readFromLS,
  validatePassword,
  checkTextInput,
  ckeckIfUserLoggedIn,
} from "./util.js";

const welcome = document.getElementById("welcome");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const age = document.getElementById("age");
const updateProfil = document.getElementById("updateProfil");
const error = document.getElementById("error");

const users = readFromLS("users") || [];
const loggedInUser = readFromLS("loggedInUser") || {};

ckeckIfUserLoggedIn(loggedInUser);

welcome.innerText = `Welcome ${loggedInUser.userNameInput}, would you like to update your profile?`;

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

updateProfil.addEventListener("click", (e) => {
  e.preventDefault();

  const userInfo = {
    userNameInput: userName.value,
    emailInput: email.value,
    firstNameInput: firstName.value,
    lastNameInput: lastName.value,
    passwordInput: btoa(password.value),
    ageInput: age.value,
    favorite: loggedInUser.favorite,
  };

  const areFieldsEmpty = !!(
    userInfo.userNameInput === "" ||
    userInfo.emailInput === "" ||
    userInfo.firstNameInput === "" ||
    userInfo.lastNameInput === "" ||
    userInfo.passwordInput === "" ||
    userInfo.ageInput === ""
  );

  if (!checkTextInput(userInfo.userNameInput)) {
    error.innerHTML = `<sup>*</sup> User name is not valid`;
    return;
  }

  if (!checkTextInput(userInfo.firstNameInput)) {
    error.innerHTML = `<sup>*</sup> First name is not valid`;
    return;
  }

  if (!checkTextInput(userInfo.lastNameInput)) {
    error.innerHTML = `<sup>*</sup> Last name is not valid`;
    return;
  }

  if (areFieldsEmpty) {
    error.innerHTML = `<sup>*</sup> Complete each field of the form`;
    return;
  }

  if (!validatePassword(userInfo.passwordInput)) {
    return;
  }

  const birthday = new Date(userInfo.ageInput);
  const currentDate = new Date();

  const years = currentDate.getFullYear() - birthday.getFullYear();

  if (years < 18) {
    error.innerHTML = `<sup>*</sup> Age is not valid`;
    return;
  }

  if (years > 120) {
    error.innerHTML = `<sup>*</sup> Age is not valid`;
    return;
  }

  const updateUsers = users.map((user) => {
    if (user.emailInput === loggedInUser.emailInput) {
      user = userInfo;
    }
    return user;
  });

  writeToLS("loggedInUser", userInfo);

  window.location.assign("./home.html");

  writeToLS("users", updateUsers);
});

window.onload = function () {
  const nameLS = loggedInUser.userNameInput;
  userName.value = nameLS;
  const emailLS = loggedInUser.emailInput;
  email.value = emailLS;
  const firstNemeLS = loggedInUser.firstNameInput;
  firstName.value = firstNemeLS;
  const lastNameLS = loggedInUser.lastNameInput;
  lastName.value = lastNameLS;
  const pas = atob(loggedInUser.passwordInput);
  const passwordLS = pas;
  password.value = passwordLS;
  const ageLS = loggedInUser.ageInput;
  age.value = ageLS;
};
